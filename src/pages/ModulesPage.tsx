import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  CheckCircle,
  BookOpen,
  Target,
  Layers,
  FileText,
  Download,
  ExternalLink,
  Search,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import { modulesData, type Module } from '../data/modulesData';
import ModulePdfReaderModal from '../components/ModulePdfReaderModal';

export default function ModulesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(modulesData[0]?.id || null);
  const [activeTabs, setActiveTabs] = useState<Record<string, 'topics' | 'outcomes' | 'pages'>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pdfModalModule, setPdfModalModule] = useState<Module | null>(null);
  const [pdfModalInitialPage, setPdfModalInitialPage] = useState<number>(1);

  const toggle = (id: string) => setExpandedId(prev => (prev === id ? null : id));

  const setTab = (moduleId: string, tab: 'topics' | 'outcomes' | 'pages') => {
    setActiveTabs(prev => ({ ...prev, [moduleId]: tab }));
  };

  const handleOpenPdf = (mod: Module, page: number = 1) => {
    setPdfModalModule(mod);
    setPdfModalInitialPage(page);
  };

  const totalExperiments = useMemo(
    () => modulesData.reduce((acc, m) => acc + m.experiments, 0),
    []
  );
  const totalTopics = useMemo(
    () => modulesData.reduce((acc, m) => acc + m.topics.length, 0),
    []
  );

  // Filter modules based on search
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return modulesData;
    const q = searchQuery.toLowerCase();
    return modulesData.filter(m => {
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchSubtitle = m.subtitle.toLowerCase().includes(q);
      const matchTopics = m.topics.some(
        t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
      );
      const matchOutcomes = m.outcomes.some(o => o.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchTopics || matchOutcomes;
    });
  }, [searchQuery]);

  return (
    <main className="page-enter" style={{ paddingBottom: '80px' }}>
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION – Balanced, Spacious, Zero Overlaps
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
        aria-labelledby="modules-heading"
      >
        {/* Soft background ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '300px',
            borderRadius: '9999px',
            background: 'radial-gradient(circle, rgba(14,165,168,0.08) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            {/* Academic badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 600,
                marginBottom: '18px',
                background: 'rgba(14, 165, 168, 0.1)',
                border: '1px solid rgba(14, 165, 168, 0.25)',
                color: 'var(--c-accent)',
              }}
            >
              <GraduationCap size={15} />
              <span>B.Tech Data Science (22DS102006) • Academic Curriculum</span>
            </div>

            {/* Title */}
            <h1
              id="modules-heading"
              style={{
                fontSize: 'clamp(28px, 4vw, 44px)',
                fontWeight: 900,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '14px',
                color: 'var(--c-text)',
              }}
            >
              Curriculum <span className="gradient-text">Modules & PDF Handouts</span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.65,
                color: 'var(--c-text-2)',
                maxWidth: '680px',
                margin: '0 auto 30px auto',
              }}
            >
              Master theoretical foundations, laboratory experiments, and validated algorithms.
              Browse complete lecture notes, formulas, and download verified PDF course packs for every module.
            </p>

            {/* Metrics Ribbon (Placed above search so there is zero overlap) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
                maxWidth: '820px',
                margin: '0 auto 30px auto',
              }}
            >
              <MetricItem icon={<Layers size={17} />} value={String(modulesData.length)} label="Modules" />
              <MetricItem icon={<FlaskConical size={17} />} value={String(totalExperiments)} label="Experiments" />
              <MetricItem icon={<Clock size={17} />} value="28" label="Total Weeks" />
              <MetricItem icon={<BookOpen size={17} />} value={String(totalTopics)} label="Core Topics" />
              <MetricItem icon={<FileText size={17} />} value={String(modulesData.length)} label="PDF Handouts" />
            </div>

            {/* Search Bar with dedicated spacing */}
            <div
              style={{
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'var(--c-surface)',
                  border: '1.5px solid var(--c-border)',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow-md)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ paddingLeft: '16px', display: 'flex', alignItems: 'center', color: 'var(--c-text-3)' }}>
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  placeholder="Search topics, algorithms (e.g. Decision Trees, SVD, Spark)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '13px 14px',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    color: 'var(--c-text)',
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      marginRight: '12px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: 'var(--c-surface-alt)',
                      color: 'var(--c-text-2)',
                      border: '1px solid var(--c-border)',
                      cursor: 'pointer',
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          MODULES LIST CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <section className="container-max" style={{ paddingTop: '36px' }}>
        {filteredModules.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 24px',
              borderRadius: '24px',
              border: '1px solid var(--c-border)',
              background: 'var(--c-surface)',
              maxWidth: '540px',
              margin: '0 auto',
            }}
          >
            <BookOpen size={40} style={{ margin: '0 auto 12px auto', color: 'var(--c-text-3)' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--c-text)', marginBottom: '6px' }}>
              No matching modules found
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--c-text-2)', marginBottom: '18px' }}>
              Try searching with different keywords like "regression", "SVD", or "entropy".
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="btn-primary"
              style={{ fontSize: '12px', padding: '8px 18px' }}
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {filteredModules.map((mod, idx) => (
              <ModuleCard
                key={mod.id}
                module={mod}
                index={idx}
                isExpanded={expandedId === mod.id}
                activeTab={activeTabs[mod.id] || 'topics'}
                onSelectTab={tab => setTab(mod.id, tab)}
                onToggle={() => toggle(mod.id)}
                onOpenPdf={(page = 1) => handleOpenPdf(mod, page)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Interactive PDF Reader Modal */}
      <ModulePdfReaderModal
        module={pdfModalModule}
        initialPage={pdfModalInitialPage}
        isOpen={Boolean(pdfModalModule)}
        onClose={() => setPdfModalModule(null)}
      />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────
// METRIC RIBBON ITEM
// ─────────────────────────────────────────────────────────────
function MetricItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 14px',
        borderRadius: '16px',
        background: 'var(--c-surface)',
        border: '1px solid var(--c-border)',
        boxShadow: 'var(--shadow-sm)',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '11px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: 'rgba(14, 165, 168, 0.1)',
          color: 'var(--c-accent)',
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontWeight: 800,
            fontSize: '16px',
            lineHeight: 1,
            color: 'var(--c-text)',
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: '11px',
            color: 'var(--c-text-3)',
            marginTop: '3px',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MODULE CARD COMPONENT
// ─────────────────────────────────────────────────────────────
function ModuleCard({
  module: mod,
  index,
  isExpanded,
  activeTab,
  onSelectTab,
  onToggle,
  onOpenPdf,
}: {
  module: Module;
  index: number;
  isExpanded: boolean;
  activeTab: 'topics' | 'outcomes' | 'pages';
  onSelectTab: (tab: 'topics' | 'outcomes' | 'pages') => void;
  onToggle: () => void;
  onOpenPdf: (page?: number) => void;
}) {
  return (
    <article
      style={{
        background: 'var(--c-surface)',
        border: `1px solid ${isExpanded ? mod.color + '55' : 'var(--c-border)'}`,
        borderRadius: '24px',
        boxShadow: isExpanded ? `0 16px 44px ${mod.color}15` : 'var(--shadow-sm)',
        overflow: 'hidden',
        transition: 'all 240ms ease',
      }}
    >
      {/* Accent gradient line */}
      <div
        style={{
          height: '5px',
          width: '100%',
          background: `linear-gradient(90deg, ${mod.color}, ${mod.color}80 40%, transparent)`,
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          CARD HEADER – Spacious, Perfectly Aligned
      ───────────────────────────────────────────────────────────── */}
      <div style={{ padding: '24px 28px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          {/* Left Title Area */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '18px',
              minWidth: 0,
              flex: '1 1 500px',
              cursor: 'pointer',
            }}
            onClick={onToggle}
          >
            {/* Number Pill */}
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '20px',
                fontWeight: 900,
                background: mod.color + '16',
                color: mod.color,
                border: `2px solid ${mod.color}35`,
              }}
            >
              {String(mod.number).padStart(2, '0')}
            </div>

            {/* Information Stack */}
            <div style={{ minWidth: 0, flex: 1 }}>
              {/* Category Breadcrumb */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: mod.color,
                  }}
                >
                  Module {mod.number}
                </span>
                <span style={{ color: 'var(--c-text-3)', fontSize: '11px' }}>•</span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: mod.color + '12',
                    color: mod.color,
                  }}
                >
                  {mod.pdfInfo.subjectCode}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: 'var(--c-surface-alt)',
                    color: 'var(--c-text-2)',
                    border: '1px solid var(--c-border)',
                  }}
                >
                  {mod.pdfInfo.totalPages} Pages Notes
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: 'var(--c-text)',
                  lineHeight: 1.3,
                  marginBottom: '5px',
                }}
              >
                {mod.title}
              </h2>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--c-text-2)',
                  lineHeight: 1.5,
                  maxWidth: '750px',
                }}
              >
                {mod.subtitle}
              </p>

              {/* Metadata Badges */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <span className="chip">
                  <Clock size={12} />
                  {mod.duration}
                </span>
                <span className="chip">
                  <FlaskConical size={12} />
                  {mod.experiments} Experiments
                </span>
                <span className="chip">
                  <BookOpen size={12} />
                  {mod.topics.length} Topics
                </span>
                <span
                  className="chip"
                  style={{
                    background: mod.color + '10',
                    color: mod.color,
                    borderColor: mod.color + '25',
                    fontWeight: 600,
                  }}
                >
                  <FileText size={12} />
                  Official PDF Notes Included
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Cluster - Consistent 42px Height & Clear Gaps */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexShrink: 0,
            }}
          >
            {/* Primary: Read PDF Notes */}
            <button
              onClick={() => onOpenPdf(1)}
              style={{
                height: '42px',
                padding: '0 18px',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '13px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: mod.color,
                border: 'none',
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${mod.color}35`,
                transition: 'all 150ms ease',
                whiteSpace: 'nowrap',
              }}
              title="Open In-App PDF Reader"
            >
              <FileText size={16} />
              <span>Read PDF Notes</span>
            </button>

            {/* Secondary: Download PDF File */}
            <a
              href={mod.pdfInfo.fileUrl}
              download={mod.pdfInfo.fileName}
              style={{
                height: '42px',
                padding: '0 15px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                background: 'var(--c-surface-alt)',
                border: '1px solid var(--c-border)',
                color: 'var(--c-text)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 150ms ease',
                whiteSpace: 'nowrap',
              }}
              title={`Download ${mod.pdfInfo.fileName}`}
            >
              <Download size={15} />
              <span>Download</span>
            </a>

            {/* Tertiary: Open Raw in New Tab */}
            <a
              href={mod.pdfInfo.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: '42px',
                width: '42px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--c-surface-alt)',
                border: '1px solid var(--c-border)',
                color: 'var(--c-text-3)',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
              title="Open raw PDF in new tab"
            >
              <ExternalLink size={16} />
            </a>

            {/* Accordion Expand/Collapse */}
            <button
              onClick={onToggle}
              style={{
                height: '42px',
                width: '42px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isExpanded ? mod.color + '15' : 'var(--c-surface-alt)',
                border: `1px solid ${isExpanded ? mod.color + '40' : 'var(--c-border)'}`,
                color: isExpanded ? mod.color : 'var(--c-text-3)',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
              title={isExpanded ? 'Collapse Module' : 'Expand Module'}
            >
              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          EXPANDED ACCORDION CONTENT (Clean, Symmetrical, No Clutter)
      ───────────────────────────────────────────────────────────── */}
      {isExpanded && (
        <div style={{ padding: '0 28px 28px 28px' }} className="page-enter">
          {/* Subtle separator with generous spacing */}
          <div
            style={{
              height: '1px',
              width: '100%',
              background: 'var(--c-border)',
              marginBottom: '20px',
            }}
          />

          {/* Module Description with generous breathing room */}
          <p
            style={{
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'var(--c-text-2)',
              maxWidth: '850px',
              marginBottom: '22px',
            }}
          >
            {mod.description}
          </p>

          {/* Segmented Control Pill Switcher */}
          <div
            style={{
              display: 'inline-flex',
              padding: '5px',
              borderRadius: '14px',
              background: 'var(--c-surface-alt)',
              border: '1px solid var(--c-border)',
              marginBottom: '24px',
              gap: '6px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => onSelectTab('topics')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 150ms ease',
                border: activeTab === 'topics' ? `1px solid ${mod.color}40` : '1px solid transparent',
                background: activeTab === 'topics' ? 'var(--c-surface)' : 'transparent',
                color: activeTab === 'topics' ? mod.color : 'var(--c-text-3)',
                boxShadow: activeTab === 'topics' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <BookOpen size={14} />
              <span>Curriculum Topics ({mod.topics.length})</span>
            </button>

            <button
              onClick={() => onSelectTab('outcomes')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 150ms ease',
                border: activeTab === 'outcomes' ? `1px solid ${mod.color}40` : '1px solid transparent',
                background: activeTab === 'outcomes' ? 'var(--c-surface)' : 'transparent',
                color: activeTab === 'outcomes' ? mod.color : 'var(--c-text-3)',
                boxShadow: activeTab === 'outcomes' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <Target size={14} />
              <span>Learning Outcomes ({mod.outcomes.length})</span>
            </button>

            <button
              onClick={() => onSelectTab('pages')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 150ms ease',
                border: activeTab === 'pages' ? `1px solid ${mod.color}40` : '1px solid transparent',
                background: activeTab === 'pages' ? 'var(--c-surface)' : 'transparent',
                color: activeTab === 'pages' ? mod.color : 'var(--c-text-3)',
                boxShadow: activeTab === 'pages' ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <FileText size={14} />
              <span>Lecture Pages & Handouts ({mod.pdfPages.length})</span>
            </button>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              TAB 1: CURRICULUM TOPICS (Balanced 2-Column Responsive Grid)
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'topics' && (
            <div className="page-enter">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--c-text-3)',
                }}
              >
                <span>Core Topics & Concepts</span>
                <span>Click any topic to read in PDF</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '14px',
                }}
              >
                {mod.topics.map((topic, i) => (
                  <div
                    key={i}
                    onClick={() => topic.pageReference && onOpenPdf(topic.pageReference)}
                    style={{
                      padding: '16px 18px',
                      borderRadius: '16px',
                      background: 'var(--c-surface-alt)',
                      border: '1px solid var(--c-border)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '14px',
                      transition: 'all 160ms ease',
                    }}
                    className="hover:border-cyan-500/60"
                  >
                    {/* Index Badge */}
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '12px',
                        fontWeight: 800,
                        fontFamily: 'monospace',
                        background: mod.color + '18',
                        color: mod.color,
                        marginTop: '2px',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          marginBottom: '4px',
                        }}
                      >
                        <h3
                          style={{
                            fontSize: '14px',
                            fontWeight: 700,
                            color: 'var(--c-text)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {topic.title}
                        </h3>
                        {topic.pageReference && (
                          <span
                            style={{
                              fontSize: '10px',
                              fontFamily: 'monospace',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: '6px',
                              background: mod.color + '15',
                              border: `1px solid ${mod.color}30`,
                              color: mod.color,
                              flexShrink: 0,
                            }}
                          >
                            Page {topic.pageReference}
                          </span>
                        )}
                      </div>
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--c-text-2)',
                          lineHeight: 1.5,
                        }}
                      >
                        {topic.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 2: LEARNING OUTCOMES (Clean Competency Checklist)
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'outcomes' && (
            <div className="page-enter">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '14px',
                  marginBottom: '20px',
                }}
              >
                {mod.outcomes.map((outcome, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '16px 18px',
                      borderRadius: '16px',
                      background: 'var(--c-surface-alt)',
                      border: '1px solid var(--c-border)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <CheckCircle
                      size={18}
                      style={{ color: mod.color, flexShrink: 0, marginTop: '2px' }}
                    />
                    <div style={{ fontSize: '13px', color: 'var(--c-text-2)', lineHeight: 1.5 }}>
                      <strong
                        style={{
                          display: 'block',
                          color: 'var(--c-text)',
                          fontSize: '12px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          marginBottom: '3px',
                        }}
                      >
                        Competency {i + 1}
                      </strong>
                      {outcome}
                    </div>
                  </div>
                ))}
              </div>

              {/* Accreditation Reference Banner */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '16px',
                  background: mod.color + '0C',
                  border: `1px solid ${mod.color}25`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <div style={{ fontSize: '24px' }}>{mod.icon}</div>
                <div style={{ fontSize: '12px', color: 'var(--c-text-2)', lineHeight: 1.5 }}>
                  This module adheres to the official{' '}
                  <strong style={{ color: 'var(--c-text)' }}>
                    B.Tech Data Science Curriculum ({mod.pdfInfo.subjectCode})
                  </strong>{' '}
                  academic guidelines, combining theoretical rigor with practical laboratory
                  implementation and industry tools.
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 3: LECTURE PAGES & HANDOUTS
          ───────────────────────────────────────────────────────────── */}
          {activeTab === 'pages' && (
            <div className="page-enter">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--c-text-3)',
                }}
              >
                <span>Lecture Pages Index ({mod.pdfPages.length} Pages)</span>
                <span>Click to view in reader</span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '14px',
                }}
              >
                {mod.pdfPages.map(page => (
                  <div
                    key={page.pageNumber}
                    onClick={() => onOpenPdf(page.pageNumber)}
                    style={{
                      padding: '16px',
                      borderRadius: '16px',
                      background: 'var(--c-surface-alt)',
                      border: '1px solid var(--c-border)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 160ms ease',
                    }}
                    className="hover:border-cyan-500/60"
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                          color: 'var(--c-text-3)',
                          marginBottom: '6px',
                        }}
                      >
                        <span style={{ fontWeight: 800, color: mod.color }}>Page {page.pageNumber}</span>
                        <span>{page.sectionCode || ''}</span>
                      </div>
                      <h4
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--c-text)',
                          marginBottom: '4px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {page.title}
                      </h4>
                      <p
                        style={{
                          fontSize: '11px',
                          color: 'var(--c-text-2)',
                          lineHeight: 1.5,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {page.content[0] || 'Official university lecture notes.'}
                      </p>
                    </div>

                    <div
                      style={{
                        marginTop: '14px',
                        paddingTop: '10px',
                        borderTop: '1px solid var(--c-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '11px',
                        color: 'var(--c-text-3)',
                      }}
                    >
                      <span>Open in Reader</span>
                      <ArrowRight size={13} style={{ color: mod.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
