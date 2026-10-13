import React from 'react';
import { Code2, ArrowRight, BarChart3 } from 'lucide-react';
import type { StudentProfile } from '../types/student';
import StudentProfileCard from './StudentProfileCard';

interface HeroSectionProps {
  profile: StudentProfile;
  onEditProfile: () => void;
  onViewIdCard?: () => void;
}

export default function HeroSection({ profile, onEditProfile, onViewIdCard }: HeroSectionProps) {

  const scrollToExperiments = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('experiment-library');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      aria-labelledby="hero-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '56px 0 48px',
        background: 'var(--c-bg)',
      }}
    >
      {/* Background blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14,165,168,0.06) 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: -80, right: -80, width: 360, height: 360,
          borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(14,165,168,0.10) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: -60, left: -60, width: 280, height: 280,
          borderRadius: '50%', pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="container-max" style={{ position: 'relative' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) 390px',
            gap: 48,
            alignItems: 'start',
          }}
          className="hero-grid"
        >

          {/* LEFT – Text content */}
          <div style={{ minWidth: 0 }}>
            <div className="section-label" style={{ marginBottom: 14 }}>
              Data Science Laboratory · MBU
            </div>

            <h1
              id="hero-heading"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 46px)',
                fontWeight: 900,
                lineHeight: 1.15,
                color: 'var(--c-text)',
                marginBottom: 18,
              }}
            >
              Experiments,{' '}
              <span className="gradient-text">Analysis</span>
              <br />
              &amp; Learning
            </h1>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--c-text-2)',
                maxWidth: 440,
                marginBottom: 28,
              }}
            >
              Explore practical Data Science experiments designed for hands-on
              analytical learning, programming practice and research at
              Mohan Babu University.
            </p>

            {/* Action buttons — always in a row, same height */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <button
                onClick={scrollToExperiments}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px',
                  background: 'var(--c-accent)', color: '#fff',
                  fontSize: 14, fontWeight: 600, lineHeight: 1,
                  borderRadius: 12, border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(14,165,168,0.35)',
                  whiteSpace: 'nowrap',
                  transition: 'all 150ms',
                }}
              >
                <BarChart3 size={16} />
                Explore Experiments
              </button>

              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 24px',
                    background: 'var(--c-surface)', color: 'var(--c-text)',
                    fontSize: 14, fontWeight: 500, lineHeight: 1,
                    borderRadius: 12, border: '1.5px solid var(--c-border)',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    transition: 'all 150ms',
                  }}
                >
                  <Code2 size={16} />
                  View Repository
                  <ArrowRight size={14} />
                </a>
              )}
            </div>

            {/* Quick stats */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 36 }}>
              <QuickStat number="06" label="Modules" />
              <div style={{ width: 1, height: 32, background: 'var(--c-border)', flexShrink: 0 }} />
              <QuickStat number="10" label="Experiments" />
              <div style={{ width: 1, height: 32, background: 'var(--c-border)', flexShrink: 0 }} />
              <QuickStat number="100%" label="Practical" />
            </div>
          </div>

          {/* RIGHT – Student Profile Card (Enlarged) */}
          <div
            className="float-anim hero-card-col"
            style={{ width: 390, flexShrink: 0 }}
          >
            <StudentProfileCard profile={profile} onEdit={onEditProfile} onViewIdCard={onViewIdCard} />
          </div>

        </div>
      </div>

      {/* Responsive style — stack gracefully on smaller screens without hiding the card */}
      <style>{`
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .hero-card-col {
            width: 100% !important;
            max-width: 410px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
}

function QuickStat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1, color: 'var(--c-accent)' }}>
        {number}
      </div>
      <div style={{ fontSize: 12, fontWeight: 500, marginTop: 4, color: 'var(--c-text-3)' }}>
        {label}
      </div>
    </div>
  );
}
