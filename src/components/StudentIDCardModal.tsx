import React, { useState } from 'react';
import { X, Printer, Edit2, RotateCw, CheckCircle2, ShieldCheck, Sparkles, User } from 'lucide-react';
import type { StudentProfile } from '../types/student';

interface StudentIDCardModalProps {
  isOpen: boolean;
  profile: StudentProfile;
  onClose: () => void;
  onEdit: () => void;
}

export default function StudentIDCardModal({
  isOpen,
  profile,
  onClose,
  onEdit,
}: StudentIDCardModalProps) {
  const [side, setSide] = useState<'front' | 'back'>('front');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{
        backgroundColor: 'rgba(5, 10, 20, 0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="id-card-title"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal-enter relative w-full max-w-lg rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: 'var(--c-surface)',
          border: '1px solid var(--c-border)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(14, 165, 168, 0.2)',
        }}
      >
        {/* Modal Top Bar */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: 'var(--c-border)', background: 'var(--c-surface-alt)' }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--c-accent-dim)', color: 'var(--c-accent)' }}
            >
              <Sparkles size={16} />
            </div>
            <div>
              <h2 id="id-card-title" className="text-base font-bold leading-none" style={{ color: 'var(--c-text)' }}>
                Student Identity Card
              </h2>
              <p className="text-xs mt-1 leading-none" style={{ color: 'var(--c-text-3)' }}>
                Mohan Babu University · Digital Credential
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSide(s => (s === 'front' ? 'back' : 'front'))}
              className="btn-secondary text-xs px-2.5 py-1.5 flex items-center gap-1.5"
              title="Flip Card"
            >
              <RotateCw size={13} />
              <span>{side === 'front' ? 'Flip to Back' : 'Flip to Front'}</span>
            </button>
            <button
              onClick={onClose}
              className="btn-ghost p-1.5 rounded-lg"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body / ID Card Container */}
        <div className="p-6 flex flex-col items-center justify-center overflow-x-hidden">
          {/* Printable ID Card Container */}
          <div id="printable-id-card" className="w-full max-w-[380px]">
            {side === 'front' ? (
              /* FRONT OF ID CARD */
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(160deg, #0A192F 0%, #0F2A4A 45%, #0B1E38 100%)',
                  border: '2px solid rgba(14, 165, 168, 0.35)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Lanyard Hole Clip Graphic */}
                <div className="w-full flex justify-center pt-2.5 pb-1">
                  <div
                    className="w-16 h-2 rounded-full"
                    style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                  />
                </div>

                {/* University Header */}
                <div
                  className="px-5 py-3 text-center border-b"
                  style={{
                    background: 'linear-gradient(180deg, rgba(165, 28, 48, 0.95) 0%, rgba(130, 20, 38, 0.95) 100%)',
                    borderColor: 'rgba(234, 179, 8, 0.4)',
                  }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <img
                      src="/mbu-logo.png"
                      alt="MBU Logo"
                      className="h-10 w-auto object-contain bg-white rounded-md p-0.5"
                    />
                    <div className="text-left">
                      <div className="text-sm font-black tracking-wide text-white leading-tight uppercase">
                        Mohan Babu University
                      </div>
                      <div className="text-[10px] text-yellow-200 font-medium tracking-tight leading-tight">
                        Sree Sainath Nagar, Tirupati - 517102
                      </div>
                    </div>
                  </div>
                </div>

                {/* Identity Card Banner */}
                <div
                  className="py-1 px-4 text-center flex items-center justify-between"
                  style={{ background: 'linear-gradient(90deg, #0EA5A8, #0284C7)', color: '#ffffff' }}
                >
                  <span className="text-[10.5px] font-extrabold tracking-widest uppercase">
                    Student Identity Card
                  </span>
                  <span className="text-[9.5px] font-bold tracking-wider opacity-90">
                    2024 - 2028
                  </span>
                </div>

                {/* Main ID Card Content */}
                <div className="p-5">
                  <div className="flex gap-4 items-center mb-4">
                    {/* Student Photo */}
                    <div
                      className="w-24 h-28 rounded-xl overflow-hidden flex-shrink-0 relative border-2"
                      style={{
                        borderColor: '#0EA5A8',
                        background: 'rgba(255, 255, 255, 0.05)',
                        boxShadow: '0 4px 14px rgba(14, 165, 168, 0.25)',
                      }}
                    >
                      {profile.photo ? (
                        <img
                          src={profile.photo}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                          <User size={38} className="opacity-60 mb-1" />
                          <span className="text-[9px] font-semibold uppercase tracking-wider opacity-70">
                            Photo
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Basic Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-base font-black text-white truncate leading-tight">
                        {profile.name || 'Student Name'}
                      </div>
                      <div
                        className="inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-extrabold tracking-wider"
                        style={{
                          background: 'rgba(14, 165, 168, 0.2)',
                          color: '#0DD9DC',
                          border: '1px solid rgba(14, 165, 168, 0.4)',
                        }}
                      >
                        {profile.rollNo || '24102A030079'}
                      </div>
                      <div className="text-xs text-slate-300 mt-2 font-medium leading-snug">
                        <span className="text-slate-400 text-[11px]">Degree: </span>
                        B.Tech (Data Science)
                      </div>
                      <div className="text-xs text-slate-300 font-medium leading-snug">
                        <span className="text-slate-400 text-[11px]">Dept: </span>
                        {profile.branch || 'Data Science'}
                      </div>
                    </div>
                  </div>

                  {/* Secondary Details Grid */}
                  <div
                    className="rounded-xl p-3 grid grid-cols-2 gap-2 text-xs"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Section</div>
                      <div className="font-bold text-white">Section {profile.section || '2'}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Course / Lab</div>
                      <div className="font-bold text-white truncate">{profile.subject || 'Data Science'}</div>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-700/50">
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Faculty Guide</div>
                      <div className="font-bold text-white flex items-center justify-between">
                        <span>{profile.assistantProfessor || 'S.BOSUBABU SIR'}</span>
                        <span className="text-[9.5px] text-[#0EA5A8] font-extrabold uppercase">
                          Asst. Professor
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Barcode & Security Badge */}
                  <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between">
                    <div className="flex flex-col">
                      {/* Stylized Barcode SVG */}
                      <svg width="140" height="26" viewBox="0 0 140 26" className="opacity-90">
                        <rect x="0" y="0" width="3" height="26" fill="#ffffff" />
                        <rect x="5" y="0" width="1.5" height="26" fill="#ffffff" />
                        <rect x="8" y="0" width="4" height="26" fill="#ffffff" />
                        <rect x="14" y="0" width="2" height="26" fill="#ffffff" />
                        <rect x="18" y="0" width="5" height="26" fill="#ffffff" />
                        <rect x="25" y="0" width="1.5" height="26" fill="#ffffff" />
                        <rect x="28" y="0" width="3" height="26" fill="#ffffff" />
                        <rect x="33" y="0" width="2" height="26" fill="#ffffff" />
                        <rect x="37" y="0" width="4.5" height="26" fill="#ffffff" />
                        <rect x="44" y="0" width="1.5" height="26" fill="#ffffff" />
                        <rect x="48" y="0" width="3" height="26" fill="#ffffff" />
                        <rect x="53" y="0" width="2" height="26" fill="#ffffff" />
                        <rect x="57" y="0" width="4" height="26" fill="#ffffff" />
                        <rect x="63" y="0" width="2" height="26" fill="#ffffff" />
                        <rect x="67" y="0" width="5" height="26" fill="#ffffff" />
                        <rect x="74" y="0" width="1.5" height="26" fill="#ffffff" />
                        <rect x="78" y="0" width="3.5" height="26" fill="#ffffff" />
                        <rect x="84" y="0" width="2" height="26" fill="#ffffff" />
                        <rect x="88" y="0" width="4" height="26" fill="#ffffff" />
                        <rect x="94" y="0" width="1.5" height="26" fill="#ffffff" />
                        <rect x="98" y="0" width="3" height="26" fill="#ffffff" />
                        <rect x="103" y="0" width="5" height="26" fill="#ffffff" />
                        <rect x="110" y="0" width="2" height="26" fill="#ffffff" />
                        <rect x="114" y="0" width="4" height="26" fill="#ffffff" />
                        <rect x="120" y="0" width="2" height="26" fill="#ffffff" />
                        <rect x="124" y="0" width="3" height="26" fill="#ffffff" />
                        <rect x="129" y="0" width="2" height="26" fill="#ffffff" />
                        <rect x="133" y="0" width="4" height="26" fill="#ffffff" />
                      </svg>
                      <span className="text-[9px] text-slate-400 font-mono tracking-widest mt-0.5">
                        {profile.rollNo || '24102A030079'}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="w-16 h-7 flex items-center justify-center ml-auto">
                        <span className="font-serif italic text-xs text-slate-300 border-b border-slate-500 pb-0.5">
                          Registrar
                        </span>
                      </div>
                      <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                        Authorized Sign
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom decorative micro-bar */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: 'linear-gradient(90deg, #A51C30, #EAB308, #0EA5A8, #0284C7)',
                  }}
                />
              </div>
            ) : (
              /* BACK OF ID CARD */
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(160deg, #0A192F 0%, #0F2A4A 45%, #0B1E38 100%)',
                  border: '2px solid rgba(14, 165, 168, 0.35)',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Lanyard Hole Clip Graphic */}
                <div className="w-full flex justify-center pt-2.5 pb-1">
                  <div
                    className="w-16 h-2 rounded-full"
                    style={{ background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.25)' }}
                  />
                </div>

                <div
                  className="py-2.5 px-4 text-center border-b"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="text-xs font-bold text-white tracking-wider uppercase">
                    Instructions &amp; Regulations
                  </div>
                </div>

                <div className="p-5 space-y-3.5 text-xs text-slate-300 leading-relaxed">
                  <div className="flex gap-2.5 items-start">
                    <ShieldCheck size={16} className="text-[#0EA5A8] flex-shrink-0 mt-0.5" />
                    <p className="text-[11.5px]">
                      This card is non-transferable and remains the property of Mohan Babu University.
                    </p>
                  </div>

                  <div className="flex gap-2.5 items-start">
                    <CheckCircle2 size={16} className="text-[#0EA5A8] flex-shrink-0 mt-0.5" />
                    <p className="text-[11.5px]">
                      Must be worn visibly while inside university campus, labs, and examination halls.
                    </p>
                  </div>

                  {/* Student Portfolio & Links */}
                  <div
                    className="rounded-xl p-3 mt-3 space-y-1.5"
                    style={{
                      background: 'rgba(14, 165, 168, 0.08)',
                      border: '1px solid rgba(14, 165, 168, 0.25)',
                    }}
                  >
                    <div className="text-[10px] uppercase font-bold text-[#0EA5A8] tracking-wider flex items-center justify-between">
                      <span>Student Portfolio &amp; Links</span>
                      <span className="text-[9px] text-slate-400 font-mono">{profile.rollNo || '24102A030079'}</span>
                    </div>
                    {profile.website && (
                      <div className="text-[11px] text-slate-300 truncate">
                        <span className="text-slate-400">Portfolio: </span>
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0DD9DC] hover:underline font-medium"
                        >
                          {profile.website.replace('https://', '')}
                        </a>
                      </div>
                    )}
                    {profile.linkedin && (
                      <div className="text-[11px] text-slate-300 truncate">
                        <span className="text-slate-400">LinkedIn: </span>
                        <a
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0DD9DC] hover:underline font-medium"
                        >
                          linkedin.com/in/tejaswini-reddy
                        </a>
                      </div>
                    )}
                  </div>

                  {/* University Address & Contact */}
                  <div
                    className="rounded-xl p-3 mt-2.5 space-y-1"
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wider">
                      Campus Office
                    </div>
                    <div className="text-[10.5px] text-slate-200 font-medium">
                      Mohan Babu University Campus, Sree Sainath Nagar, Tirupati, AP - 517102
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Email: <span className="text-white font-semibold">info@mbu.asia</span> · Website: <span className="text-white font-semibold">mbu.asia</span>
                    </div>
                  </div>

                  {/* QR Code Simulation */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="text-[10.5px] text-slate-400">
                      Card Status: <span className="text-emerald-400 font-bold">ACTIVE</span>
                      <br />
                      Valid through: <span className="text-white font-medium">May 2028</span>
                    </div>
                    <a
                      href={profile.website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 bg-white rounded-lg p-1 flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform"
                      title="Click / Scan to open Portfolio"
                    >
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="#000000">
                        <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 2h4v4h-4v-4zm-4-4h4v2h-4v-2zm2 4h-2v4h2v-4zm2-2h2v2h-2v-2zm-6-2h2v2h-2v-2z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Bottom decorative bar */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: 'linear-gradient(90deg, #A51C30, #EAB308, #0EA5A8, #0284C7)',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div
          className="flex items-center justify-between px-6 py-4 border-t"
          style={{ borderColor: 'var(--c-border)', background: 'var(--c-surface-alt)' }}
        >
          <button
            onClick={() => {
              onClose();
              onEdit();
            }}
            className="btn-secondary text-sm flex items-center gap-2"
          >
            <Edit2 size={14} />
            Edit Card Details
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="btn-primary text-sm flex items-center gap-2"
              title="Print or Save as PDF"
            >
              <Printer size={15} />
              Print / Save PDF
            </button>
          </div>
        </div>
      </div>

      {/* Print Specific CSS */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-id-card, #printable-id-card * {
            visibility: visible !important;
          }
          #printable-id-card {
            position: fixed !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 350px !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
