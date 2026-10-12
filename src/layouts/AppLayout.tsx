import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { StudentProfile } from '../types/student';

interface AppLayoutProps {
  children: React.ReactNode;
  profile: StudentProfile;
  onEditProfile: () => void;
}

export default function AppLayout({ children, profile, onEditProfile }: AppLayoutProps) {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: 'var(--c-bg)', color: 'var(--c-text)' }}
    >
      <Header profile={profile} onEditProfile={onEditProfile} />
      <div className="flex-1 page-bg">
        {children}
      </div>
      <Footer githubUrl={profile.github} />
    </div>
  );
}
