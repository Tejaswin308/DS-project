import React, { useState } from 'react';
import { Edit2, CreditCard, Globe, Code2, MoreHorizontal, User } from 'lucide-react';
import type { StudentProfile } from '../types/student';

interface StudentProfileCardProps {
  profile: StudentProfile;
  onEdit: () => void;
  onViewIdCard?: () => void;
}

export default function StudentProfileCard({ profile, onEdit, onViewIdCard }: StudentProfileCardProps) {
  const [showMore, setShowMore] = useState(false);

  const socialLinks = [
    { key: 'website', icon: <Globe size={16} />, url: profile.website, label: 'Website' },
    { key: 'linkedin', icon: <LinkedInIcon />, url: profile.linkedin, label: 'LinkedIn' },
    { key: 'github', icon: <GithubIcon />, url: profile.github, label: 'GitHub' },
    { key: 'leetcode', icon: <LeetCodeIcon />, url: profile.leetcode, label: 'LeetCode' },
    { key: 'instagram', icon: <InstagramIcon />, url: profile.instagram, label: 'Instagram' },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(145deg, #0D1B2E 0%, #122040 60%, #0F2444 100%)',
        border: '1px solid rgba(14,165,168,0.2)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Decorative dots */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(14,165,168,0.08) 1px, transparent 0)',
          backgroundSize: '18px 18px', pointerEvents: 'none',
        }}
      />
      {/* Glowing circle top-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: -30, right: -30, width: 100, height: 100,
          borderRadius: '50%', background: 'rgba(99,102,241,0.15)',
          filter: 'blur(30px)', pointerEvents: 'none',
        }}
      />

      <div className="relative p-6">
        {/* Header row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span
              className="w-2.5 h-2.5 rounded-full pulse-dot"
              style={{ background: '#0EA5A8' }}
            />
            <span
              style={{
                fontSize: 12, fontWeight: 800, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: '#0EA5A8',
              }}
            >
              Student Details
            </span>
          </div>
          <span
            style={{
              fontSize: 12, fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '4px 12px', borderRadius: 100,
            }}
          >
            B.Tech (DS)
          </span>
        </div>

        {/* Profile row */}
        <div className="flex gap-4 items-start">
          {/* Photo */}
          <div
            style={{
              width: 82, height: 82, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
              border: '3px solid rgba(14,165,168,0.55)',
              background: 'rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 5px rgba(14,165,168,0.12)',
            }}
          >
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={34} color="rgba(255,255,255,0.35)" />
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-1.5 pt-0.5">
            <DetailRow label="Name:" value={profile.name || '—'} highlight />
            <DetailRow label="Roll No:" value={profile.rollNo || '—'} accent />
            <DetailRow label="Dept:" value={profile.branch || 'Data Science'} />
            <DetailRow label="Section:" value={profile.section || '—'} />
            <DetailRow label="Subject:" value={profile.subject || 'Data Science'} highlight />
            <div>
              <DetailRow label="Faculty:" value={profile.assistantProfessor || '—'} />
              <div style={{ paddingLeft: 74, marginTop: 1 }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.1em', color: '#0EA5A8', textTransform: 'uppercase' }}>
                  Assistant Professor
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex flex-wrap items-center gap-2.5 mt-5">
          {socialLinks.map(link => (
            link.url ? (
              <a
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.65)',
                  transition: 'all 200ms',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(14,165,168,0.2)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(14,165,168,0.5)';
                  (e.currentTarget as HTMLElement).style.color = '#0EA5A8';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)';
                }}
              >
                {link.icon}
              </a>
            ) : null
          ))}

          {/* More button */}
          <button
            onClick={() => setShowMore(v => !v)}
            title="More links"
            style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'rgba(255,255,255,0.65)', cursor: 'pointer',
            }}
          >
            <MoreHorizontal size={17} />
          </button>
        </div>

        {/* Action buttons — perfectly aligned 2-column equal split */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginTop: 20,
            alignItems: 'center',
          }}
        >
          <button
            onClick={onEdit}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              height: 42,
              padding: '0 16px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.16)',
              color: 'rgba(255,255,255,0.92)',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms ease',
              whiteSpace: 'nowrap',
              width: '100%',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.16)';
            }}
          >
            <Edit2 size={15} />
            Edit
          </button>

          <button
            onClick={onViewIdCard ?? onEdit}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              height: 42,
              padding: '0 16px',
              borderRadius: 12,
              background: 'rgba(14,165,168,0.18)',
              border: '1px solid rgba(14,165,168,0.45)',
              color: '#0DD9DC',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 200ms ease',
              whiteSpace: 'nowrap',
              width: '100%',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(14,165,168,0.28)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(14,165,168,0.65)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(14,165,168,0.25)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(14,165,168,0.18)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(14,165,168,0.45)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <CreditCard size={15} />
            View ID Card
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  highlight,
  accent,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  accent?: boolean;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, minWidth: 0 }}>
      <span style={{ width: 66, flexShrink: 0, fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>
        {label}
      </span>
      <span
        title={value}
        style={{
          fontSize: 14,
          fontWeight: accent ? 700 : highlight ? 600 : 500,
          color: accent ? '#0EA5A8' : highlight ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.80)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          minWidth: 0, flex: 1,
        }}
      >
        {value}
      </span>
    </div>
  );
}

// Custom GitHub SVG icon (no lucide support in v1.52)
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// Custom LeetCode SVG icon
function LeetCodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

// LinkedIn SVG icon
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// Instagram SVG icon
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}
