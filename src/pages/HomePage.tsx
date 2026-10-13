import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Plus, Search, X, FlaskConical } from 'lucide-react';
import HeroSection from '../components/HeroSection';

import ExperimentStats from '../components/ExperimentStats';
import ExperimentFormModal from '../components/ExperimentFormModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import type { Experiment, ExperimentFormData } from '../types/experiment';
import type { StudentProfile } from '../types/student';

interface HomePageProps {
  experiments: Experiment[];
  profile: StudentProfile;
  stats: { total: number; subTotal: number; completedPercent: number };
  onAdd: (data: ExperimentFormData) => void;
  onEdit: (id: string, data: ExperimentFormData) => void;
  onDelete: (id: string) => void;
  onEditProfile: () => void;
  onViewIdCard?: () => void;
  searchExperiments: (q: string) => Experiment[];
  addToast: (msg: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
}

export default function HomePage({
  experiments, profile, stats,
  onAdd, onEdit, onDelete, onEditProfile, onViewIdCard,
  searchExperiments, addToast,
}: HomePageProps) {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModal, setEditModal] = useState<{ open: boolean; exp: Experiment | null }>({ open: false, exp: null });
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; exp: Experiment | null }>({ open: false, exp: null });

  // Auto-scroll to experiments library when URL is /experiments or has #experiment-library;
  // or scroll to the start (top) when navigating to '/'
  useEffect(() => {
    if (location.pathname === '/experiments' || location.hash === '#experiment-library') {
      const el = document.getElementById('experiment-library');
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
        return () => clearTimeout(timer);
      }
    } else if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  const filteredExperiments = searchExperiments(search);

  const handleAdd = (data: ExperimentFormData) => {
    onAdd(data);
    setAddModalOpen(false);
    addToast('Experiment created successfully.');
  };

  const handleEdit = (data: ExperimentFormData) => {
    if (editModal.exp) {
      onEdit(editModal.exp.id, data);
      setEditModal({ open: false, exp: null });
      addToast('Experiment updated successfully.');
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.exp) {
      onDelete(deleteModal.exp.id);
      setDeleteModal({ open: false, exp: null });
      addToast('Experiment deleted.');
    }
  };

  return (
    <>
      <HeroSection profile={profile} onEditProfile={onEditProfile} onViewIdCard={onViewIdCard} />

      <main className="container-max pb-16 pt-8">
        <section
          id="experiment-library"
          aria-labelledby="library-heading"
          style={{ scrollMarginTop: '88px' }}
        >
          {/* Header */}
          <div className="section-label mb-2">Experiment Library</div>
          <h2
            id="library-heading"
            className="text-2xl font-bold mb-1 leading-tight"
            style={{ color: 'var(--c-text)' }}
          >
            Practical Data Science Experiments
          </h2>
              <p className="text-sm mb-5" style={{ color: 'var(--c-text-2)' }}>
                Click any experiment number to open its full details.
              </p>

              {/* Stats */}
              <ExperimentStats
                total={stats.total}
                subTotal={stats.subTotal}
                completedPercent={stats.completedPercent}
              />

              {/* Search + Add toolbar */}
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                  marginTop: '0px',
                  marginBottom: '26px',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div style={{ flex: 1, position: 'relative' }}>
                  <Search
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--c-text-3)',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Search experiments..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{
                      width: '100%',
                      height: '46px',
                      paddingLeft: '42px',
                      paddingRight: '38px',
                      fontSize: '14px',
                      borderRadius: '14px',
                      border: '1.5px solid var(--c-border)',
                      outline: 'none',
                      background: 'var(--c-surface)',
                      color: 'var(--c-text)',
                      transition: 'all 200ms ease',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'var(--c-accent)';
                      e.target.style.boxShadow = '0 0 0 3px var(--c-accent-dim)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'var(--c-border)';
                      e.target.style.boxShadow = 'none';
                    }}
                    aria-label="Search experiments"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      style={{
                        position: 'absolute',
                        right: '14px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--c-text-3)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      aria-label="Clear search"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="btn-primary"
                  id="add-experiment-btn"
                  style={{
                    height: '46px',
                    padding: '0 22px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    flexShrink: 0,
                    cursor: 'pointer',
                  }}
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              {/* Number grid / empty state */}
              <div style={{ marginTop: '0px' }} aria-label="Experiments grid">
                {filteredExperiments.length === 0 ? (
                  <EmptyState hasSearch={!!search} onAdd={() => setAddModalOpen(true)} />
                ) : (
                  <>
                    {/* Result label when searching */}
                    {search && (
                      <p className="text-sm mb-4" style={{ color: 'var(--c-text-3)' }}>
                        {filteredExperiments.length} result{filteredExperiments.length !== 1 ? 's' : ''} for &quot;{search}&quot;
                      </p>
                    )}

                    {/* NUMBER GRID — 5 columns on desktop, 10 experiments in 2 neat rows */}
                    <div className="experiment-number-grid">
                      {filteredExperiments.map(exp => (
                        <ExperimentNumberCard
                          key={exp.id}
                          experiment={exp}
                          onEdit={() => setEditModal({ open: true, exp })}
                          onDelete={() => setDeleteModal({ open: true, exp })}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>
      </main>

      {/* Modals */}
      <ExperimentFormModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleAdd}
        onError={msg => addToast(msg, 'error')}
        mode="add"
      />

      <ExperimentFormModal
        isOpen={editModal.open}
        onClose={() => setEditModal({ open: false, exp: null })}
        onSave={handleEdit}
        onError={msg => addToast(msg, 'error')}
        mode="edit"
        initialData={
          editModal.exp
            ? {
                number: editModal.exp.number,
                title: editModal.exp.title,
                description: editModal.exp.description,
                thumbnail: editModal.exp.thumbnail,
                youtubeUrl: editModal.exp.youtubeUrl,
                githubUrl: editModal.exp.githubUrl,
                aim: editModal.exp.aim,
                objective: editModal.exp.objective,
                topics: editModal.exp.topics,
                syntax: editModal.exp.syntax,
                program: editModal.exp.program,
                output: editModal.exp.output,
                experimentA: editModal.exp.experimentA,
                experimentB: editModal.exp.experimentB,
              }
            : undefined
        }
      />

      <DeleteConfirmModal
        isOpen={deleteModal.open}
        experimentTitle={deleteModal.exp?.title ?? ''}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ open: false, exp: null })}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   Experiment Number Card
───────────────────────────────────────────────────────── */
function ExperimentNumberCard({
  experiment,
  onEdit,
  onDelete,
}: {
  experiment: Experiment;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        transition: 'transform 220ms cubic-bezier(0.16,1,0.3,1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Main clickable card */}
      <Link
        to={`/experiment/${experiment.id}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          padding: '22px 14px 18px',
          borderRadius: 16,
          background: hovered
            ? 'linear-gradient(135deg, #0B1F3A 0%, #163B63 100%)'
            : 'var(--c-surface)',
          border: `1.5px solid ${hovered ? '#0EA5A8' : 'var(--c-border)'}`,
          boxShadow: hovered
            ? '0 10px 32px rgba(14,165,168,0.22), 0 2px 8px rgba(0,0,0,0.15)'
            : 'var(--shadow-sm)',
          textDecoration: 'none',
          transition: 'border-color 220ms, box-shadow 220ms, background 220ms',
          cursor: 'pointer',
          minHeight: 148,
          height: '100%',
        }}
        aria-label={`Experiment ${experiment.number}: ${experiment.title}`}
      >
        {/* Number badge */}
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: hovered
              ? 'rgba(14,165,168,0.22)'
              : 'var(--c-accent-dim)',
            border: `2px solid ${hovered ? 'rgba(14,165,168,0.6)' : 'rgba(14,165,168,0.25)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 23,
            fontWeight: 900,
            color: '#0EA5A8',
            lineHeight: 1,
            transition: 'all 220ms',
          }}
        >
          {String(experiment.number).padStart(2, '0')}
        </div>

        {/* Icon */}
        <FlaskConical
          size={15}
          style={{
            color: hovered ? 'rgba(255,255,255,0.7)' : 'var(--c-text-3)',
            transition: 'color 220ms',
          }}
        />

        {/* Title — aligned 2 lines */}
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: 1.35,
            color: hovered ? 'rgba(255,255,255,0.95)' : 'var(--c-text)',
            transition: 'color 220ms',
            paddingInline: 4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: 34,
          }}
        >
          {experiment.title}
        </div>
      </Link>

      {/* Edit / Delete buttons (move seamlessly with the card) */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            display: 'flex',
            gap: 4,
            zIndex: 10,
          }}
        >
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onEdit();
            }}
            title="Edit"
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 11,
              fontWeight: 700,
            }}
          >
            ✎
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              onDelete();
            }}
            title="Delete"
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: 'rgba(220,38,38,0.3)',
              border: '1px solid rgba(220,38,38,0.4)',
              color: '#FCA5A5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Empty State
───────────────────────────────────────────────────────── */
function EmptyState({ hasSearch, onAdd }: { hasSearch: boolean; onAdd: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border"
      style={{ background: 'var(--c-surface)', borderColor: 'var(--c-border)' }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border-2 border-dashed"
        style={{
          background: 'var(--c-accent-dim)',
          borderColor: 'rgba(14,165,168,0.3)',
        }}
      >
        <Database size={24} style={{ color: 'var(--c-accent)', opacity: 0.7 }} />
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--c-text)' }}>
        {hasSearch ? 'No experiments found' : 'No experiments yet'}
      </h3>
      <p className="text-sm mb-5" style={{ color: 'var(--c-text-3)' }}>
        {hasSearch
          ? 'Try a different keyword or clear the search.'
          : 'Your laboratory is empty. Add your first experiment.'}
      </p>
      {!hasSearch && (
        <button onClick={onAdd} className="btn-primary">
          <Plus size={15} />
          Add Experiment
        </button>
      )}
    </div>
  );
}
