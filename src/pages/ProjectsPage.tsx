import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  Search,
  X,
  Sparkles,
  FolderGit2,
  CheckCircle2,
  Code2,
  HeartHandshake,
  Activity,
  FlaskConical,
  CheckSquare,
  ArrowRight,
  Star,
  Globe,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full Stack' | 'Data Science' | 'Web Apps';
  featured: boolean;
  status: 'Flagship' | 'Active' | 'Completed' | 'Open Source';
  description: string;
  highlights: string[];
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  isInternalDemo?: boolean;
  icon: React.ReactNode;
  accentColor: string;
  badgeBg: string;
}

const projectsData: Project[] = [
  {
    id: 'ngo-volunteer',
    title: 'NGO Volunteer Management System',
    subtitle: 'Comprehensive Volunteer Operations & Task Allocation Platform',
    category: 'Full Stack',
    featured: true,
    status: 'Flagship',
    description:
      'A full-featured operational platform designed to streamline non-profit organizations. Handles automated volunteer registrations, real-time task allocations, shift scheduling, and volunteer impact reporting.',
    highlights: [
      'Role-based access control for administrators, team coordinators, and active volunteers',
      'Automated task delegation engine with milestone tracking and urgency alerts',
      'Database analytics tracking volunteer service hours and contribution records',
      'Secure data validation pipeline and responsive coordination portal',
    ],
    tags: ['Java', 'SQL', 'Web Dev', 'Servlets', 'Bootstrap', 'MySQL'],
    githubUrl: 'https://github.com/Tejaswin308',
    demoUrl: 'https://portfolio-lovat-eight-q1hh4pwhhe.vercel.app/#projects',
    icon: <HeartHandshake size={22} className="text-rose-400" />,
    accentColor: '#F43F5E',
    badgeBg: 'rgba(244, 63, 94, 0.12)',
  },
  {
    id: 'healthnexus',
    title: 'HealthNexus Healthcare Management',
    subtitle: 'Integrated Patient-Provider Health & Appointments Platform',
    category: 'Full Stack',
    featured: true,
    status: 'Flagship',
    description:
      'A modern health management application connecting patients with certified healthcare professionals. Features doctor discovery, appointment booking, digital medical histories, and real-time clinical consultations.',
    highlights: [
      'Interactive appointment booking engine with doctor schedule synchronization',
      'Centralized electronic medical record (EMR) repository and prescription tracker',
      'Real-time appointment status updates and patient notification alerts',
      'Clean healthcare dashboard optimized for both mobile and desktop users',
    ],
    tags: ['React', 'Node.js', 'Database', 'Healthcare Systems', 'REST APIs', 'Express'],
    githubUrl: 'https://github.com/Tejaswin308',
    demoUrl: 'https://portfolio-lovat-eight-q1hh4pwhhe.vercel.app/#projects',
    icon: <Activity size={22} className="text-cyan-400" />,
    accentColor: '#0EA5A8',
    badgeBg: 'rgba(14, 165, 168, 0.12)',
  },
  {
    id: 'ds-lab',
    title: 'DS LAB – Data Science Laboratory Platform',
    subtitle: 'Interactive Browser-Based Data Science Portal & Python Runner',
    category: 'Data Science',
    featured: true,
    status: 'Active',
    description:
      'The current flagship academic platform for Mohan Babu University Data Science students. Integrates live in-browser Python execution via WebAssembly (Pyodide), multi-module curriculum, digital student ID badges, and interactive experimentation.',
    highlights: [
      'Client-side Python 3 execution sandbox powered by Pyodide WebAssembly with zero server lag',
      'Interactive experiment code playground with standard I/O, error handling, and output consoles',
      'Dual-sided 3D digital student ID card generator with printable credentials & QR verification',
      'Curriculum breakdown with official laboratory manual PDFs and step-by-step guides',
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Pyodide (WASM)', 'Python 3', 'Lucide Icons'],
    githubUrl: 'https://github.com/Tejaswin308/DS-project',
    demoUrl: '/',
    isInternalDemo: true,
    icon: <FlaskConical size={22} className="text-indigo-400" />,
    accentColor: '#6366F1',
    badgeBg: 'rgba(99, 102, 241, 0.12)',
  },
  {
    id: 'task-manager',
    title: 'Smart Task & Productivity Manager',
    subtitle: 'Lightweight Agile Task Management & Priority Tracker',
    category: 'Web Apps',
    featured: false,
    status: 'Completed',
    description:
      'An intuitive task management web application engineered for quick task capture, structured priority organization, status filtering, and deadline tracking.',
    highlights: [
      'Multi-level priority labeling (Urgent, High, Normal) with color-coded badges',
      'Instant search and status filtering (Pending, In Progress, Completed)',
      'Reliable localStorage persistence ensuring zero data loss across reloads',
      'Zero-dependency vanilla implementation delivering lightning-fast sub-10ms UI renders',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'LocalStorage API', 'Responsive UI'],
    githubUrl: 'https://github.com/Tejaswin308',
    demoUrl: 'https://portfolio-lovat-eight-q1hh4pwhhe.vercel.app/#projects',
    icon: <CheckSquare size={22} className="text-amber-400" />,
    accentColor: '#F59E0B',
    badgeBg: 'rgba(245, 158, 11, 0.12)',
  },
];

type CategoryFilter = 'All' | 'Featured' | 'Full Stack' | 'Data Science' | 'Web Apps';

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  // Filter logic
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      // Category match
      if (selectedCategory === 'Featured' && !project.featured) return false;
      if (selectedCategory !== 'All' && selectedCategory !== 'Featured' && project.category !== selectedCategory) {
        return false;
      }

      // Search match
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(q);
      const matchSubtitle = project.subtitle.toLowerCase().includes(q);
      const matchDesc = project.description.toLowerCase().includes(q);
      const matchTags = project.tags.some(t => t.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchDesc || matchTags;
    });
  }, [searchQuery, selectedCategory]);

  const categories: CategoryFilter[] = ['All', 'Featured', 'Full Stack', 'Data Science', 'Web Apps'];

  return (
    <main className="page-enter" style={{ paddingBottom: '90px' }}>
      {/* ─────────────────────────────────────────────────────────────
          HERO BANNER
      ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: '48px',
          paddingBottom: '48px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--c-border)',
          background: 'linear-gradient(180deg, var(--c-surface) 0%, var(--c-bg) 100%)',
        }}
        aria-labelledby="projects-heading"
      >
        {/* Soft background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-70px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '320px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(14,165,168,0.12) 0%, rgba(99,102,241,0.06) 50%, transparent 75%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
            {/* Student badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '9999px',
                fontSize: '12.5px',
                fontWeight: 600,
                marginBottom: '18px',
                background: 'rgba(14, 165, 168, 0.1)',
                border: '1px solid rgba(14, 165, 168, 0.28)',
                color: 'var(--c-accent)',
              }}
            >
              <FolderGit2 size={15} />
              <span>M.Tejaswini • GitHub &amp; Engineering Portfolio</span>
            </div>

            {/* Title */}
            <h1
              id="projects-heading"
              style={{
                fontSize: 'clamp(28px, 4.5vw, 42px)',
                fontWeight: 900,
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                color: 'var(--c-text)',
                marginBottom: '14px',
              }}
            >
              Featured Software &amp;{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0EA5A8 0%, #38BDF8 60%, #818CF8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Data Science Projects
              </span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(14px, 2vw, 16.5px)',
                lineHeight: 1.6,
                color: 'var(--c-text-2)',
                maxWidth: '720px',
                margin: '0 auto 28px',
              }}
            >
              Explore production applications, healthcare platforms, automated systems, and data science platforms
              engineered by <strong>M.Tejaswini</strong>. All projects are available open source on GitHub.
            </p>

            {/* Quick Stat Counter Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
                gap: '12px',
                maxWidth: '680px',
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: 'var(--c-surface-alt)',
                  border: '1px solid var(--c-border)',
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--c-accent)' }}>4</div>
                <div style={{ fontSize: '11.5px', color: 'var(--c-text-3)', fontWeight: 600 }}>Core Projects</div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: 'var(--c-surface-alt)',
                  border: '1px solid var(--c-border)',
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#38BDF8' }}>10+</div>
                <div style={{ fontSize: '11.5px', color: 'var(--c-text-3)', fontWeight: 600 }}>Technologies</div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: 'var(--c-surface-alt)',
                  border: '1px solid var(--c-border)',
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#F43F5E' }}>100%</div>
                <div style={{ fontSize: '11.5px', color: 'var(--c-text-3)', fontWeight: 600 }}>Open Source</div>
              </div>

              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  background: 'var(--c-surface-alt)',
                  border: '1px solid var(--c-border)',
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#10B981' }}>Live</div>
                <div style={{ fontSize: '11.5px', color: 'var(--c-text-3)', fontWeight: 600 }}>Working Demos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SEARCH & FILTER TOOLBAR
      ───────────────────────────────────────────────────────────── */}
      <section className="container-max" style={{ marginTop: '36px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
            borderRadius: '20px',
            padding: '18px 20px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'between',
              gap: '14px',
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 280px' }}>
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--c-text-3)',
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search projects by name, tech (React, Java, Python, SQL), or keywords..."
                style={{
                  width: '100%',
                  padding: '10px 38px 10px 40px',
                  borderRadius: '12px',
                  fontSize: '13.5px',
                  background: 'var(--c-bg)',
                  border: '1px solid var(--c-border)',
                  color: 'var(--c-text)',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--c-accent)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 168, 0.15)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--c-border)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--c-text-3)',
                    cursor: 'pointer',
                    padding: 4,
                  }}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Direct GitHub Profile Link */}
            <a
              href="https://github.com/Tejaswin308"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <GithubIcon />
              <span>Tejaswin308 on GitHub</span>
              <ExternalLink size={13} />
            </a>
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              paddingTop: '6px',
              borderTop: '1px solid var(--c-border)',
            }}
          >
            {categories.map(cat => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '12.5px',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: active ? 'var(--c-accent)' : 'var(--c-surface-alt)',
                    color: active ? '#FFFFFF' : 'var(--c-text-2)',
                    border: `1px solid ${active ? 'var(--c-accent)' : 'var(--c-border)'}`,
                  }}
                >
                  {cat === 'Featured' && <Sparkles size={12} className="inline mr-1" />}
                  {cat}
                </button>
              );
            })}
            <div
              style={{
                marginLeft: 'auto',
                fontSize: '12px',
                color: 'var(--c-text-3)',
                alignSelf: 'center',
              }}
            >
              Showing {filteredProjects.length} of {projectsData.length} projects
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROJECTS GRID
      ───────────────────────────────────────────────────────────── */}
      <section className="container-max" style={{ marginTop: '28px' }}>
        {filteredProjects.length === 0 ? (
          <div
            style={{
              padding: '60px 24px',
              textAlign: 'center',
              background: 'var(--c-surface)',
              border: '1px solid var(--c-border)',
              borderRadius: '20px',
            }}
          >
            <FolderGit2 size={44} style={{ margin: '0 auto 16px', color: 'var(--c-text-3)', opacity: 0.5 }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--c-text)', marginBottom: '8px' }}>
              No projects match your filter
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--c-text-2)', marginBottom: '20px' }}>
              Try searching with another keyword or reset the category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="btn btn-secondary"
              style={{ borderRadius: '12px', padding: '8px 18px', fontSize: '13px' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 460px), 1fr))',
              gap: '24px',
            }}
          >
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM CALLOUT / GITHUB FOOTER BANNER
      ───────────────────────────────────────────────────────────── */}
      <section className="container-max" style={{ marginTop: '56px' }}>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '24px',
            border: '1px solid var(--c-border)',
            background: 'linear-gradient(135deg, rgba(14,165,168,0.08) 0%, rgba(99,102,241,0.08) 100%)',
            padding: '36px 32px',
          }}
        >
          {/* Ambient lighting */}
          <div
            style={{
              position: 'absolute',
              right: '-60px',
              bottom: '-60px',
              width: '260px',
              height: '260px',
              borderRadius: '50%',
              background: 'rgba(14,165,168,0.15)',
              filter: 'blur(50px)',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '24px',
              position: 'relative',
              zIndex: 1,
            }}
            className="flex-col md:flex-row"
          >
            <div style={{ maxWidth: '620px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--c-accent)',
                  marginBottom: '10px',
                }}
              >
                <Code2 size={15} />
                <span>Open for Collaboration &amp; Contributions</span>
              </div>
              <h2
                style={{
                  fontSize: 'clamp(20px, 3vw, 26px)',
                  fontWeight: 800,
                  color: 'var(--c-text)',
                  marginBottom: '10px',
                }}
              >
                Explore More Repositories on GitHub
              </h2>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--c-text-2)' }}>
                Have an inquiry, project proposal, or want to review commit histories and problem solutions? Visit
                M.Tejaswini&apos;s GitHub account, competitive coding profiles, or live web portfolio.
              </p>
            </div>

            {/* Links group */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <a
                href="https://github.com/Tejaswin308"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 20px',
                  borderRadius: '14px',
                  background: 'var(--c-accent)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 14px rgba(14, 165, 168, 0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <GithubIcon />
                <span>GitHub @Tejaswin308</span>
                <ExternalLink size={14} />
              </a>

              <a
                href="https://portfolio-lovat-eight-q1hh4pwhhe.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 18px',
                  borderRadius: '14px',
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  color: 'var(--c-text)',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--c-accent)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--c-border)';
                }}
              >
                <Globe size={15} style={{ color: 'var(--c-accent)' }} />
                <span>Personal Portfolio</span>
                <ExternalLink size={13} />
              </a>

              <a
                href="https://www.linkedin.com/in/tejaswini-reddy-785a47344"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 18px',
                  borderRadius: '14px',
                  background: 'var(--c-surface)',
                  border: '1px solid var(--c-border)',
                  color: 'var(--c-text)',
                  fontWeight: 600,
                  fontSize: '13.5px',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#0A66C2';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--c-border)';
                }}
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECT CARD COMPONENT
// ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="group rounded-2xl border transition-all duration-300 flex flex-col"
      style={{
        background: 'var(--c-surface)',
        borderColor: isHovered ? project.accentColor + '60' : 'var(--c-border)',
        boxShadow: isHovered
          ? `0 12px 32px rgba(0,0,0,0.22), 0 0 24px ${project.accentColor}20`
          : 'var(--shadow-sm)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Chromatic Bar */}
      <div
        style={{
          height: '4px',
          width: '100%',
          background: `linear-gradient(90deg, ${project.accentColor} 0%, ${project.accentColor}90 50%, transparent 100%)`,
        }}
      />

      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Badges Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Project Icon */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: project.badgeBg,
                border: `1px solid ${project.accentColor}30`,
              }}
            >
              {project.icon}
            </div>

            <div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: project.accentColor,
                  display: 'block',
                }}
              >
                {project.category}
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--c-text-3)', fontWeight: 500 }}>
                {project.status}
              </span>
            </div>
          </div>

          {/* Featured pill */}
          {project.featured && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 10px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 700,
                background: 'rgba(245, 158, 11, 0.12)',
                color: '#F59E0B',
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              <Star size={11} fill="#F59E0B" />
              Featured
            </span>
          )}
        </div>

        {/* Project Title */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 800,
            lineHeight: 1.3,
            color: 'var(--c-text)',
            marginBottom: '4px',
          }}
        >
          {project.title}
        </h3>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '12.5px',
            fontWeight: 600,
            color: project.accentColor,
            marginBottom: '12px',
          }}
        >
          {project.subtitle}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.6,
            color: 'var(--c-text-2)',
            marginBottom: '16px',
          }}
        >
          {project.description}
        </p>

        {/* Highlights / Features */}
        <div style={{ marginBottom: '18px', flex: 1 }}>
          <div
            style={{
              fontSize: '11.5px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--c-text-3)',
              marginBottom: '8px',
            }}
          >
            Key Highlights
          </div>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: 0, margin: 0, listStyle: 'none' }}>
            {project.highlights.map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '12.5px',
                  color: 'var(--c-text-2)',
                  lineHeight: 1.45,
                }}
              >
                <CheckCircle2
                  size={14}
                  style={{
                    color: project.accentColor,
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '20px',
            paddingTop: '12px',
            borderTop: '1px solid var(--c-border)',
          }}
        >
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: '11.5px',
                fontWeight: 600,
                padding: '3px 9px',
                borderRadius: '8px',
                background: 'var(--c-surface-alt)',
                border: '1px solid var(--c-border)',
                color: 'var(--c-text-2)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: 'auto',
          }}
        >
          {/* GitHub button */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '7px',
              height: '38px',
              padding: '0 14px',
              borderRadius: '10px',
              background: 'var(--c-surface-alt)',
              border: '1px solid var(--c-border)',
              color: 'var(--c-text)',
              fontSize: '12.5px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = project.accentColor;
              e.currentTarget.style.color = project.accentColor;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--c-border)';
              e.currentTarget.style.color = 'var(--c-text)';
            }}
          >
            <GithubIcon />
            <span>View Code</span>
            <ExternalLink size={12} />
          </a>

          {/* Live Demo button */}
          {project.isInternalDemo ? (
            <Link
              to={project.demoUrl || '/'}
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                height: '38px',
                padding: '0 14px',
                borderRadius: '10px',
                background: project.accentColor,
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: `0 4px 12px ${project.accentColor}35`,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.92';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Launch App</span>
              <ArrowRight size={13} />
            </Link>
          ) : project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                height: '38px',
                padding: '0 14px',
                borderRadius: '10px',
                background: project.accentColor,
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: `0 4px 12px ${project.accentColor}35`,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.92';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Live Demo</span>
              <ExternalLink size={12} />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────
// SOCIAL / BRAND SVG ICONS
// ─────────────────────────────────────────────────────────────
function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#0A66C2">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
