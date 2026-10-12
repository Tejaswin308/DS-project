import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'Python' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-block">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/10">
        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md transition-all duration-150"
          style={{
            background: copied ? 'rgba(22, 163, 74, 0.15)' : 'rgba(255,255,255,0.08)',
            color: copied ? '#4ADE80' : '#94A3B8',
          }}
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={12} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}
