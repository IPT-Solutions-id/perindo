import React from 'react';
import { AlertCircle, Sliders, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface HeaderBannerProps {
  onOpenInspector?: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({ onOpenInspector }) => {
  const { workspace } = useAuth();
  const { resetAllData } = useData();

  return (
    <aside aria-label="Status Simulasi" className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 border-b border-slate-800 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="inline-flex items-center gap-1.5 font-bold tracking-wider text-rose-300 uppercase shrink-0 text-[11px]">
          <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
          DATA SIMULASI • BELUM APLIKASI RESMI
        </span>
        <span className="hidden md:inline text-slate-400" aria-hidden="true">·</span>
        <span className="hidden md:inline text-slate-400 truncate">
          Lingkungan Prototipe Tata Kelola Internal Organisasi Partai (Tanpa Data NIK/KTP Riil)
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0 text-[11px]">
        {workspace && (
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-400">Workspace:</span>
            <span className="font-semibold text-white">{workspace.roleTitle}</span>
          </div>
        )}

        <button
          onClick={onOpenInspector}
          className="inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded transition-colors text-[11px] font-medium"
          title="Buka panel pengujian hak akses dan pergantian profil simulasi"
        >
          <Sliders className="w-3 h-3 text-sky-400" />
          <span>Demo Access Inspector</span>
        </button>

        <button
          onClick={() => {
            if (window.confirm('Reset semua data kembali ke fixture awal simulasi?')) {
              resetAllData();
            }
          }}
          className="hidden lg:inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          title="Reset data ke nilai bawaan"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Fixture</span>
        </button>
      </div>
    </aside>
  );
};
