import React from 'react';
import { WingLogo } from '../common/WingLogo';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

interface PublicFooterProps {
  onNavigate: (path: string) => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          {/* Col 1: Brand & Disclaimer */}
          <div className="md:col-span-2 space-y-3">
            <WingLogo size={32} />
            <p className="text-slate-600 max-w-sm leading-relaxed text-xs">
              Prototipe sistem tata kelola organisasi partai terpadu. Dibangun untuk memetakan
              struktur kepengurusan bertingkat (DPP, DPW, DPD, DPC, DPRt), manajemen program,
              layanan aspirasi kader, dan simulasi penugasan saksi TPS.
            </p>
            <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-2.5 max-w-md">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="text-[11px] leading-tight font-medium">
                Sistem Simulasi Akademis & Teknis. Tidak menggunakan NIK/KTP asli dan bukan hasil resmi Pemilu KPU.
              </span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div>
            <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider mb-3">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('/')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/fitur')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Fitur & Tata Kelola
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tentang')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Tentang Platform
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/kontak')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Kontak Sekretariat
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privasi')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Kebijakan Privasi
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Protokol Tata Kelola */}
          <div>
            <h4 className="font-semibold text-slate-900 uppercase text-[11px] tracking-wider mb-3">
              Status & Keamanan
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-slate-600">
                <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Simulasi RBAC (Role-Based Access Control) multi-tingkat</span>
              </div>
              <div className="flex items-start gap-2 text-slate-600">
                <ExternalLink className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Isolasi Wilayah Antar-Daerah (Boundary Enforced)</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-400">
                Status Verifikasi:
                <span className="block font-medium text-slate-700">
                  SIMULASI • MENUNGGU VERIFIKASI DPP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; 2025–2026 PERINDO ONE Project. Prototipe Internal Organisasi.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('/privasi')} className="hover:text-slate-600">
              Kebijakan Data Simulasi
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onNavigate('/login')} className="hover:text-slate-600">
              Portal Masuk Demo
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
