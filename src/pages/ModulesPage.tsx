import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, FlaskConical, CheckCircle, BookOpen, Target, Layers } from 'lucide-react';
import { modulesData, type Module } from '../data/modulesData';

export default function ModulesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => setExpandedId(prev => (prev === id ? null : id));

  return (
    <main className="page-enter">
      {/* Hero banner */}
      <section
        className="py-12 md:py-16 relative overflow-hidden"
        style={{ background: 'var(--c-bg)' }}
        aria-labelledby="modules-heading"
      >
        {/* Decorative gradient blobs */}
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(14,165,168,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translate(-30%, -30%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translate(30%, 30%)',
          }}
          aria-hidden="true"
        />

        <div className="container-max relative">
          <div className="section-label mb-3">Curriculum</div>
          <h1
            id="modules-heading"
            className="font-black leading-tight mb-4"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--c-text)' }}
          >
            Data Science{' '}
            <span className="gradient-text">Learning Modules</span>
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed max-w-2xl mb-8"
            style={{ color: 'var(--c-text-2)' }}
          >
            A structured curriculum covering the complete Data Science pipeline — from exploratory
            analysis and statistical inference through ensemble models and dimensionality reduction.
          </p>

          {/* Summary stats */}
          <div className="flex flex-wrap gap-4">
            <SummaryStat icon={<Layers size={16} />} value="5" label="Modules" />
            <SummaryStat icon={<FlaskConical size={16} />} value="21" label="Experiments" />
            <SummaryStat icon={<Clock size={16} />} value="24" label="Weeks" />
            <SummaryStat icon={<BookOpen size={16} />} value="25" label="Topics" />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="divider" />

      {/* Modules list */}
      <section className="container-max py-10 page-bg">
        <div className="space-y-5">
          {modulesData.map((mod, idx) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              index={idx}
              isExpanded={expandedId === mod.id}
              onToggle={() => toggle(mod.id)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function SummaryStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border"
      style={{
        background: 'var(--c-surface)',
        borderColor: 'var(--c-border)',
      }}
    >
      <span style={{ color: 'var(--c-accent)' }}>{icon}</span>
      <span className="font-bold text-sm" style={{ color: 'var(--c-text)' }}>
        {value}
      </span>
      <span className="text-sm" style={{ color: 'var(--c-text-3)' }}>
        {label}
      </span>
    </div>
  );
}

function ModuleCard({
  module: mod,
  index,
  isExpanded,
  onToggle,
}: {
  module: Module;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      className="overflow-hidden rounded-2xl border transition-all"
      style={{
        background: 'var(--c-surface)',
        borderColor: isExpanded ? mod.color + '50' : 'var(--c-border)',
        boxShadow: isExpanded ? `0 8px 32px ${mod.color}20` : 'var(--shadow-sm)',
        transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Accent top bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${mod.color}, ${mod.color}80)` }}
      />

      {/* Header (always visible) */}
      <button
        className="w-full text-left px-6 py-5 flex items-start gap-5"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`module-body-${mod.id}`}
      >
        {/* Number badge */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl font-black"
          style={{
            background: mod.color + '18',
            color: mod.color,
            border: `2px solid ${mod.color}30`,
          }}
        >
          {String(mod.number).padStart(2, '0')}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: mod.color }}
          >
            Module {mod.number}
          </div>
          <h2
            className="text-lg md:text-xl font-bold leading-snug mb-1"
            style={{ color: 'var(--c-text)' }}
          >
            {mod.title}
          </h2>
          <p className="text-sm" style={{ color: 'var(--c-text-3)' }}>
            {mod.subtitle}
          </p>

          {/* Chips row */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="chip">
              <Clock size={11} />
              {mod.duration}
            </span>
            <span className="chip">
              <FlaskConical size={11} />
              {mod.experiments} Experiments
            </span>
            <span className="chip">
              <BookOpen size={11} />
              {mod.topics.length} Topics
            </span>
          </div>
        </div>

        {/* Chevron */}
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
          style={{
            background: isExpanded ? mod.color + '18' : 'var(--c-surface-alt)',
            color: isExpanded ? mod.color : 'var(--c-text-3)',
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(0deg)',
          }}
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {/* Expanded body */}
      {isExpanded && (
        <div
          id={`module-body-${mod.id}`}
          className="px-6 pb-6 page-enter"
        >
          {/* Divider */}
          <div className="divider mb-5" />

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-6 max-w-3xl"
            style={{ color: 'var(--c-text-2)' }}
          >
            {mod.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Topics */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: mod.color + '18' }}
                >
                  <BookOpen size={12} style={{ color: mod.color }} />
                </div>
                <h3
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: 'var(--c-text)' }}
                >
                  Topics Covered
                </h3>
              </div>
              <div className="space-y-3">
                {mod.topics.map((topic, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3 rounded-xl border"
                    style={{
                      background: 'var(--c-surface-alt)',
                      borderColor: 'var(--c-border)',
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                      style={{ background: mod.color + '20', color: mod.color }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div
                        className="text-sm font-semibold mb-0.5"
                        style={{ color: 'var(--c-text)' }}
                      >
                        {topic.title}
                      </div>
                      <div
                        className="text-xs leading-relaxed"
                        style={{ color: 'var(--c-text-2)' }}
                      >
                        {topic.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning outcomes */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: mod.color + '18' }}
                >
                  <Target size={12} style={{ color: mod.color }} />
                </div>
                <h3
                  className="text-sm font-bold uppercase tracking-wider"
                  style={{ color: 'var(--c-text)' }}
                >
                  Learning Outcomes
                </h3>
              </div>
              <div className="space-y-2.5">
                {mod.outcomes.map((outcome, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start p-3 rounded-xl border"
                    style={{
                      background: 'var(--c-surface-alt)',
                      borderColor: 'var(--c-border)',
                    }}
                  >
                    <CheckCircle
                      size={15}
                      className="flex-shrink-0 mt-0.5"
                      style={{ color: mod.color }}
                    />
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--c-text-2)' }}
                    >
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>

              {/* Module overview card */}
              <div
                className="mt-4 p-4 rounded-xl border"
                style={{
                  background: mod.color + '0C',
                  borderColor: mod.color + '30',
                }}
              >
                <div className="text-2xl mb-2">{mod.icon}</div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--c-text-2)' }}
                >
                  This module is part of the{' '}
                  <strong style={{ color: 'var(--c-text)' }}>
                    B.Tech Data Science curriculum
                  </strong>{' '}
                  at Mohan Babu University, combining theory with hands-on laboratory
                  experiments using Python and industry-standard tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
