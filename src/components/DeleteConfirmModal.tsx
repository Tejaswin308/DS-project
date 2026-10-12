import React from 'react';
import { Trash2, X } from 'lucide-react';
import Modal from './Modal';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  experimentTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmModal({
  isOpen,
  experimentTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Delete Experiment?" size="sm" closeOnOverlay={false}>
      <div className="space-y-5">
        {/* Icon */}
        <div className="flex items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center">
            <Trash2 size={24} className="text-[#DC2626]" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-[#102033] font-semibold mb-1">
            Are you sure you want to permanently delete this experiment?
          </p>
          <p className="text-sm text-[#64748B]">
            <span className="font-semibold text-[#102033]">{experimentTitle}</span>
            {' '}will be removed from your laboratory. This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <button onClick={onCancel} className="btn-secondary flex-1">
            <X size={14} />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-danger flex-1"
            autoFocus
          >
            <Trash2 size={14} />
            Delete Experiment
          </button>
        </div>
      </div>
    </Modal>
  );
}
