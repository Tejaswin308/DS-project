import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, User, Menu, X, FlaskConical } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import type { StudentProfile } from '../types/student';

interface HeaderProps {
  profile: StudentProfile;
  onEditProfile: () => void;
}

export default function Header({ profile, onEditProfile }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handler for Home — smoothly scroll to the start (top) of the page
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (mobileMenuOpen) setMobileMenuOpen(false);

    if (location.pathname === '/' && !location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Smart handler for Experiments — scroll if on home, navigate otherwise
  const handleExperimentsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (mobileMenuOpen) setMobileMenuOpen(false);

    const isHome = location.pathname === '/' || location.pathname === '/experiments';
    if (isHome) {
      const el = document.getElementById('experiment-library');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/experiments#experiment-library');
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Experiments', href: '/experiments' },
    { label: 'Modules', href: '/modules' },
    { label: 'Tools', href: '/tools' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    // /experiments highlights also on /experiment/:id pages
    if (href === '/experiments')
      return location.pathname === '/experiments' || location.pathname.startsWith('/experiment');
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-40 border-b"
      style={{
        background: isDark
          ? 'rgba(9,17,31,0.90)'
          : 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: 'var(--c-border)',
        boxShadow: isDark
          ? '0 1px 0 rgba(255,255,255,0.04), 0 4px 20px rgba(0,0,0,0.3)'
          : '0 1px 0 var(--c-border), 0 4px 20px rgba(15,28,46,0.05)',
      }}
    >
      <div className="container-max">
        <div className="flex items-center justify-between gap-4" style={{ height: 64 }}>

          {/* LEFT — MBU Logo + Brand */}
          <a
            href="/"
            onClick={handleHomeClick}
            className="flex items-center gap-3 flex-shrink-0 group cursor-pointer"
            aria-label="DS Lab Home"
          >
            {/* MBU Logo */}
            <img
              src="/mbu-logo.png"
              alt="Mohan Babu University"
              className="h-10 w-auto object-contain select-none"
              draggable={false}
            />

            {/* Divider */}
            <div
              className="hidden sm:block w-px h-8 flex-shrink-0"
              style={{ background: 'var(--c-border)' }}
            />

            {/* DS Lab brand */}
            <div className="hidden sm:block">
              <div
                className="font-black text-lg leading-none tracking-tight"
                style={{ color: 'var(--c-text)' }}
              >
                DS<span style={{ color: 'var(--c-accent)' }}> LAB</span>
              </div>
              <div
                className="text-xs leading-none mt-0.5 font-medium hidden md:block"
                style={{ color: 'var(--c-text-3)' }}
              >
                Data Science Laboratory
              </div>
            </div>
          </a>

          {/* CENTER — Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map(link => {
              if (link.label === 'Home') {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleHomeClick}
                    className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                  >
                    {link.label}
                  </a>
                );
              }
              if (link.label === 'Experiments') {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleExperimentsClick}
                    className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT — Theme toggle + Profile */}
          <div className="flex items-center gap-2.5">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              <span className="theme-toggle-thumb">
                {isDark ? '🌙' : '☀️'}
              </span>
            </button>

            {/* Profile button */}
            <button
              onClick={onEditProfile}
              className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all"
              style={{
                background: 'var(--c-surface-alt)',
                borderColor: 'var(--c-border)',
              }}
              aria-label="Edit student profile"
            >
              <div
                className="w-7 h-7 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                style={{ background: 'var(--c-surface-2)' }}
              >
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={14} style={{ color: 'var(--c-text-3)' }} />
                )}
              </div>
              <div className="text-left hidden lg:block">
                <div
                  className="text-xs font-semibold leading-none"
                  style={{ color: 'var(--c-text)' }}
                >
                  {profile.name || 'Student'}
                </div>
                <div
                  className="text-xs leading-none mt-0.5"
                  style={{ color: 'var(--c-text-3)' }}
                >
                  {profile.rollNo || 'Roll No.'}
                </div>
              </div>
            </button>

            {/* Mobile profile icon */}
            <button
              onClick={onEditProfile}
              className="sm:hidden w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center border"
              style={{
                background: 'var(--c-surface-alt)',
                borderColor: 'var(--c-border)',
              }}
              aria-label="Edit profile"
            >
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={16} style={{ color: 'var(--c-text-3)' }} />
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden btn-ghost px-2 py-2"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden pb-3 pt-1 border-t"
            style={{ borderColor: 'var(--c-border)' }}
            aria-label="Mobile navigation"
          >
            {navLinks.map(link => {
              if (link.label === 'Home') {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleHomeClick}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive(link.href) ? 'active' : ''
                    } nav-link`}
                    style={{ display: 'block', marginBottom: 2 }}
                  >
                    {link.label}
                  </a>
                );
              }
              if (link.label === 'Experiments') {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleExperimentsClick}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive(link.href) ? 'active' : ''
                    } nav-link`}
                    style={{ display: 'block', marginBottom: 2 }}
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.href) ? 'active' : ''
                  } nav-link`}
                  style={{ display: 'block', marginBottom: 2 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}
