import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, ArrowRight, Code2 } from 'lucide-react';
import type { Experiment } from '../types/experiment';
import ExperimentMenu from './ExperimentMenu';

interface ExperimentCardProps {
  experiment: Experiment;
  onEdit: (exp: Experiment) => void;
  onDelete: (exp: Experiment) => void;
}

export default function ExperimentCard({ experiment, onEdit, onDelete }: ExperimentCardProps) {
  const numberLabel = `EXPERIMENT ${String(experiment.number).padStart(2, '0')}`;

  return (
    <article
      className="group overflow-hidden rounded-2xl border transition-all"
      style={{
        background: 'var(--c-surface)',
        borderColor: 'var(--c-border)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all 220ms cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-border-2)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-sm)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--c-border)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Left accent bar */}
      <div
        className="flex flex-col md:flex-row"
        style={{ minHeight: 0 }}
      >
        {/* Thumbnail */}
        <div className="md:w-[280px] lg:w-[300px] flex-shrink-0">
          <div className="h-48 md:h-full min-h-[200px] overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
            <ThumbnailImage src={experiment.thumbnail} alt={experiment.title} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between min-w-0">
          <div>
            {/* Top row */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="section-label">{numberLabel}</div>
              <ExperimentMenu
                onEdit={() => onEdit(experiment)}
                onDelete={() => onDelete(experiment)}
              />
            </div>

            <h2
              className="text-xl font-bold mb-2 leading-snug"
              style={{ color: 'var(--c-text)' }}
            >
              {experiment.title}
            </h2>

            <p
              className="text-sm leading-relaxed mb-4 line-clamp-2"
              style={{ color: 'var(--c-text-2)' }}
            >
              {experiment.description}
            </p>

            {/* Topics */}
            {experiment.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {experiment.topics.slice(0, 5).map(topic => (
                  <span key={topic} className="topic-tag">{topic}</span>
                ))}
                {experiment.topics.length > 5 && (
                  <span className="topic-tag">+{experiment.topics.length - 5}</span>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          <div
            className="flex flex-wrap items-center gap-2 pt-3 border-t"
            style={{ borderColor: 'var(--c-border)' }}
          >
            <Link
              to={`/experiment/${experiment.id}`}
              className="btn-primary py-2 px-4 text-xs"
              aria-label={`Open ${experiment.title}`}
            >
              <ArrowRight size={13} />
              Open Experiment
            </Link>

            <Link
              to={`/experiment/${experiment.id}/a`}
              className="btn-outline py-2 px-3 text-xs"
              aria-label={`Experiment A – ${experiment.title}`}
            >
              Exp A
            </Link>

            <Link
              to={`/experiment/${experiment.id}/b`}
              className="btn-outline py-2 px-3 text-xs"
              aria-label={`Experiment B – ${experiment.title}`}
            >
              Exp B
            </Link>

            {experiment.githubUrl && (
              <a
                href={experiment.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost py-2 px-3 text-xs ml-auto"
                aria-label={`GitHub – ${experiment.title}`}
              >
                <Code2 size={13} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ThumbnailImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = React.useState(false);

  if (!src || error) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-3"
        style={{
          background: 'linear-gradient(135deg, var(--c-primary) 0%, #163B63 60%, rgba(14,165,168,0.15) 100%)',
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <BarChart3 size={24} style={{ color: '#0EA5A8' }} />
        </div>
        <span
          className="text-xs font-medium text-center px-3"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Data Science Laboratory
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      onError={() => setError(true)}
    />
  );
}
