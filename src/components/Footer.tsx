import React from 'react';
import { FlaskConical, Database, Code2, ExternalLink } from 'lucide-react';

interface FooterProps {
  githubUrl?: string;
}

export default function Footer({ githubUrl }: FooterProps) {
  return (
    <footer
      className="border-t mt-auto"
      style={{
        background: 'var(--c-surface)',
        borderColor: 'var(--c-border)',
      }}
    >
      <div className="container-max py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #0B1F3A 0%, #163B63 100%)',
                }}
              >
                <div className="relative w-4 h-4">
                  <Database size={10} className="text-[#0EA5A8] absolute top-0 left-0" />
                  <FlaskConical size={10} className="text-[#38BDF8] absolute bottom-0 right-0" />
                </div>
              </div>
              <span
                className="font-bold text-base"
                style={{ color: 'var(--c-text)' }}
              >
                DS <span style={{ color: 'var(--c-accent)' }}>LAB</span>
              </span>
            </div>
            <p
              className="text-xs font-medium"
              style={{ color: 'var(--c-text-3)' }}
            >
              Data Science Laboratory – Experiments &amp; Projects
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: 'var(--c-text-3)', opacity: 0.6 }}
            >
              Mohan Babu University · Practical Learning · Data · Research
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-end gap-3">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
                style={{ color: 'var(--c-accent)' }}
              >
                <Code2 size={14} />
                GitHub Repository
                <ExternalLink size={11} />
              </a>
            )}
            <p
              className="text-xs"
              style={{ color: 'var(--c-text-3)' }}
            >
              &copy; {new Date().getFullYear()} Data Science Laboratory · MBU
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
