import React from 'react';
import { WingLogo } from '../../components/common/WingLogo';
import { Layers, ArrowRight, Building2, User, Shield, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface WorkspaceSelectPageProps {
  onNavigate: (path: string) => void;
  onOpenInspector: () => void;
}

export const WorkspaceSelectPage: React.FC<WorkspaceSelectPageProps> = ({
  onNavigate,
  onOpenInspector,
}) => {
  const { account, person, workspace, switchWorkspace } = useAuth();

  if (!account || !person) {
    return (
      <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center p-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-4 max-w-sm">
          <p className="text-xs text-slate-600">Sesi tidak ditemukan. Silakan masuk terlebih dahulu.</p>
          <button
            onClick={() => onNavigate('/login')}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
          >
            Menuju Halaman Masuk
          </button>
        </div>
      </div>
    );
  }

  const handleSelect = (wsId: string) => {
    switchWorkspace(wsId);
    onNavigate('/app/overview');
  };

  return (
    <div className="bg-[#F5F7FB] min-h-screen py-12 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <WingLogo size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 pt-1">
            Pilih Ruang Kerja (Workspace)
          </h1>
          <p className="text-xs text-slate-600">
            Akun <strong>{person.name}</strong> memiliki {account.workspaces.length} penugasan/SK resmi yang aktif.
            Pilih ruang kerja yang ingin Anda kelola:
          </p>
        </div>

        <div className="space-y-3">
          {account.workspaces.map((ws) => {
            const isCurrent = workspace?.id === ws.id;
            return (
              <div
                key={ws.id}
                className={`bg-white rounded-2xl border p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'border-blue-500 ring-2 ring-blue-400/30 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">{ws.name}</span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                        Aktif Sekarang
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-blue-700 font-semibold flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>{ws.roleTitle}</span>
                    <span className="text-slate-300">·</span>
                    <span className="font-mono text-slate-500 font-normal">{ws.role}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Unit: {ws.unitName}</span>
                    <span className="text-slate-300">·</span>
                    <span>Wilayah: {ws.regionScopeLabel}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => handleSelect(ws.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isCurrent
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{isCurrent ? 'Lanjutkan' : 'Beralih ke Sini'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs text-slate-600 flex items-center justify-between">
          <span>Ingin berganti ke pengguna atau peran lain?</span>
          <button
            onClick={onOpenInspector}
            className="text-blue-700 font-semibold hover:underline"
          >
            Buka Demo Inspector &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
