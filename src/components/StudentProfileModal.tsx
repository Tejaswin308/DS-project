import React, { useState, useRef, useEffect } from 'react';
import { User, Upload, Save, X } from 'lucide-react';
import Modal from './Modal';
import type { StudentProfile } from '../types/student';
import { validateImageFile } from '../utils/validation';

interface StudentProfileModalProps {
  isOpen: boolean;
  profile: StudentProfile;
  onSave: (profile: StudentProfile) => void;
  onClose: () => void;
  onError: (msg: string) => void;
}

export default function StudentProfileModal({
  isOpen, profile, onSave, onClose, onError,
}: StudentProfileModalProps) {
  const [form, setForm] = useState<StudentProfile>(profile);
  const [previewPhoto, setPreviewPhoto] = useState(profile.photo);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setForm({ ...profile });
      setPreviewPhoto(profile.photo);
    }
  }, [isOpen, profile]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateImageFile(file);
    if (err) { onError(err); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      const dataUrl = ev.target?.result as string;
      setPreviewPhoto(dataUrl);
      setForm(f => ({ ...f, photo: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const set = (field: keyof StudentProfile, value: string) =>
    setForm(f => ({ ...f, [field]: value }));

  const handleSave = () => onSave(form);
  const handleClose = () => { setForm(profile); setPreviewPhoto(profile.photo); onClose(); };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Student Profile" size="lg">
      <div className="space-y-5">

        {/* Photo */}
        <div>
          <label className="label">Photo</label>
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 border"
              style={{ background: 'var(--c-surface-alt)', borderColor: 'var(--c-border)' }}
            >
              {previewPhoto ? (
                <img src={previewPhoto} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <User size={28} style={{ color: 'var(--c-text-3)' }} />
              )}
            </div>
            <div>
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange} className="sr-only" aria-label="Upload photo" />
              <button onClick={() => fileInputRef.current?.click()} className="btn-secondary text-sm" type="button">
                <Upload size={14} /> Choose Photo
              </button>
              <p className="text-xs mt-1.5" style={{ color: 'var(--c-text-3)' }}>JPEG, PNG or WebP · Max 5 MB</p>
            </div>
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="profile-name" className="label label-required">Full Name</label>
          <input id="profile-name" type="text" className="input-field" placeholder="Enter your full name"
            value={form.name} onChange={e => set('name', e.target.value)} />
        </div>

        {/* Roll No */}
        <div>
          <label htmlFor="profile-rollno" className="label">Roll No</label>
          <input id="profile-rollno" type="text" className="input-field" placeholder="e.g. 24102A030088"
            value={form.rollNo} onChange={e => set('rollNo', e.target.value)} />
        </div>

        {/* Section & Branch */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="profile-section" className="label">Section</label>
            <input id="profile-section" type="text" className="input-field" placeholder="e.g. 2"
              value={form.section} onChange={e => set('section', e.target.value)} />
          </div>
          <div>
            <label htmlFor="profile-branch" className="label">Department</label>
            <input id="profile-branch" type="text" className="input-field" placeholder="e.g. Data Science"
              value={form.branch} onChange={e => set('branch', e.target.value)} />
          </div>
        </div>

        {/* Subject & Faculty */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="profile-subject" className="label">Subject</label>
            <input id="profile-subject" type="text" className="input-field" placeholder="e.g. Data Science"
              value={form.subject ?? ''} onChange={e => set('subject', e.target.value)} />
          </div>
          <div>
            <label htmlFor="profile-professor" className="label">Faculty / Asst. Professor</label>
            <input id="profile-professor" type="text" className="input-field" placeholder="e.g. S.BOSUBABU SIR"
              value={form.assistantProfessor} onChange={e => set('assistantProfessor', e.target.value)} />
          </div>
        </div>

        {/* Social links */}
        <div>
          <div className="label mb-3">Social Links</div>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label htmlFor="profile-github" className="label">GitHub</label>
              <input id="profile-github" type="url" className="input-field" placeholder="https://github.com/username"
                value={form.github ?? ''} onChange={e => set('github', e.target.value)} />
            </div>
            <div>
              <label htmlFor="profile-leetcode" className="label">LeetCode</label>
              <input id="profile-leetcode" type="url" className="input-field" placeholder="https://leetcode.com/u/username"
                value={form.leetcode ?? ''} onChange={e => set('leetcode', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="profile-linkedin" className="label">LinkedIn</label>
                <input id="profile-linkedin" type="url" className="input-field" placeholder="https://linkedin.com/in/..."
                  value={form.linkedin ?? ''} onChange={e => set('linkedin', e.target.value)} />
              </div>
              <div>
                <label htmlFor="profile-instagram" className="label">Instagram</label>
                <input id="profile-instagram" type="url" className="input-field" placeholder="https://instagram.com/..."
                  value={form.instagram ?? ''} onChange={e => set('instagram', e.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="profile-website" className="label">Personal Website</label>
              <input id="profile-website" type="url" className="input-field" placeholder="https://yoursite.com"
                value={form.website ?? ''} onChange={e => set('website', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t" style={{ borderColor: 'var(--c-border)' }}>
          <button onClick={handleClose} className="btn-secondary">
            <X size={14} /> Cancel
          </button>
          <button onClick={handleSave} className="btn-primary">
            <Save size={14} /> Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
}
