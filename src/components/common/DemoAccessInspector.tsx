import React, { useState } from 'react';
import {
  X,
  Shield,
  UserCheck,
  Building2,
  Lock,
  Layers,
  ArrowRight,
  Info,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DemoAccessInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

export const DemoAccessInspector: React.FC<DemoAccessInspectorProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { account, person, workspace, allAccounts, loginAs, switchWorkspace } = useAuth();
  const [activeTab, setActiveTab] = useState<'personas' | 'permissions' | 'scope'>('personas');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-sm font-bold tracking-tight">Demo Access & Role Inspector</h2>
              <p className="text-[11px] text-slate-400">
                Alat Pengujian Hak Akses, Multi-Workspace & Batas Wilayah
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Tutup Panel Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current State Summary */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Pengguna Aktif</span>
              <span className="font-semibold text-slate-900 truncate block">
                {person ? person.name : 'Belum Masuk'}
              </span>
              <span className="text-slate-500 text-[11px]">ID: {person?.id || '-'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Workspace / Peran</span>
              <span className="font-semibold text-blue-700 truncate block">
                {workspace?.roleTitle || 'Tidak ada'}
              </span>
              <span className="text-slate-500 text-[11px] font-mono">
                {workspace?.role || 'PUBLIC'}
              </span>
            </div>
          </div>
        </div>

        {/* Segmented Tab Controls */}
        <div className="px-6 py-2.5 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('personas')}
              className={`flex-1 py-1.5 px-3 rounded-md transition-all ${
                activeTab === 'personas'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ganti Akun Demo
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`flex-1 py-1.5 px-3 rounded-md transition-all ${
                activeTab === 'permissions'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Matriks Modul
            </button>
            <button
              onClick={() => setActiveTab('scope')}
              className={`flex-1 py-1.5 px-3 rounded-md transition-all ${
                activeTab === 'scope'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Uji Batas Wilayah
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {activeTab === 'personas' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 bg-blue-50/70 border border-blue-100 rounded-lg p-3 flex gap-2">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Satu akun demo dapat memiliki lebih dari satu penugasan (SK/Workspace). Klik tombol <strong>Aktifkan</strong> untuk berganti konteks secara instan.
                </span>
              </div>

              <div className="space-y-3">
                {allAccounts.map((acc) => {
                  const isCurrentAccount = account?.id === acc.id;
                  return (
                    <div
                      key={acc.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isCurrentAccount
                          ? 'border-blue-300 bg-blue-50/30 ring-1 ring-blue-300'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                            {acc.username.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-900">
                              {acc.username}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              ID: {acc.personId}
                            </div>
                          </div>
                        </div>

                        {!isCurrentAccount && (
                          <button
                            onClick={() => loginAs(acc.id)}
                            className="text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 bg-white px-2.5 py-1 rounded-md transition-colors"
                          >
                            Pilih Pengguna
                          </button>
                        )}
                        {isCurrentAccount && (
                          <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            Sedang Aktif
                          </span>
                        )}
                      </div>

                      {/* Workspaces for this account */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5">
                        <span className="text-[10px] uppercase font-semibold text-slate-400">
                          Workspace Tersedia:
                        </span>
                        {acc.workspaces.map((ws) => {
                          const isCurrentWs = workspace?.id === ws.id;
                          return (
                            <div
                              key={ws.id}
                              className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                                isCurrentWs
                                  ? 'bg-blue-600 text-white font-medium'
                                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <div className="truncate pr-2">
                                <div className="truncate font-medium">{ws.name}</div>
                                <div
                                  className={`text-[10px] ${
                                    isCurrentWs ? 'text-blue-100' : 'text-slate-500'
                                  }`}
                                >
                                  Peran: {ws.role} · {ws.regionScopeLabel}
                                </div>
                              </div>

                              {!isCurrentWs ? (
                                <button
                                  onClick={() => {
                                    if (!isCurrentAccount) loginAs(acc.id, ws.id);
                                    else switchWorkspace(ws.id);
                                  }}
                                  className="text-[11px] text-blue-600 hover:text-blue-800 whitespace-nowrap bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs"
                                >
                                  Pindah
                                </button>
                              ) : (
                                <span className="text-[10px] uppercase font-bold text-white shrink-0">
                                  Aktif
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Pemeriksaan izin navigasi untuk peran saat ini:
                <strong className="text-slate-900 ml-1">{workspace?.role || 'PUBLIC'}</strong>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                {[
                  { path: '/app/overview', title: 'Dashboard Utama', roles: 'Semua Peran (Tampilan Berbeda)' },
                  { path: '/app/members', title: 'Database Anggota', roles: 'Struktur Pengurus & Kader (Bukan Tech Operator)' },
                  { path: '/app/organizations', title: 'Struktur Organisasi', roles: 'Struktur Pengurus & Eksekutif' },
                  { path: '/app/programs', title: 'Program Kerja', roles: 'Struktur Pengurus' },
                  { path: '/app/activities', title: 'Agenda & Kegiatan', roles: 'Semua Kecuali Tech Operator' },
                  { path: '/app/services', title: 'Layanan & Aspirasi', roles: 'Semua Anggota & Pengurus' },
                  { path: '/app/approvals', title: 'Verifikasi & SK DPP', roles: 'Struktur Pengurus' },
                  { path: '/app/elections', title: 'Simulasi Saksi TPS', roles: 'TPS_WITNESS, TPS_VERIFIER, Pengurus' },
                  { path: '/app/candidates', title: 'Rubrik Seleksi Caleg', roles: 'CANDIDATE_EVALUATOR, Pimpinan DPD/DPW/DPP' },
                  { path: '/app/executive', title: 'Command Center Eksekutif', roles: 'EXECUTIVE, DPP_ADMIN Saja' },
                  { path: '/app/admin/health', title: 'Diagnostik & Audit Log', roles: 'TECH_OPERATOR, DPP_ADMIN Saja' },
                ].map((item) => {
                  const currentRole = workspace?.role || 'PUBLIC';
                  let isAccessible = true;
                  if (item.path === '/app/executive' && !['EXECUTIVE', 'DPP_ADMIN'].includes(currentRole)) isAccessible = false;
                  if (item.path === '/app/admin/health' && !['TECH_OPERATOR', 'DPP_ADMIN'].includes(currentRole)) isAccessible = false;
                  if (item.path === '/app/candidates' && !['CANDIDATE_EVALUATOR', 'DPD_MANAGER', 'DPW_MANAGER', 'DPP_ADMIN', 'EXECUTIVE'].includes(currentRole)) isAccessible = false;
                  if (item.path === '/app/elections' && !['TPS_WITNESS', 'TPS_VERIFIER', 'DPC_MANAGER', 'DPD_MANAGER', 'DPW_MANAGER', 'DPP_ADMIN', 'EXECUTIVE'].includes(currentRole)) isAccessible = false;
                  if (item.path === '/app/members' && currentRole === 'TECH_OPERATOR') isAccessible = false;

                  return (
                    <div key={item.path} className="p-3 flex items-center justify-between hover:bg-slate-50">
                      <div>
                        <div className="font-medium text-slate-900">{item.title}</div>
                        <div className="text-[11px] text-slate-500 font-mono">{item.path}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{item.roles}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isAccessible ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                            <UserCheck className="w-3 h-3" />
                            Diizinkan
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-medium">
                            <Lock className="w-3 h-3" />
                            Ditolak (403)
                          </span>
                        )}

                        {onNavigate && (
                          <button
                            onClick={() => {
                              onNavigate(item.path);
                              onClose();
                            }}
                            className="text-xs text-slate-600 hover:text-blue-600 p-1 hover:bg-slate-200 rounded"
                            title="Buka rute ini sekarang"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'scope' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Uji Isolasi Wilayah (Cross-Region Boundary Test):</strong> Sistem melarang struktur lokal seperti DPC Menteng (DKI Jakarta) membaca atau mengelola data wilayah Jawa Barat (DPD Kota Bandung).
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                <div className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Konteks Wilayah Saat Ini:
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg text-xs space-y-1">
                  <div><strong>Unit Aktif:</strong> {workspace?.unitName}</div>
                  <div><strong>Cakupan Wilayah:</strong> {workspace?.regionScopeLabel}</div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs">
                  <div className="font-semibold text-slate-900 mb-2">Simulasi Pengujian:</div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-800">Unit 1: DPRt Kebon Sirih (DKI Jakarta)</div>
                        <div className="text-[11px] text-slate-500">Subordinat dalam cakupan DPC Menteng</div>
                      </div>
                      <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        Akses Diterima
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg border border-rose-200 bg-rose-50/40 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-slate-800">Unit 2: DPD Kota Bandung (Jawa Barat)</div>
                        <div className="text-[11px] text-rose-600">Luar provinsi kewenangan DPC Menteng</div>
                      </div>
                      <span className="text-[11px] text-rose-700 bg-rose-100 px-2 py-0.5 rounded font-medium">
                        Ditolak (403 Wilayah)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs flex items-center justify-between">
          <span className="text-slate-400 text-[11px]">
            PERINDO ONE Prototype · Role Inspector
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-xs font-medium"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
};
