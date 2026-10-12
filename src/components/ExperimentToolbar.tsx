import React from 'react';
import { Search, Plus, X } from 'lucide-react';

interface ExperimentToolbarProps {
  search: string;
  onSearchChange: (val: string) => void;
  onAdd: () => void;
}

export default function ExperimentToolbar({ search, onSearchChange, onAdd }: ExperimentToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-6">
      {/* Search */}
      <div className="flex-1 relative">
        <label htmlFor="experiment-search" className="sr-only">Search experiments</label>
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--c-text-3)' }}
        />
        <input
          id="experiment-search"
          type="text"
          placeholder="Search experiments..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl outline-none transition-all border"
          style={{
            background: 'var(--c-surface)',
            color: 'var(--c-text)',
            borderColor: 'var(--c-border)',
          }}
          onFocus={e => {
            e.target.style.borderColor = 'var(--c-accent)';
            e.target.style.boxShadow = '0 0 0 3px var(--c-accent-dim)';
          }}
          onBlur={e => {
            e.target.style.borderColor = 'var(--c-border)';
            e.target.style.boxShadow = 'none';
          }}
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: 'var(--c-text-3)' }}
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Add button */}
      <button
        onClick={onAdd}
        className="btn-primary flex-shrink-0 sm:w-auto w-full justify-center"
        id="add-experiment-btn"
      >
        <Plus size={16} />
        Add Experiment
      </button>
    </div>
  );
}
