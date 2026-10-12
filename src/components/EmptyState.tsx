import React from 'react';
import { BarChart3, Plus } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-experiments' | 'no-results';
  onAdd?: () => void;
}

export default function EmptyState({ type, onAdd }: EmptyStateProps) {
  if (type === 'no-experiments') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-[#F0FDFE] border-2 border-dashed border-[#0EA5A8]/30 flex items-center justify-center mb-5">
          <BarChart3 size={32} className="text-[#0EA5A8]/60" />
        </div>
        <h3 className="text-xl font-semibold text-[#102033] mb-2">No experiments yet</h3>
        <p className="text-[#64748B] text-sm mb-6 max-w-xs leading-relaxed">
          Your laboratory experiment library is currently empty. Add your first experiment to get started.
        </p>
        {onAdd && (
          <button onClick={onAdd} className="btn-primary">
            <Plus size={16} />
            Add Experiment
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-2xl bg-[#F8FAFC] border-2 border-dashed border-[#CBD5E1] flex items-center justify-center mb-5">
        <BarChart3 size={32} className="text-[#94A3B8]" />
      </div>
      <h3 className="text-xl font-semibold text-[#102033] mb-2">No experiments found</h3>
      <p className="text-[#64748B] text-sm max-w-xs">
        Try a different keyword or clear the search to see all experiments.
      </p>
    </div>
  );
}
