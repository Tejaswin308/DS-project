import React from 'react';
import { BarChart3, Layers, CheckCircle2 } from 'lucide-react';

interface ExperimentStatsProps {
  total: number;
  subTotal: number;
  completedPercent: number;
}

export default function ExperimentStats({ total, subTotal, completedPercent }: ExperimentStatsProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: '16px',
        marginTop: '20px',
        marginBottom: '26px',
      }}
    >
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
      className="stat-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        borderRadius: '16px',
        background: 'var(--c-surface)',
        border: '1px solid var(--c-border)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 200ms ease',
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mb-2"
        style={{ background: color + '18', color }}
      >
        {icon}
      </div>
      <div
        className="text-2xl font-black leading-none mb-1"
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

