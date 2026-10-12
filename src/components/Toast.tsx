import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { Toast } from '../hooks/useToast';

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [exiting, setExiting] = useState(false);

  const handleRemove = () => {
    setExiting(true);
    setTimeout(() => onRemove(toast.id), 200);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(toast.id), 200);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const config = {
    success: {
      icon: <CheckCircle size={16} />,
      bg: 'bg-white border-l-4 border-l-[#16A34A]',
      iconColor: 'text-[#16A34A]',
    },
    error: {
      icon: <AlertCircle size={16} />,
      bg: 'bg-white border-l-4 border-l-[#DC2626]',
      iconColor: 'text-[#DC2626]',
    },
    warning: {
      icon: <AlertTriangle size={16} />,
      bg: 'bg-white border-l-4 border-l-[#D97706]',
      iconColor: 'text-[#D97706]',
    },
    info: {
      icon: <Info size={16} />,
      bg: 'bg-white border-l-4 border-l-[#0EA5A8]',
      iconColor: 'text-[#0EA5A8]',
    },
  };

  const c = config[toast.type];

  return (
    <div
      className={`flex items-center gap-3 ${c.bg} rounded-xl px-4 py-3 shadow-lg min-w-[280px] max-w-xs border border-[#E2E8F0] ${exiting ? 'toast-exit' : 'toast-enter'}`}
      role="alert"
    >
      <span className={c.iconColor}>{c.icon}</span>
      <p className="flex-1 text-sm font-medium text-[#102033]">{toast.message}</p>
      <button
        onClick={handleRemove}
        className="text-[#94A3B8] hover:text-[#64748B] transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 sm:bottom-6 sm:right-6 max-sm:bottom-4 max-sm:left-4 max-sm:right-4"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}
