import React from 'react';
import { ShieldAlert, ArrowLeft, Sliders, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ForbiddenViewProps {
  reason?: string;
  onNavigateHome: () => void;
  onOpenInspector: () => void;
}

export const ForbiddenView: React.FC<ForbiddenViewProps> = ({
  reason,
  onNavigateHome,
  onOpenInspector,
}) => {
  const { workspace } = useAuth();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl mx-auto flex items-center justify-center mb-5">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block mb-1">
          Kode 403 — Akses Terbatas
        </span>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Hak Akses Tidak Mencukupi
        </h2>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          {reason ||
            'Peran dan tingkat kewenangan Anda saat ini tidak memiliki izin untuk membuka modul atau unit kerja ini.'}
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-6 text-left text-xs">
          <div className="text-slate-400 uppercase text-[10px] font-semibold mb-1">
            Status Akun Saat Ini
          </div>
          <div className="text-slate-700">
            <span className="font-semibold text-slate-900">Peran:</span>{' '}
            {workspace?.roleTitle || 'Tidak Terdefinisi'}
          </div>
          <div className="text-slate-700">
            <span className="font-semibold text-slate-900">Unit:</span>{' '}
            {workspace?.unitName || '-'}
          </div>
          <div className="text-slate-700">
            <span className="font-semibold text-slate-900">Wilayah:</span>{' '}
            {workspace?.regionScopeLabel || '-'}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda</span>
          </button>
          <button
            onClick={onOpenInspector}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Ganti Peran di Inspector</span>
          </button>
        </div>
      </div>
    </div>
  );
};
