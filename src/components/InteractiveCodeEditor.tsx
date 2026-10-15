import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Trash2,
  Maximize2,
  Minimize2,
  Terminal,
  Code2,
  Clock,
  Sparkles,
  Columns,
  Rows,
} from 'lucide-react';
import { runPythonCode, ExecutionResult } from '../utils/pythonRunner';

interface InteractiveCodeEditorProps {
  initialCode: string;
  defaultOutput?: string;
  title?: string;
}

export default function InteractiveCodeEditor({
  initialCode,
  defaultOutput,
  title,
}: InteractiveCodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [outputResult, setOutputResult] = useState<ExecutionResult | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedOutput, setCopiedOutput] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'stacked'>('split');
  const [activeOutputTab, setActiveOutputTab] = useState<'live' | 'expected'>('live');
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Sync initial code if props change
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  // Handle keyboard shortcut (Ctrl+Enter or Cmd+Enter to run)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Run code shortcut: Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRunCode();
      return;
    }

    // Tab key support: insert 4 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);

      // Move cursor
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      });
      return;
    }

    // Auto-indent on Enter
    if (e.key === 'Enter') {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const currentLine = code.substring(0, start).split('\n').pop() || '';
      const match = currentLine.match(/^(\s+)/);
      const indentation = match ? match[1] : '';

      // If current line ends with colon, add 4 more spaces
      const extraIndent = currentLine.trim().endsWith(':') ? '    ' : '';

      if (indentation || extraIndent) {
        e.preventDefault();
        const indentToAdd = '\n' + indentation + extraIndent;
        const newCode = code.substring(0, start) + indentToAdd + code.substring(textarea.selectionEnd);
        setCode(newCode);

        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + indentToAdd.length;
        });
      }
    }
  };

  // Track cursor position for status bar
  const handleSelectOrChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    const start = target.selectionStart;
    const lines = code.substring(0, start).split('\n');
    setCursorPos({
      line: lines.length,
      col: (lines[lines.length - 1]?.length || 0) + 1,
    });
  };

  // Sync scrolling between textarea and line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Run Code handler
  const handleRunCode = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveOutputTab('live');

    try {
      const result = await runPythonCode(code, initialCode, defaultOutput);
      setOutputResult(result);
    } catch (err: any) {
      setOutputResult({
        stdout: '',
        stderr: err?.message || 'Execution failed.',
        status: 'error',
        executionTimeMs: 10,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Reset Code handler
  const handleResetCode = () => {
    setCode(initialCode);
  };

  // Copy Code handler
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch {
      // fallback
    }
  };

  // Copy Output handler
  const handleCopyOutput = async () => {
    const textToCopy =
      activeOutputTab === 'expected' && defaultOutput
        ? defaultOutput
        : outputResult?.stdout || outputResult?.stderr || defaultOutput || '';
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedOutput(true);
      setTimeout(() => setCopiedOutput(false), 2000);
    } catch {
      // fallback
    }
  };

  // Clear Output handler
  const handleClearOutput = () => {
    setOutputResult(null);
  };

  const lineCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  // Compute displayed output
  const activeStdout =
    activeOutputTab === 'expected'
      ? defaultOutput || '(No sample output available)'
      : outputResult
      ? outputResult.stdout
      : defaultOutput
      ? defaultOutput
      : '>>> Click "Run Code" above or press [Ctrl+Enter] to execute this Python program.';

  const activeStderr = activeOutputTab === 'live' ? outputResult?.stderr : undefined;

  return (
    <div
      className={`interactive-editor-container rounded-2xl border overflow-hidden transition-all duration-200 ${
        isFullscreen ? 'fixed inset-4 z-50 shadow-2xl flex flex-col' : 'relative shadow-md'
      }`}
      style={{
        background: 'var(--c-surface)',
        borderColor: 'var(--c-border)',
        boxShadow: isFullscreen ? '0 25px 50px -12px rgba(0, 0, 0, 0.7)' : 'var(--shadow-md)',
      }}
    >
      {/* ── TOP HEADER / TOOLBAR ── */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b"
        style={{
          background: 'rgba(15, 23, 42, 0.04)',
          borderColor: 'var(--c-border)',
        }}
      >
        {/* Left: Tab / File Indicator */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold"
            style={{
              background: 'var(--c-surface)',
              borderColor: 'var(--c-border)',
              color: 'var(--c-text)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <Code2 size={14} style={{ color: 'var(--c-accent)' }} />
            <span>main.py</span>
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-mono uppercase tracking-wider"
              style={{ background: 'var(--c-accent-dim)', color: 'var(--c-accent)' }}
            >
              Python 3.11
            </span>
          </div>

          {title && (
            <span
              className="hidden lg:inline-block text-xs font-medium max-w-xs truncate"
              style={{ color: 'var(--c-text-3)' }}
              title={title}
            >
              — {title}
            </span>
          )}
        </div>

        {/* Right: Actions (Run, Reset, Copy, Layout, Fullscreen) */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Toggle */}
          <div
            className="hidden sm:flex items-center rounded-lg border p-0.5"
            style={{
              borderColor: 'var(--c-border)',
              background: 'var(--c-surface-2)',
            }}
          >
            <button
              onClick={() => setViewMode('split')}
              title="Split View (Side-by-Side)"
              className={`p-1.5 rounded transition-all ${
                viewMode === 'split' ? 'shadow-sm text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              style={{
                background: viewMode === 'split' ? 'var(--c-surface)' : 'transparent',
              }}
            >
              <Columns size={14} />
            </button>
            <button
              onClick={() => setViewMode('stacked')}
              title="Stacked View (Top/Bottom)"
              className={`p-1.5 rounded transition-all ${
                viewMode === 'stacked' ? 'shadow-sm text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              style={{
                background: viewMode === 'stacked' ? 'var(--c-surface)' : 'transparent',
              }}
            >
              <Rows size={14} />
            </button>
          </div>

          {/* Reset Code */}
          <button
            onClick={handleResetCode}
            title="Reset code to default"
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer"
            style={{
              borderColor: 'var(--c-border)',
              color: 'var(--c-text-2)',
              background: 'var(--c-surface)',
            }}
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            title="Copy Python Code"
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer"
            style={{
              borderColor: 'var(--c-border)',
              color: copiedCode ? '#34D399' : 'var(--c-text-2)',
              background: 'var(--c-surface)',
            }}
          >
            {copiedCode ? <Check size={13} /> : <Copy size={13} />}
            <span className="hidden sm:inline">{copiedCode ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(v => !v)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Editor'}
            className="p-1.5 rounded-lg border transition-all cursor-pointer"
            style={{
              borderColor: 'var(--c-border)',
              color: 'var(--c-text-2)',
              background: 'var(--c-surface)',
            }}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>

          {/* RUN CODE BUTTON */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            title="Run Python Code (Ctrl+Enter)"
            className="flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-lg shadow-md transition-all cursor-pointer active:scale-95 disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #0EA5A8 0%, #3B82F6 100%)',
              color: '#FFFFFF',
              boxShadow: '0 4px 14px rgba(14, 165, 168, 0.35)',
            }}
          >
            {isRunning ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play size={13} fill="#FFFFFF" />
                <span>Run Code</span>
                <span className="text-[10px] opacity-80 font-mono hidden md:inline bg-black/20 px-1 py-0.5 rounded">
                  Ctrl+↵
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── EDITOR BODY (Split or Stacked) ── */}
      <div
        className={`grid ${
          viewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        } ${isFullscreen ? 'flex-1 min-h-0' : ''}`}
        style={{ minHeight: isFullscreen ? 'calc(100vh - 120px)' : '420px' }}
      >
        {/* ── LEFT: CODE EDITOR PANE ── */}
        <div
          className="flex flex-col relative border-b lg:border-b-0 lg:border-r"
          style={{
            borderColor: 'var(--c-border)',
            background: 'var(--c-bg-alt, #0D1625)',
          }}
        >
          {/* Code Subheader */}
          <div
            className="flex items-center justify-between px-3.5 py-1.5 text-[11px] font-mono border-b"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.07)',
              background: 'rgba(0, 0, 0, 0.15)',
              color: 'var(--c-text-3)',
            }}
          >
            <span>PYTHON SOURCE CODE</span>
            <span>Tab = 4 spaces · Auto-indent</span>
          </div>

          {/* Line Numbers + Textarea Container */}
          <div className="flex-1 flex relative overflow-hidden font-mono text-[13px] leading-[1.6]">
            {/* Line numbers gutter */}
            <div
              ref={lineNumbersRef}
              className="py-3 pl-3 pr-2 select-none text-right font-mono text-[12px] opacity-40 overflow-hidden"
              style={{
                width: '42px',
                color: 'var(--c-text-3)',
                background: 'rgba(0, 0, 0, 0.2)',
                lineHeight: '1.6',
              }}
              aria-hidden="true"
            >
              {lineNumbers.map(n => (
                <div key={n}>{n}</div>
              ))}
            </div>

            {/* Editable Textarea */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={e => {
                setCode(e.target.value);
                handleSelectOrChange(e);
              }}
              onKeyDown={handleKeyDown}
              onSelect={handleSelectOrChange}
              onScroll={handleScroll}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              className="flex-1 p-3 font-mono outline-none resize-none border-none overflow-auto"
              style={{
                background: 'transparent',
                color: 'var(--c-text, #E2E8F0)',
                lineHeight: '1.6',
                tabSize: 4,
                whiteSpace: 'pre',
                wordBreak: 'normal',
                fontFamily:
                  'Consolas, "Fira Code", Monaco, "Cascadia Code", "Courier New", monospace',
              }}
              placeholder="# Write or edit Python code here..."
              aria-label="Python Code Editor"
            />
          </div>

          {/* Editor Status Bar */}
          <div
            className="flex items-center justify-between px-3 py-1.5 text-[11px] border-t font-mono"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.07)',
              background: 'rgba(0, 0, 0, 0.2)',
              color: 'var(--c-text-3)',
            }}
          >
            <div className="flex items-center gap-3">
              <span>
                Ln {cursorPos.line}, Col {cursorPos.col}
              </span>
              <span>{lineCount} lines</span>
              <span>{code.length} chars</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-cyan-400">
              <Sparkles size={11} />
              <span>Runnable Lab Environment</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: OUTPUT TERMINAL PANE ── */}
        <div
          className="flex flex-col relative"
          style={{
            background: '#090E18',
            color: '#E2E8F0',
          }}
        >
          {/* Terminal Title Bar */}
          <div
            className="flex items-center justify-between px-3.5 py-2 border-b"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.08)',
              background: '#070B13',
            }}
          >
            {/* macOS 3 dots + Title */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
              </div>

              {/* Tabs: Live Output vs Expected Output */}
              <div className="flex items-center rounded-md p-0.5 bg-white/5 border border-white/10 text-xs">
                <button
                  onClick={() => setActiveOutputTab('live')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                    activeOutputTab === 'live'
                      ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal size={12} />
                  <span>Output Terminal</span>
                  {outputResult && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        outputResult.status === 'success' ? 'bg-emerald-400' : 'bg-rose-400'
                      }`}
                    />
                  )}
                </button>

                {defaultOutput && (
                  <button
                    onClick={() => setActiveOutputTab('expected')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                      activeOutputTab === 'expected'
                        ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>Expected Output</span>
                  </button>
                )}
              </div>
            </div>

            {/* Terminal Actions */}
            <div className="flex items-center gap-2">
              {outputResult && (
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mr-1 font-mono">
                  <Clock size={11} />
                  <span>{outputResult.executionTimeMs}ms</span>
                </div>
              )}

              {/* Copy Output */}
              <button
                onClick={handleCopyOutput}
                title="Copy Terminal Output"
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
              >
                {copiedOutput ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span className="hidden sm:inline">{copiedOutput ? 'Copied' : 'Copy'}</span>
              </button>

              {/* Clear Output */}
              <button
                onClick={handleClearOutput}
                title="Clear Terminal Output"
                className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-all"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>

          {/* Terminal Output Content */}
          <div
            className="flex-1 p-4 font-mono text-[12.5px] leading-relaxed overflow-auto select-text"
            style={{
              fontFamily:
                'Consolas, "Fira Code", Monaco, "Cascadia Code", "Courier New", monospace',
              minHeight: '260px',
            }}
          >
            {/* Command prompt banner */}
            <div className="flex items-center gap-2 text-slate-500 text-[11px] mb-2 select-none">
              <span className="text-cyan-400 font-bold">$</span>
              <span>python main.py</span>
              {isRunning && (
                <span className="text-cyan-400 animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  executing...
                </span>
              )}
            </div>

            {/* Error output if any */}
            {activeStderr && (
              <div className="mb-3 p-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 whitespace-pre-wrap">
                {activeStderr}
              </div>
            )}

            {/* Standard output */}
            {activeStdout && (
              <pre className="text-slate-200 whitespace-pre-wrap font-mono leading-relaxed">
                {activeStdout}
              </pre>
            )}

            {/* Running Spinner if active */}
            {isRunning && (
              <div className="mt-4 flex items-center gap-2 text-cyan-400 text-xs">
                <span className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span>Running analytical pipeline...</span>
              </div>
            )}
          </div>

          {/* Terminal Footer Status Bar */}
          <div
            className="flex items-center justify-between px-3.5 py-1.5 text-[11px] font-mono border-t"
            style={{
              borderColor: 'rgba(255, 255, 255, 0.08)',
              background: '#070B13',
              color: 'var(--c-text-3)',
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isRunning
                    ? 'bg-amber-400 animate-pulse'
                    : outputResult?.status === 'error'
                    ? 'bg-rose-400'
                    : 'bg-emerald-400'
                }`}
              />
              <span className="text-slate-300">
                {isRunning
                  ? 'Executing script...'
                  : outputResult?.status === 'error'
                  ? 'Process terminated with error'
                  : outputResult
                  ? 'Process finished with exit code 0'
                  : 'Ready to execute'}
              </span>
            </div>

            <div className="text-[10px] text-slate-500 hidden sm:block">
              {activeOutputTab === 'expected' ? 'Sample Lab Output' : 'Interactive Python Console'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
