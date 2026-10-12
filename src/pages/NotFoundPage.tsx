import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="container-max py-24 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 rounded-2xl bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] flex items-center justify-center mb-6">
        <Database size={32} className="text-[#CBD5E1]" />
      </div>

      <div className="text-7xl font-bold text-[#E2E8F0] mb-4 leading-none">404</div>

      <h1 className="text-2xl font-bold text-[#102033] mb-3">Page Not Found</h1>
      <p className="text-[#64748B] text-base mb-8 max-w-md leading-relaxed">
        The laboratory page you are looking for doesn't exist or has been moved.
      </p>

      <Link to="/" className="btn-primary">
        <ArrowLeft size={16} />
        Back to Laboratory
      </Link>
    </main>
  );
}
