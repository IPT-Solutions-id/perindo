import React, { useState } from 'react';
import {
  X,
  Shield,
  UserCheck,
  Building2,
  Lock,
  ArrowRight,
  Info,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_PERSONS, MOCK_UNITS } from '../../data/mockData';

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
  const {
    account,
    person,
    workspace,
    allAccounts,
    loginAs,
    switchWorkspace,
    checkUnitAccess,
  } = useAuth();
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
              <h2 className="text-sm font-bold tracking-tight">
                Panel Kendali Hierarki Jabatan & Wilayah
              </h2>
              <p className="text-[11px] text-slate-400">
                Ketum · DPP · DPW · DPD · DPC · DPRt · Sayap & Badan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Tutup Panel Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current State Summary */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                Pejabat / Pengguna Aktif
              </span>
              <span className="font-semibold text-slate-900 truncate block">
                {person ? person.name : 'Belum Masuk'}
              </span>
              <span className="text-slate-500 text-[11px]">ID: {person?.id || '-'}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">
                Jabatan & Jenjang
              </span>
              <span className="font-semibold text-blue-700 truncate block">
                {workspace?.roleTitle || 'Tidak ada'}
              </span>
              <span className="text-slate-500 text-[11px] font-mono">
                {workspace?.role || 'PUBLIC'} ({workspace?.level})
              </span>
            </div>
          </div>
        </div>

        {/* Segmented Tab Controls */}
        <div className="px-6 py-2.5 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setActiveTab('personas')}
              className={`flex-1 py-1.5 px-3 rounded-md transition-all cursor-pointer ${
                activeTab === 'personas'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Jenjang Jabatan
            </button>
            <button
              onClick={() => setActiveTab('scope')}
              className={`flex-1 py-1.5 px-3 rounded-md transition-all cursor-pointer ${
                activeTab === 'scope'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Wewenang Wilayah
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`flex-1 py-1.5 px-3 rounded-md transition-all cursor-pointer ${
                activeTab === 'permissions'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Matriks Modul
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
                  Pilih jabatan untuk beralih ruang kerja secara langsung (mulai dari <strong>Ketua Umum</strong>, <strong>DPP</strong>, <strong>DPW</strong>, <strong>DPD</strong>, <strong>DPC</strong>, hingga <strong>DPRt</strong>).
                </span>
              </div>

              <div className="space-y-3">
                {allAccounts.map((acc) => {
                  const isCurrentAccount = account?.id === acc.id;
                  const accPerson = MOCK_PERSONS.find((p) => p.id === acc.personId);
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
                          <div className="w-7 h-7 rounded-full bg-[#102C63] text-white flex items-center justify-center font-bold text-xs">
                            {accPerson?.name.substring(0, 1) || 'P'}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">
                              {accPerson?.name || acc.username}
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              @{acc.username} · {accPerson?.ktaNumber}
                            </div>
                          </div>
                        </div>

                        {!isCurrentAccount && (
                          <button
                            onClick={() => loginAs(acc.id)}
                            className="text-xs font-semibold text-blue-700 hover:text-blue-900 border border-blue-200 hover:border-blue-400 bg-white px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                          >
                            Aktifkan
                          </button>
                        )}
                        {isCurrentAccount && (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            Sedang Aktif
                          </span>
                        )}
                      </div>

                      {/* Workspaces for this account */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1.5">
                        {acc.workspaces.map((ws) => {
                          const isCurrentWs = workspace?.id === ws.id;
                          return (
                            <div
                              key={ws.id}
                              className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                                isCurrentWs
                                  ? 'bg-[#102C63] text-white font-medium'
                                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <div className="truncate pr-2">
                                <div className="truncate font-semibold">
                                  [{ws.level}] {ws.roleTitle} — {ws.unitName}
                                </div>
                                <div
                                  className={`text-[10px] ${
                                    isCurrentWs ? 'text-blue-200' : 'text-slate-500'
                                  }`}
                                >
                                  Role: {ws.role} · Wilayah: {ws.regionScopeLabel}
                                </div>
                              </div>

                              {!isCurrentWs ? (
                                <button
                                  onClick={() => {
                                    if (!isCurrentAccount) loginAs(acc.id, ws.id);
                                    else switchWorkspace(ws.id);
                                  }}
                                  className="text-[11px] text-blue-700 hover:text-blue-900 whitespace-nowrap bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs font-semibold cursor-pointer"
                                >
                                  Pilih SK
                                </button>
                              ) : (
                                <span className="text-[10px] uppercase font-bold text-amber-300 shrink-0">
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

          {activeTab === 'scope' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Matriks Wewenang Teritorial Berjenjang:</strong> Ketua Umum & DPP memiliki akses penuh ke seluruh unit nasional. DPW, DPD, DPC, dan DPRt memiliki wewenang otomatis pada unitnya beserta unit bawahan di pohon wilayahnya.
                </span>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3">
                <div className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Status Akses Unit terhadap Jabatan Saat Ini ({workspace?.roleTitle}):
                </div>

                <div className="space-y-2 text-xs">
                  {MOCK_UNITS.map((u) => {
                    const check = checkUnitAccess(u.id);
                    return (
                      <div
                        key={u.id}
                        className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${
                          check.allowed
                            ? 'border-emerald-200 bg-emerald-50/40'
                            : 'border-rose-200 bg-rose-50/40'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-slate-900">
                            [{u.level}] {u.name}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            Provinsi: {u.regionScope.province}
                          </div>
                        </div>
                        {check.allowed ? (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                            Wewenang Sah
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded shrink-0">
                            Luar Yurisdiksi
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Daftar 11 modul operasional aktif untuk peran{' '}
                <strong className="text-slate-900">{workspace?.roleTitle}</strong>:
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                {[
                  { path: '/app/overview', title: 'Meja Kerja & Disposisi Harian' },
                  { path: '/app/members', title: 'Database Anggota & KTA Digital' },
                  { path: '/app/organizations', title: 'Pohon Struktur Organisasi (DPP-DPRt)' },
                  { path: '/app/programs', title: 'Program Pemberdayaan & UMKM' },
                  { path: '/app/activities', title: 'Agenda & Kegiatan Lapangan' },
                  { path: '/app/services', title: 'Layanan & Aspirasi Masyarakat' },
                  { path: '/app/approvals', title: 'Verifikasi & SK Berjenjang' },
                  { path: '/app/elections', title: 'Saksi TPS & Rekapitulasi C1' },
                  { path: '/app/candidates', title: 'Rubrik Seleksi Caleg' },
                  { path: '/app/executive', title: 'Command Center Eksekutif Nasional' },
                  { path: '/app/admin/health', title: 'Diagnostik & Audit Log' },
                ].map((item) => (
                  <div
                    key={item.path}
                    className="p-3 flex items-center justify-between hover:bg-slate-50"
                  >
                    <div>
                      <div className="font-medium text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{item.path}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        <UserCheck className="w-3 h-3" />
                        Aktif
                      </span>

                      {onNavigate && (
                        <button
                          onClick={() => {
                            onNavigate(item.path);
                            onClose();
                          }}
                          className="text-xs text-slate-600 hover:text-blue-600 p-1 hover:bg-slate-200 rounded cursor-pointer"
                          title="Buka modul ini"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs flex items-center justify-between">
          <span className="text-slate-500 text-[11px]">
            PERINDO ONE · Hierarki Wewenang Berjenjang
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-xs font-medium cursor-pointer"
          >
            Tutup Panel
          </button>
        </div>
      </div>
    </div>
  );
};
