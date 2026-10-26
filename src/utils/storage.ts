import type { Experiment } from '../types/experiment';
import type { StudentProfile } from '../types/student';
import { defaultExperiments } from '../data/defaultExperiments';
import { defaultStudent } from '../data/defaultStudent';

const KEYS = {
  experiments: 'dsLab_experiments',
  studentProfile: 'dsLab_studentProfile',
  settings: 'dsLab_settings',
} as const;

function safeJsonParse<T>(str: string | null, fallback: T): T {
  if (!str) return fallback;
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}

// ── Experiments ──────────────────────────────────────────────
export function loadExperiments(): Experiment[] {
  const raw = localStorage.getItem(KEYS.experiments);
  if (!raw) {
    // First launch – seed default data
    saveExperiments(defaultExperiments);
    return defaultExperiments;
  }
  const parsed = safeJsonParse<Experiment[]>(raw, []);
  let stored = Array.isArray(parsed) ? parsed : [];
  let hasUpdates = false;

  // Prune any experiments beyond the default experiments list
  const validIds = new Set(defaultExperiments.map(e => e.id));
  const pruned = stored.filter(e => validIds.has(e.id) && e.number <= defaultExperiments.length);
  if (pruned.length !== stored.length) {
    stored = pruned;
    hasUpdates = true;
  }

  // Ensure all default experiments exist and titles match the updated curriculum
  const updatedList: Experiment[] = [];
  for (const def of defaultExperiments) {
    const existing = stored.find(e => e.id === def.id || e.number === def.number);
    if (!existing) {
      updatedList.push(def);
      hasUpdates = true;
    } else {
      let item = { ...existing };
      // If the title doesn't match the new curriculum, update all experiment metadata from default
      if (item.title !== def.title) {
        item = {
          ...def,
          id: existing.id || def.id,
          number: def.number,
        };
        hasUpdates = true;
      } else {
        // Ensure sub-experiments and video URLs are synchronized
        if (def.youtubeUrl && item.youtubeUrl !== def.youtubeUrl) {
          item.youtubeUrl = def.youtubeUrl;
          hasUpdates = true;
        }
        if (def.experimentA?.youtubeUrl && item.experimentA?.youtubeUrl !== def.experimentA.youtubeUrl) {
          item.experimentA = { ...item.experimentA, youtubeUrl: def.experimentA.youtubeUrl };
          hasUpdates = true;
        }
        if (def.experimentB?.youtubeUrl && item.experimentB?.youtubeUrl !== def.experimentB.youtubeUrl) {
          item.experimentB = { ...item.experimentB, youtubeUrl: def.experimentB.youtubeUrl };
          hasUpdates = true;
        }
      }
      updatedList.push(item);
    }
  }

  // Sort by experiment number
  updatedList.sort((a, b) => a.number - b.number);

  if (hasUpdates || updatedList.length !== stored.length) {
    saveExperiments(updatedList);
    return updatedList;
  }

  return updatedList;
}

export function saveExperiments(experiments: Experiment[]): void {
  localStorage.setItem(KEYS.experiments, JSON.stringify(experiments));
}

// ── Student Profile ───────────────────────────────────────────
export function loadStudentProfile(): StudentProfile {
  const raw = localStorage.getItem(KEYS.studentProfile);
  if (!raw) {
    saveStudentProfile(defaultStudent);
    return defaultStudent;
  }
  const parsed = safeJsonParse<StudentProfile>(raw, defaultStudent);
  // Merge defaults for any new fields added since last save
  const merged = { ...defaultStudent, ...parsed };
  
  // Upgrade old defaults or placeholders if present
  if (merged.name === 'Your Name' || merged.name === 'Tejaswini Reddy') merged.name = defaultStudent.name;
  if (merged.rollNo === 'Your Roll Number' || merged.rollNo === '24102A030088') merged.rollNo = defaultStudent.rollNo;
  if (merged.assistantProfessor === 'Faculty Name') merged.assistantProfessor = defaultStudent.assistantProfessor;
  if (merged.section === 'DS-1' || !merged.section) merged.section = defaultStudent.section;
  if (!merged.photo) merged.photo = defaultStudent.photo;
  if (!merged.website) merged.website = defaultStudent.website;
  if (!merged.linkedin) merged.linkedin = defaultStudent.linkedin;

  // Persist updated profile
  saveStudentProfile(merged);
  return merged;
}

export function saveStudentProfile(profile: StudentProfile): void {
  localStorage.setItem(KEYS.studentProfile, JSON.stringify(profile));
}

// ── Helpers ───────────────────────────────────────────────────
export function generateId(): string {
  return `exp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
