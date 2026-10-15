import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Code2, FileText, BarChart3, Terminal } from 'lucide-react';
import type { Experiment } from '../types/experiment';
import VideoPlayer from '../components/VideoPlayer';
import GitHubLink from '../components/GitHubLink';
import CodeBlock from '../components/CodeBlock';
import InteractiveCodeEditor from '../components/InteractiveCodeEditor';

interface SubExperimentPageProps {
  experiments: Experiment[];
}

export default function SubExperimentPage({ experiments }: SubExperimentPageProps) {
  const { id, sub } = useParams<{ id: string; sub: 'a' | 'b' }>();
  const navigate = useNavigate();

  const experiment = experiments.find(e => e.id === id);

  if (!experiment) {
    return (
      <div className="container-max py-20 text-center">
        <div className="text-6xl font-black mb-4" style={{ color: 'var(--c-text-3)' }}>404</div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--c-text)' }}>Experiment Not Found</h2>
        <Link to="/" className="btn-primary inline-flex">
          <ArrowLeft size={16} />
          Back to Experiments
        </Link>
      </div>
    );
  }

  const isA = sub === 'a';
  const subExp = isA ? experiment.experimentA : experiment.experimentB;
  const subLabel = isA ? 'A' : 'B';
  const mainNumber = String(experiment.number).padStart(2, '0');
  const fullLabel = `EXPERIMENT ${mainNumber}${subLabel.toUpperCase()}`;

  return (
    <main className="container-max py-8">
      {/* Breadcrumb back */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button onClick={() => navigate(-1)} className="btn-ghost -ml-2" aria-label="Go back">
          <ArrowLeft size={15} />
          Back
        </button>
        <span style={{ color: 'var(--c-border-2)' }} className="text-sm">/</span>
        <Link
          to={`/experiment/${experiment.id}`}
          className="text-sm transition-colors font-medium"
          style={{ color: 'var(--c-text-2)' }}
        >
          {experiment.title}
        </Link>
        <span style={{ color: 'var(--c-border-2)' }} className="text-sm">/</span>
        <span className="text-sm font-semibold" style={{ color: 'var(--c-accent)' }}>
          Experiment {mainNumber}{subLabel.toUpperCase()}
        </span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="section-label mb-2">{fullLabel}</div>
        <h1
          className="text-3xl md:text-4xl font-black leading-tight mb-3"
          style={{ color: 'var(--c-text)' }}
        >
          {subExp.title || `Sub-Experiment ${subLabel.toUpperCase()}`}
        </h1>
        {subExp.description && (
          <p
            className="text-base leading-relaxed max-w-3xl"
            style={{ color: 'var(--c-text-2)' }}
          >
            {subExp.description}
          </p>
        )}
      </div>

      {/* Video + About */}
      {(subExp.youtubeUrl || subExp.githubUrl) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
          <div className="flex flex-col">
            <div className="section-label mb-3">Video / Demonstration</div>
            <div className="flex-1 flex flex-col">
              <VideoPlayer
                youtubeUrl={subExp.youtubeUrl}
                thumbnail={experiment.thumbnail}
                title={subExp.title || experiment.title}
              />
            </div>
          </div>

          {subExp.githubUrl && (
            <div className="flex flex-col">
              <div className="section-label mb-3">Resources</div>
              <div
                className="rounded-2xl p-6 border flex-1"
                style={{
                  background: 'var(--c-surface)',
                  borderColor: 'var(--c-border)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <GitHubLink url={subExp.githubUrl} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Program content */}
      <div
        className="rounded-2xl p-6 border space-y-6"
        style={{
          background: 'var(--c-surface)',
          borderColor: 'var(--c-border)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {subExp.aim && (
          <div>
            <SectionHeading icon={<Target size={16} />} title="Aim" />
            <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text-2)' }}>{subExp.aim}</p>
          </div>
        )}

        {subExp.syntax && (
          <div>
            <SectionHeading icon={<Code2 size={16} />} title="Syntax" />
            <CodeBlock code={subExp.syntax} language="Python" />
          </div>
        )}

        {subExp.program ? (
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <SectionHeading icon={<Terminal size={16} />} title="Interactive Code Editor & Runner" />
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                style={{
                  background: 'var(--c-accent-dim)',
                  color: 'var(--c-accent)',
                  borderColor: 'var(--c-border)',
                }}
              >
                ● Editable &amp; Executable
              </span>
            </div>
            <InteractiveCodeEditor
              initialCode={subExp.program}
              defaultOutput={subExp.output}
              title={subExp.title || experiment.title}
            />
          </div>
        ) : subExp.output ? (
          <div>
            <SectionHeading icon={<BarChart3 size={16} />} title="Output" />
            <CodeBlock code={subExp.output} language="Output" />
          </div>
        ) : null}
      </div>

      {/* Navigation between A and B */}
      <div className="mt-8 flex gap-3 flex-wrap">
        {isA ? (
          <Link
            to={`/experiment/${experiment.id}/b`}
            className="btn-outline"
          >
            Next: Experiment {mainNumber}B
            <ArrowLeft size={13} className="rotate-180" />
          </Link>
        ) : (
          <Link
            to={`/experiment/${experiment.id}/a`}
            className="btn-outline"
          >
            <ArrowLeft size={13} />
            Previous: Experiment {mainNumber}A
          </Link>
        )}
        <Link to={`/experiment/${experiment.id}`} className="btn-ghost">
          View Full Experiment
        </Link>
      </div>
    </main>
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
