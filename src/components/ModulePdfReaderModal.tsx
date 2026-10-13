import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Printer,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  BookOpen,
  List,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import type { Module, ModulePdfPage } from '../data/modulesData';

interface ModulePdfReaderModalProps {
  module: Module | null;
  initialPage?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModulePdfReaderModal({
  module,
  initialPage = 1,
  isOpen,
  onClose,
}: ModulePdfReaderModalProps) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<'single' | 'continuous'>('single');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(initialPage || 1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialPage]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (module && currentPage < module.pdfInfo.totalPages) {
          setCurrentPage(prev => Math.min(prev + 1, module.pdfInfo.totalPages));
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentPage > 1) {
          setCurrentPage(prev => Math.max(prev - 1, 1));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage, module, onClose]);

  // Scroll to current page in continuous mode
  useEffect(() => {
    if (viewMode === 'continuous' && scrollContainerRef.current) {
      const pageEl = document.getElementById(`pdf-page-${currentPage}`);
      if (pageEl) {
        pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [currentPage, viewMode]);

  // Search filter matches
  const searchMatches = useMemo(() => {
    if (!module || !searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return module.pdfPages.filter(p => {
      const inTitle = p.title.toLowerCase().includes(q);
      const inContent = p.content.some(c => c.toLowerCase().includes(q));
      const inKeyPoints = p.keyPoints?.some(k => k.toLowerCase().includes(q));
      return inTitle || inContent || inKeyPoints;
    });
  }, [searchQuery, module]);

  if (!isOpen || !module) return null;

  const totalPages = module.pdfPages.length > 0 ? module.pdfPages.length : module.pdfInfo.totalPages;
  const activePageData = module.pdfPages.find(p => p.pageNumber === currentPage) || module.pdfPages[0];

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(Math.max(prev + delta, 70), 160));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/80 backdrop-blur-md animate-fade-in"
      style={{ isolation: 'isolate' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-viewer-title"
    >
      {/* Top Application Bar */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-white select-none z-20 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-black text-sm"
            style={{ background: module.color + '25', color: module.color }}
          >
            M{module.number}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm truncate text-slate-100" id="pdf-viewer-title">
                {module.pdfInfo.fileName}
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                Official PDF Material
              </span>
            </div>
            <div className="text-xs text-slate-400 truncate flex items-center gap-2">
              <span>{module.pdfInfo.subjectCode}</span>
              <span>•</span>
              <span>{totalPages} Pages</span>
              <span>•</span>
              <span>{module.pdfInfo.fileSize}</span>
            </div>
          </div>
        </div>

        {/* Center: Controls Toolbar */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800 text-xs">
          {/* Page flip */}
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage <= 1}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Previous Page (Left Arrow)"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1 px-2 font-mono text-slate-200">
            <input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={e => {
                const val = parseInt(e.target.value, 10);
                if (val >= 1 && val <= totalPages) setCurrentPage(val);
              }}
              className="w-10 px-1 py-0.5 text-center bg-slate-800 border border-slate-700 rounded text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
            <span className="text-slate-400">/ {totalPages}</span>
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage >= totalPages}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent"
            title="Next Page (Right Arrow)"
          >
            <ChevronRight size={16} />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Zoom controls */}
          <button
            onClick={() => handleZoom(-15)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300"
            title="Zoom Out"
          >
            <ZoomOut size={15} />
          </button>
          <button
            onClick={() => setZoomLevel(100)}
            className="px-2 py-0.5 rounded text-[11px] font-mono hover:bg-slate-800 text-slate-300"
            title="Reset Zoom"
          >
            {zoomLevel}%
          </button>
          <button
            onClick={() => handleZoom(15)}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300"
            title="Zoom In"
          >
            <ZoomIn size={15} />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Mode switch */}
          <button
            onClick={() => setViewMode(v => (v === 'single' ? 'continuous' : 'single'))}
            className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
              viewMode === 'continuous' ? 'bg-cyan-600/30 text-cyan-300' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Continuous Scroll"
          >
            {viewMode === 'single' ? '1-Page' : 'Scroll All'}
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5">
          {/* Download Raw PDF Button */}
          <a
            href={module.pdfInfo.fileUrl}
            download={module.pdfInfo.fileName}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors shadow-sm"
            title="Download PDF File"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Download</span>
          </a>

          {/* Open Raw in New Tab */}
          <a
            href={module.pdfInfo.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
            title="Open Raw PDF in New Tab"
          >
            <ExternalLink size={16} />
          </a>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors"
            title="Print Notes"
          >
            <Printer size={16} />
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Close Viewer (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Navigator Sidebar */}
        <aside
          className={`flex-shrink-0 bg-slate-900/95 border-r border-slate-800 flex flex-col transition-all duration-300 z-10 ${
            sidebarOpen ? 'w-72 md:w-80' : 'w-12'
          }`}
        >
          {/* Sidebar Toggle & Search */}
          <div className="p-3 border-b border-slate-800 flex items-center justify-between gap-2">
            {sidebarOpen ? (
              <div className="relative flex-1">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search in PDF notes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            ) : null}
            <button
              onClick={() => setSidebarOpen(s => !s)}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
            >
              <List size={16} />
            </button>
          </div>

          {/* Search Result Summary if active */}
          {sidebarOpen && searchQuery && (
            <div className="px-3 py-1.5 bg-cyan-950/40 border-b border-cyan-800/40 text-[11px] text-cyan-300 flex items-center justify-between">
              <span>{searchMatches.length} matching pages</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            </div>
          )}

          {/* Thumbnail / Page Outline List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {sidebarOpen ? (
              module.pdfPages.map(page => {
                const isSelected = page.pageNumber === currentPage;
                const isMatch = searchQuery ? searchMatches.some(m => m.pageNumber === page.pageNumber) : false;

                return (
                  <button
                    key={page.pageNumber}
                    onClick={() => setCurrentPage(page.pageNumber)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500/60 text-white shadow-sm'
                        : isMatch
                        ? 'bg-slate-800/90 border-cyan-700/50 text-slate-200'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-mono font-bold ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {page.pageNumber}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-cyan-400 truncate">
                        {page.sectionCode || `Page ${page.pageNumber}`}
                      </div>
                      <div className="text-xs font-semibold truncate text-slate-100">
                        {page.title}
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                        {page.content[0] || 'Official lecture material'}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              // Collapsed icons
              module.pdfPages.map(page => (
                <button
                  key={page.pageNumber}
                  onClick={() => setCurrentPage(page.pageNumber)}
                  className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                    page.pageNumber === currentPage
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title={`Page ${page.pageNumber}: ${page.title}`}
                >
                  {page.pageNumber}
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Main Document Reader Stage */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto bg-slate-950/90 p-4 md:p-8 flex flex-col items-center"
        >
          {viewMode === 'single' ? (
            /* Single Page View */
            <DocumentPageCard
              page={activePageData}
              module={module}
              zoomLevel={zoomLevel}
              totalPages={totalPages}
            />
          ) : (
            /* Continuous Scroll View (All Pages) */
            <div className="space-y-10 w-full flex flex-col items-center">
              {module.pdfPages.map(page => (
                <div key={page.pageNumber} id={`pdf-page-${page.pageNumber}`} className="w-full flex justify-center">
                  <DocumentPageCard
                    page={page}
                    module={module}
                    zoomLevel={zoomLevel}
                    totalPages={totalPages}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Page Bar (For Mobile and Quick Paging) */}
      <footer className="md:hidden flex items-center justify-between px-4 py-2.5 bg-slate-900 border-t border-slate-800 text-slate-200 text-xs">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 px-3 py-1 rounded bg-slate-800 text-slate-200 disabled:opacity-30"
        >
          <ChevronLeft size={14} /> Prev
        </button>
        <span className="font-mono">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-1 px-3 py-1 rounded bg-slate-800 text-slate-200 disabled:opacity-30"
        >
          Next <ChevronRight size={14} />
        </button>
      </footer>
    </div>
  );
}

// -------------------------------------------------------------
// Individual Document Page Card (Rendered like an A4 Sheet)
// -------------------------------------------------------------
function DocumentPageCard({
  page,
  module,
  zoomLevel,
  totalPages,
}: {
  page: ModulePdfPage;
  module: Module;
  zoomLevel: number;
  totalPages: number;
}) {
  return (
    <article
      className="bg-white text-slate-900 shadow-2xl rounded-sm transition-all duration-200 overflow-hidden relative print:shadow-none print:w-full"
      style={{
        width: `${Math.round(760 * (zoomLevel / 100))}px`,
        minHeight: `${Math.round(1020 * (zoomLevel / 100))}px`,
        maxWidth: '100%',
        fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif",
      }}
    >
      {/* Top Academic Header */}
      <header className="px-8 pt-6 pb-4 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-500 uppercase tracking-widest font-semibold select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: module.color }} />
          <span>SPECIALIZATION ELECTIVE • {module.pdfInfo.subjectCode}</span>
        </div>
        <div className="font-mono text-slate-400">
          Module {module.number}
        </div>
      </header>

      {/* Document Body */}
      <div className="px-8 py-7 space-y-5">
        {/* Section title & code */}
        <div>
          {page.sectionCode && (
            <span
              className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider mb-2"
              style={{ background: module.color + '18', color: module.color }}
            >
              {page.sectionCode}
            </span>
          )}
          <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-snug">
            {page.title}
          </h2>
        </div>

        {/* Main Content Paragraphs */}
        <div className="space-y-3 text-sm leading-relaxed text-slate-700">
          {page.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Key Takeaways / Bullet points */}
        {page.keyPoints && page.keyPoints.length > 0 && (
          <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: module.color }} />
              Key Concepts & Principles
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-slate-700">
              {page.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-slate-400 font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Formatted Table if present (e.g. Customer Data Sample) */}
        {page.tableData && (
          <div className="my-5 overflow-hidden rounded-xl border border-slate-300">
            {page.tableData.caption && (
              <div className="bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 border-b border-slate-300">
                {page.tableData.caption}
              </div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-200/80 text-slate-800 font-semibold uppercase text-[10px]">
                  <tr>
                    {page.tableData.headers.map((h, i) => (
                      <th key={i} className="px-3 py-2 border-r border-slate-300 last:border-r-0">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700 font-mono">
                  {page.tableData.rows.map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-3 py-2 border-r border-slate-200 last:border-r-0">
                          {String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Figures / Diagrams (e.g. Figure 1.1 Data Volume, Flowcharts, Entropy) */}
        {page.figures && page.figures.length > 0 && (
          <div className="space-y-4 my-5">
            {page.figures.map((fig, fi) => (
              <div
                key={fi}
                className="p-4 rounded-xl border border-cyan-200 bg-cyan-50/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-cyan-900 uppercase tracking-wide">
                    {fig.title}
                  </h4>
                  <span className="text-[10px] text-cyan-700 italic">{fig.caption}</span>
                </div>
                {fig.description && (
                  <p className="text-xs text-slate-700 leading-relaxed mb-3">
                    {fig.description}
                  </p>
                )}
                {fig.details && fig.details.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-3 rounded-lg border border-cyan-200/80">
                    {fig.details.map((d, di) => (
                      <div key={di} className="text-slate-800">
                        {d}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Mathematical Formulas */}
        {page.formulas && page.formulas.length > 0 && (
          <div className="my-5 space-y-3">
            {page.formulas.map((form, foi) => (
              <div
                key={foi}
                className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs md:text-sm shadow-md"
              >
                <div className="text-[11px] font-sans font-bold text-cyan-400 uppercase tracking-wider mb-1.5">
                  {form.name}
                </div>
                <div className="p-3 bg-slate-950 rounded-lg text-emerald-400 font-bold overflow-x-auto text-center border border-slate-800">
                  {form.formula}
                </div>
                {form.where && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800 text-[11px] text-slate-300 font-sans space-y-1">
                    {form.where.map((w, wi) => (
                      <div key={wi}>• {w}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Code Snippets (e.g. R Code with ggplot2 / randomForest) */}
        {page.codeSnippet && (
          <div className="my-5 rounded-xl overflow-hidden border border-slate-300 bg-slate-950 text-slate-100">
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-cyan-400">{page.codeSnippet.language} Implementation</span>
              {page.codeSnippet.description && <span>{page.codeSnippet.description}</span>}
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
              <code>{page.codeSnippet.code}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Document Page Footer */}
      <footer className="mt-8 px-8 py-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400 font-mono select-none">
        <span>B.Tech Data Science (22DS102006)</span>
        <span className="font-bold text-slate-600">
          Page {page.pageNumber} of {totalPages}
        </span>
      </footer>
    </article>
  );
}
