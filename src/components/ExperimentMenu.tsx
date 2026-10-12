import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit2, Trash2 } from 'lucide-react';

interface ExperimentMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ExperimentMenu({ onEdit, onDelete }: ExperimentMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all border"
        style={{
          background: open ? 'var(--c-surface-alt)' : 'transparent',
          borderColor: open ? 'var(--c-border)' : 'transparent',
          color: 'var(--c-text-3)',
        }}
        aria-label="Experiment options"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-1.5 rounded-xl py-1.5 min-w-[130px] dropdown-enter z-20"
          style={{
            background: 'var(--c-surface)',
            border: '1px solid var(--c-border)',
            boxShadow: 'var(--shadow-lg)',
          }}
          role="menu"
        >
          <button
            onClick={() => { setOpen(false); onEdit(); }}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--c-text)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--c-surface-alt)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            role="menuitem"
          >
            <Edit2 size={14} style={{ color: 'var(--c-text-3)' }} />
            Edit
          </button>
          <button
            onClick={() => { setOpen(false); onDelete(); }}
            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium transition-colors"
            style={{ color: 'var(--c-danger)' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(220,38,38,0.08)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            role="menuitem"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
