import React from 'react';
import { Code2, ExternalLink } from 'lucide-react';

interface GitHubLinkProps {
  url: string;
  label?: string;
  size?: 'sm' | 'md';
}

export default function GitHubLink({ url, label = 'View GitHub Repository', size = 'md' }: GitHubLinkProps) {
  if (!url || !url.trim()) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-semibold text-[#0EA5A8] hover:text-[#0B8F92] transition-colors ${size === 'sm' ? 'text-sm' : 'text-[14px]'}`}
      aria-label={`${label} (opens in new tab)`}
    >
      <Code2 size={size === 'sm' ? 14 : 16} />
      {label}
      <ExternalLink size={size === 'sm' ? 12 : 13} />
    </a>
  );
}
