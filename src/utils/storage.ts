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

  // Prune removed experiments (9, 10) if loaded from earlier localStorage
  const removedIds = new Set(['exp-009', 'exp-010']);
  const pruned = stored.filter(e => !removedIds.has(e.id) && e.number <= defaultExperiments.length);
  if (pruned.length !== stored.length) {
    stored = pruned;
    hasUpdates = true;
  }

  // Update experiment 7 if it's still old K-Means Clustering
  const exp7Index = stored.findIndex(e => e.id === 'exp-007');
  const defExp7 = defaultExperiments.find(e => e.id === 'exp-007');
  if (exp7Index !== -1 && defExp7 && stored[exp7Index].title !== defExp7.title) {
    stored[exp7Index] = defExp7;
    hasUpdates = true;
  }

  // Ensure experiment 8 (Web Scraping using Beautiful Soup) is added or updated
  const exp8Index = stored.findIndex(e => e.id === 'exp-008');
  const defExp8 = defaultExperiments.find(e => e.id === 'exp-008');
  if (defExp8) {
    if (exp8Index === -1) {
      stored = [...stored, defExp8].sort((a, b) => a.number - b.number);
      hasUpdates = true;
    } else if (stored[exp8Index].title !== defExp8.title) {
      stored[exp8Index] = defExp8;
      hasUpdates = true;
    }
  }

  // If stored has fewer experiments than defaults, merge: keep stored edits + add missing defaults
  if (stored.length < defaultExperiments.length) {
    const storedIds = new Set(stored.map(e => e.id));
    const missing = defaultExperiments.filter(e => !storedIds.has(e.id));
    stored = [...stored, ...missing].sort((a, b) => a.number - b.number);
    hasUpdates = true;
  }

  // Always sync youtubeUrls from defaults (ensures replaced/unavailable videos are updated)
  const defaultMap = new Map(defaultExperiments.map(e => [e.id, e]));
  const enriched = stored.map(exp => {
    const def = defaultMap.get(exp.id);
    if (!def) return exp;

    let updatedExp = { ...exp };
    let changed = false;

    // Always override youtubeUrl from defaults so stale/unavailable URLs get refreshed
    if (def.youtubeUrl && exp.youtubeUrl !== def.youtubeUrl) {
      updatedExp.youtubeUrl = def.youtubeUrl;
      changed = true;
    }
    if (def.experimentA?.youtubeUrl && exp.experimentA?.youtubeUrl !== def.experimentA.youtubeUrl) {
      updatedExp.experimentA = { ...exp.experimentA, youtubeUrl: def.experimentA.youtubeUrl };
      changed = true;
    }
    if (def.experimentB?.youtubeUrl && exp.experimentB?.youtubeUrl !== def.experimentB.youtubeUrl) {
      updatedExp.experimentB = { ...exp.experimentB, youtubeUrl: def.experimentB.youtubeUrl };
      changed = true;
    }

    if (changed) hasUpdates = true;
    return updatedExp;
  });

  if (hasUpdates) {
    saveExperiments(enriched);
    return enriched;
  }

  return stored;
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
