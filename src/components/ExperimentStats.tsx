import React from 'react';
import { BarChart3, Layers, CheckCircle2 } from 'lucide-react';

interface ExperimentStatsProps {
  total: number;
  subTotal: number;
  completedPercent: number;
}

export default function ExperimentStats({ total, subTotal, completedPercent }: ExperimentStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <StatCard
        icon={<BarChart3 size={20} />}
        value={String(total).padStart(2, '0')}
        label="Experiments"
        color="#0EA5A8"
      />
      <StatCard
        icon={<Layers size={20} />}
        value={String(subTotal).padStart(2, '0')}
        label="Sub Experiments"
        color="#6366F1"
      />
      <StatCard
        icon={<CheckCircle2 size={20} />}
        value={`${completedPercent}%`}
        label="Completed"
        color="#059669"
      />
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div
      className="stat-card flex flex-col items-center gap-2 text-center"
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: color + '18', color }}
      >
        {icon}
      </div>
      <div
        className="text-2xl font-black leading-none"
        style={{ color: 'var(--c-text)' }}
      >
        {value}
      </div>
      <div
        className="text-xs font-semibold"
        style={{ color: 'var(--c-text-3)' }}
      >
        {label}
      </div>
    </div>
  );
}
