import React, { useState } from 'react';
import { Menu, X, ArrowRight, Shield } from 'lucide-react';
import { WingLogo } from '../common/WingLogo';
import { useAuth } from '../../context/AuthContext';

interface PublicNavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInspector: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  currentPath,
  onNavigate,
  onOpenInspector,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { account } = useAuth();

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Fitur', path: '/fitur' },
    { label: 'Tentang', path: '/tentang' },
    { label: 'Kontak', path: '/kontak' },
    { label: 'Privasi', path: '/privasi' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Perindo Brand Hairline Stripe */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#102C63] via-[#1667C7] to-[#D7283F]" />

      {/* 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => onNavigate('/')}
          className="focus:outline-hidden text-left transition-transform hover:scale-[1.02]"
          aria-label="Kembali ke Beranda PERINDO ONE"
        >
          <WingLogo size={36} />
        </button>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive
                    ? 'text-[#102C63] font-bold border-b-2 border-[#D7283F]'
                    : 'hover:text-[#102C63]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          {account ? (
            <button
              onClick={() => onNavigate('/app/overview')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#102C63] hover:bg-[#D7283F] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <span>Buka Aplikasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => onNavigate('/login')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#102C63] hover:bg-[#D7283F] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <span>Masuk Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                onNavigate(link.path);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenInspector();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg"
            >
              Buka Demo Role Inspector
            </button>
            <button
              onClick={() => {
                onNavigate(account ? '/app/overview' : '/login');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-white bg-slate-900 rounded-lg"
            >
              {account ? 'Buka Aplikasi' : 'Masuk Portal Demo'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
