import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Target, Tag, Code2, FileText, BarChart3 } from 'lucide-react';
import type { Experiment } from '../types/experiment';
import VideoPlayer from '../components/VideoPlayer';
import GitHubLink from '../components/GitHubLink';
import CodeBlock from '../components/CodeBlock';

interface ExperimentDetailsPageProps {
  experiments: Experiment[];
}

export default function ExperimentDetailsPage({ experiments }: ExperimentDetailsPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const experiment = experiments.find(e => e.id === id);

  if (!experiment) {
    return (
      <div className="container-max py-20 text-center">
        <div className="text-6xl font-black mb-4" style={{ color: 'var(--c-text-3)' }}>404</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--c-text)' }}>Experiment Not Found</h2>
        <p className="mb-6" style={{ color: 'var(--c-text-2)' }}>The experiment you are looking for doesn't exist or was deleted.</p>
        <Link to="/" className="btn-primary inline-flex">
          <ArrowLeft size={16} />
          Back to Experiments
        </Link>
      </div>
    );
  }

  const numberLabel = `EXPERIMENT ${String(experiment.number).padStart(2, '0')}`;

  return (
    <main className="container-max py-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="btn-ghost mb-6 -ml-2"
        aria-label="Go back"
      >
        <ArrowLeft size={15} />
        Back to Experiments
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="section-label mb-2">{numberLabel}</div>
        <h1
          className="text-3xl md:text-4xl font-black leading-tight mb-3 uppercase tracking-tight"
          style={{ color: 'var(--c-text)' }}
        >
          {experiment.title}
        </h1>
        <p
          className="text-base leading-relaxed max-w-3xl"
          style={{ color: 'var(--c-text-2)' }}
        >
          {experiment.description}
        </p>
      </div>

      {/* Main two-column section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10 items-stretch">
        {/* Video */}
        <div className="flex flex-col">
          <div className="section-label mb-3">Video / Demonstration</div>
          <div className="flex-1 flex flex-col">
            <VideoPlayer
              youtubeUrl={experiment.youtubeUrl}
              thumbnail={experiment.thumbnail}
              title={experiment.title}
            />
          </div>
        </div>

        {/* About */}
        <div className="flex flex-col">
          <div className="section-label mb-3">About This Experiment</div>
          <div
            className="rounded-2xl p-6 border flex-1 space-y-5"
            style={{
              background: 'var(--c-surface)',
              borderColor: 'var(--c-border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {experiment.aim && (
              <InfoSection icon={<Target size={16} style={{ color: 'var(--c-accent)' }} />} title="Aim">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{experiment.aim}</p>
              </InfoSection>
            )}

            {experiment.objective && (
              <InfoSection icon={<BookOpen size={16} style={{ color: 'var(--c-accent)' }} />} title="Objective">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{experiment.objective}</p>
              </InfoSection>
            )}

            {experiment.topics.length > 0 && (
              <InfoSection icon={<Tag size={16} style={{ color: 'var(--c-accent)' }} />} title="Topics">
                <div className="flex flex-wrap gap-1.5">
                  {experiment.topics.map(t => (
                    <span key={t} className="topic-tag">{t}</span>
                  ))}
                </div>
              </InfoSection>
            )}

            {experiment.githubUrl && (
              <InfoSection icon={<BarChart3 size={16} style={{ color: 'var(--c-accent)' }} />} title="GitHub Repository">
                <GitHubLink url={experiment.githubUrl} />
              </InfoSection>
            )}
          </div>
        </div>
      </div>

      {/* Sub-experiments */}
      <section aria-labelledby="sub-exp-heading" className="mb-10">
        <div className="section-label mb-2">Sub-Experiments</div>
        <h2
          id="sub-exp-heading"
          className="text-xl font-bold mb-4"
          style={{ color: 'var(--c-text)' }}
        >
          Practical Sessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SubExperimentCard
            label={`${numberLabel}A`}
            title={experiment.experimentA.title || 'Experiment A'}
            description={experiment.experimentA.description || 'Sub-experiment A'}
            href={`/experiment/${experiment.id}/a`}
          />
          <SubExperimentCard
            label={`${numberLabel}B`}
            title={experiment.experimentB.title || 'Experiment B'}
            description={experiment.experimentB.description || 'Sub-experiment B'}
            href={`/experiment/${experiment.id}/b`}
          />
        </div>
      </section>

      {/* Main To Do & Program */}
      {(experiment.aim || experiment.syntax || experiment.program) && (
        <section aria-labelledby="program-heading" className="mb-8">
          <div className="section-label mb-2">Main To Do &amp; Program</div>
          <h2
            id="program-heading"
            className="text-xl font-bold mb-4"
            style={{ color: 'var(--c-text)' }}
          >
            Implementation Details
          </h2>
          <div
            className="rounded-2xl p-6 border space-y-6"
            style={{
              background: 'var(--c-surface)',
              borderColor: 'var(--c-border)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {experiment.aim && (
              <div>
                <SectionHeading icon={<Target size={16} />} title="Aim" />
                <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{experiment.aim}</p>
              </div>
            )}

            {experiment.syntax && (
              <div>
                <SectionHeading icon={<Code2 size={16} />} title="Syntax" />
                <CodeBlock code={experiment.syntax} language="Python" />
              </div>
            )}

            {experiment.program && (
              <div>
                <SectionHeading icon={<FileText size={16} />} title="Program" />
                <CodeBlock code={experiment.program} language="Python" />
              </div>
            )}

            {experiment.output && (
              <div>
                <SectionHeading icon={<BarChart3 size={16} />} title="Output" />
                <CodeBlock code={experiment.output} language="Output" />
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

function InfoSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span
          className="text-xs font-bold uppercase tracking-wider"
          style={{ color: 'var(--c-text)' }}
        >
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div style={{ color: 'var(--c-accent)' }}>{icon}</div>
      <h3
        className="text-sm font-bold uppercase tracking-wider"
        style={{ color: 'var(--c-text)' }}
      >
        {title}
      </h3>
    </div>
  );
}

function SubExperimentCard({ label, title, description, href }: {
  label: string; title: string; description: string; href: string;
}) {
  return (
    <Link to={href} className="card p-5 block group" aria-label={`Open ${label} – ${title}`}>
      <div className="section-label mb-2">{label}</div>
      <h3
        className="font-bold text-base mb-1.5 group-hover:text-[#0EA5A8] transition-colors"
        style={{ color: 'var(--c-text)' }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed line-clamp-2 mb-4"
        style={{ color: 'var(--c-text-2)' }}
      >
        {description}
      </p>
      <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: 'var(--c-accent)' }}>
        Open
        <ArrowLeft size={13} className="rotate-180" />
      </div>
    </Link>
  );
}
