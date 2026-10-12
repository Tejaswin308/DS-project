import React, { useState, useRef, useEffect } from 'react';
import { Upload, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import Modal from './Modal';
import type { ExperimentFormData } from '../types/experiment';
import { validateExperimentForm, validateImageFile } from '../utils/validation';

const EMPTY_SUB = {
  title: '',
  description: '',
  aim: '',
  syntax: '',
  program: '',
  output: '',
  youtubeUrl: '',
  githubUrl: '',
};

const EMPTY_FORM: ExperimentFormData = {
  number: 1,
  title: '',
  description: '',
  thumbnail: '',
  youtubeUrl: '',
  githubUrl: '',
  aim: '',
  objective: '',
  topics: [],
  syntax: '',
  program: '',
  output: '',
  experimentA: { ...EMPTY_SUB },
  experimentB: { ...EMPTY_SUB },
};

interface AddExperimentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ExperimentFormData) => void;
  onError: (msg: string) => void;
  initialData?: ExperimentFormData;
  mode?: 'add' | 'edit';
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-[#E2E8F0] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-[#F8FAFC] text-sm font-semibold text-[#102033] hover:bg-[#F1F5F9] transition-colors"
      >
        {title}
        {open ? <ChevronUp size={15} className="text-[#64748B]" /> : <ChevronDown size={15} className="text-[#64748B]" />}
      </button>
      {open && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  helper?: string;
}

function Field({ id, label, required, error, children, helper }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className={`label ${required ? 'label-required' : ''}`}>{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-[#DC2626]">{error}</p>}
      {helper && !error && <p className="mt-1 text-xs text-[#94A3B8]">{helper}</p>}
    </div>
  );
}

export default function ExperimentFormModal({
  isOpen,
  onClose,
  onSave,
  onError,
  initialData,
  mode = 'add',
}: AddExperimentModalProps) {
  const [form, setForm] = useState<ExperimentFormData>(initialData ?? EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [topicInput, setTopicInput] = useState('');
  const [previewThumb, setPreviewThumb] = useState(initialData?.thumbnail ?? '');
  const thumbRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setForm(initialData ?? EMPTY_FORM);
      setPreviewThumb(initialData?.thumbnail ?? '');
      setErrors({});
      setTopicInput('');
    }
  }, [isOpen, initialData]);

  const set = (field: keyof ExperimentFormData, value: unknown) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => { const ne = { ...e }; delete ne[field]; return ne; });
  };

  const setSub = (sub: 'experimentA' | 'experimentB', field: string, value: string) => {
    setForm(f => ({ ...f, [sub]: { ...f[sub], [field]: value } }));
  };

  const handleThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateImageFile(file);
    if (err) { onError(err); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target?.result as string;
      setPreviewThumb(dataUrl);
      set('thumbnail', dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const addTopic = () => {
    const t = topicInput.trim();
    if (!t || form.topics.includes(t)) { setTopicInput(''); return; }
    set('topics', [...form.topics, t]);
    setTopicInput('');
  };

  const removeTopic = (topic: string) => {
    set('topics', form.topics.filter(t => t !== topic));
  };

  const handleSubmit = () => {
    const errs = validateExperimentForm({
      title: form.title,
      description: form.description,
      number: form.number,
      youtubeUrl: form.youtubeUrl,
      githubUrl: form.githubUrl,
    });
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSave(form);
  };

  const title = mode === 'add' ? 'Add New Experiment' : 'Edit Experiment';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="xl">
      <div className="space-y-4">

        {/* Basic Information */}
        <CollapsibleSection title="Basic Information" defaultOpen>
          <div className="grid grid-cols-2 gap-4">
            <Field id="exp-number" label="Experiment Number" required error={errors.number}>
              <input
                id="exp-number"
                type="number"
                min={1}
                className={`input-field ${errors.number ? 'error' : ''}`}
                placeholder="e.g. 1"
                value={form.number}
                onChange={e => set('number', parseInt(e.target.value) || 1)}
              />
            </Field>
            <Field id="exp-title" label="Title" required error={errors.title}>
              <input
                id="exp-title"
                type="text"
                className={`input-field ${errors.title ? 'error' : ''}`}
                placeholder="e.g. Time Series Analysis"
                value={form.title}
                onChange={e => set('title', e.target.value)}
              />
            </Field>
          </div>

          <Field id="exp-desc" label="Description" required error={errors.description}>
            <textarea
              id="exp-desc"
              className={`textarea-field ${errors.description ? 'error' : ''}`}
              placeholder="Brief description of the experiment..."
              rows={3}
              value={form.description}
              onChange={e => set('description', e.target.value)}
            />
          </Field>

          <Field id="exp-aim" label="Aim">
            <textarea
              id="exp-aim"
              className="textarea-field"
              placeholder="Aim of the experiment..."
              rows={2}
              value={form.aim}
              onChange={e => set('aim', e.target.value)}
            />
          </Field>

          <Field id="exp-objective" label="Objective">
            <textarea
              id="exp-objective"
              className="textarea-field"
              placeholder="Learning objectives..."
              rows={2}
              value={form.objective}
              onChange={e => set('objective', e.target.value)}
            />
          </Field>
        </CollapsibleSection>

        {/* Topics */}
        <CollapsibleSection title="Topics" defaultOpen>
          <div>
            <label className="label">Topics / Keywords</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                className="input-field"
                placeholder="Add a topic and press Enter"
                value={topicInput}
                onChange={e => setTopicInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTopic(); } }}
              />
              <button type="button" onClick={addTopic} className="btn-secondary flex-shrink-0">
                <Plus size={15} />
              </button>
            </div>
            {form.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.topics.map(t => (
                  <span key={t} className="topic-tag flex items-center gap-1">
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTopic(t)}
                      className="text-blue-400 hover:text-blue-700 ml-0.5"
                      aria-label={`Remove topic ${t}`}
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* Media */}
        <CollapsibleSection title="Media" defaultOpen={false}>
          <div>
            <label className="label">Thumbnail Image</label>
            <div className="flex items-center gap-4">
              {previewThumb ? (
                <div className="w-24 h-16 rounded-lg overflow-hidden border border-[#E2E8F0] flex-shrink-0">
                  <img src={previewThumb} alt="Thumbnail preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-24 h-16 rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] flex-shrink-0" />
              )}
              <div>
                <input ref={thumbRef} type="file" accept="image/*" onChange={handleThumbChange} className="sr-only" aria-label="Upload thumbnail" />
                <button type="button" onClick={() => thumbRef.current?.click()} className="btn-secondary text-sm">
                  <Upload size={13} />
                  Upload Image
                </button>
              </div>
            </div>
          </div>

          <Field id="exp-youtube" label="YouTube URL" error={errors.youtubeUrl}>
            <input
              id="exp-youtube"
              type="url"
              className={`input-field ${errors.youtubeUrl ? 'error' : ''}`}
              placeholder="https://youtube.com/watch?v=..."
              value={form.youtubeUrl}
              onChange={e => set('youtubeUrl', e.target.value)}
            />
          </Field>

          <Field id="exp-github" label="GitHub URL" error={errors.githubUrl}>
            <input
              id="exp-github"
              type="url"
              className={`input-field ${errors.githubUrl ? 'error' : ''}`}
              placeholder="https://github.com/..."
              value={form.githubUrl}
              onChange={e => set('githubUrl', e.target.value)}
            />
          </Field>
        </CollapsibleSection>

        {/* Main Program */}
        <CollapsibleSection title="Main Program" defaultOpen={false}>
          <Field id="exp-syntax" label="Syntax">
            <textarea
              id="exp-syntax"
              className="textarea-field font-mono text-sm"
              placeholder="Key syntax / commands used..."
              rows={3}
              value={form.syntax}
              onChange={e => set('syntax', e.target.value)}
            />
          </Field>

          <Field id="exp-program" label="Program Code">
            <textarea
              id="exp-program"
              className="textarea-field font-mono text-sm"
              placeholder="import pandas as pd..."
              rows={8}
              value={form.program}
              onChange={e => set('program', e.target.value)}
            />
          </Field>

          <Field id="exp-output" label="Expected Output">
            <textarea
              id="exp-output"
              className="textarea-field font-mono text-sm"
              placeholder="Program output..."
              rows={4}
              value={form.output}
              onChange={e => set('output', e.target.value)}
            />
          </Field>
        </CollapsibleSection>

        {/* Experiment A */}
        <CollapsibleSection title="Experiment A" defaultOpen={false}>
          <SubExpFields prefix="a" sub={form.experimentA} onChange={(f, v) => setSub('experimentA', f, v)} />
        </CollapsibleSection>

        {/* Experiment B */}
        <CollapsibleSection title="Experiment B" defaultOpen={false}>
          <SubExpFields prefix="b" sub={form.experimentB} onChange={(f, v) => setSub('experimentB', f, v)} />
        </CollapsibleSection>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-[#F1F5F9] sticky bottom-0 bg-white pb-1">
          <button onClick={onClose} className="btn-secondary">
            <X size={14} />
            Cancel
          </button>
          <button onClick={handleSubmit} className="btn-primary">
            {mode === 'add' ? <Plus size={14} /> : null}
            {mode === 'add' ? 'Create Experiment' : 'Save Changes'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

function SubExpFields({
  prefix,
  sub,
  onChange,
}: {
  prefix: string;
  sub: ExperimentFormData['experimentA'];
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <Field id={`${prefix}-title`} label="Title">
        <input id={`${prefix}-title`} type="text" className="input-field" placeholder="Sub-experiment title"
          value={sub.title} onChange={e => onChange('title', e.target.value)} />
      </Field>
      <Field id={`${prefix}-desc`} label="Description">
        <textarea id={`${prefix}-desc`} className="textarea-field" rows={2} placeholder="Description..."
          value={sub.description} onChange={e => onChange('description', e.target.value)} />
      </Field>
      <Field id={`${prefix}-aim`} label="Aim">
        <textarea id={`${prefix}-aim`} className="textarea-field" rows={2} placeholder="Aim..."
          value={sub.aim} onChange={e => onChange('aim', e.target.value)} />
      </Field>
      <Field id={`${prefix}-syntax`} label="Syntax">
        <textarea id={`${prefix}-syntax`} className="textarea-field font-mono text-sm" rows={2} placeholder="Syntax..."
          value={sub.syntax} onChange={e => onChange('syntax', e.target.value)} />
      </Field>
      <Field id={`${prefix}-program`} label="Program">
        <textarea id={`${prefix}-program`} className="textarea-field font-mono text-sm" rows={6} placeholder="Code..."
          value={sub.program} onChange={e => onChange('program', e.target.value)} />
      </Field>
      <Field id={`${prefix}-output`} label="Output">
        <textarea id={`${prefix}-output`} className="textarea-field font-mono text-sm" rows={3} placeholder="Output..."
          value={sub.output} onChange={e => onChange('output', e.target.value)} />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field id={`${prefix}-youtube`} label="YouTube URL">
          <input id={`${prefix}-youtube`} type="url" className="input-field" placeholder="YouTube URL..."
            value={sub.youtubeUrl} onChange={e => onChange('youtubeUrl', e.target.value)} />
        </Field>
        <Field id={`${prefix}-github`} label="GitHub URL">
          <input id={`${prefix}-github`} type="url" className="input-field" placeholder="GitHub URL..."
            value={sub.githubUrl} onChange={e => onChange('githubUrl', e.target.value)} />
        </Field>
      </div>
    </div>
  );
}
