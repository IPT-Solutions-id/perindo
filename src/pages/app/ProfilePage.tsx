import React, { useState } from 'react';
import {
  User,
  CreditCard,
  QrCode,
  Shield,
  Layers,
  Copy,
  Check,
  Building2,
  Calendar,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { KtaCard } from '../../components/common/KtaCard';

export const ProfilePage: React.FC = () => {
  const { account, person, workspace, switchWorkspace } = useAuth();
  const [copiedKta, setCopiedKta] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCopy = () => {
    if (person?.ktaNumber) {
      navigator.clipboard.writeText(person.ktaNumber);
      setCopiedKta(true);
      setTimeout(() => setCopiedKta(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header in Fresh Light Blue */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-white rounded-2xl border border-sky-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Akun & Keanggotaan ({workspace?.level} — {workspace?.unitName})
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Profil Pengguna & KTA Digital</h1>
          <p className="text-xs text-slate-600 mt-1">
            Data identitas kader, riwayat penugasan surat keputusan (SK), dan kartu identitas digital.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-sky-200 bg-white hover:bg-sky-50 text-sky-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          {copiedKta ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedKta ? 'Tersalin ke Clipboard' : 'Salin Nomor KTA'}</span>
        </button>
      </div>

      {/* Two-Sided Digital KTA Component */}
      <div className="bg-white rounded-2xl border border-sky-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-sky-100 pb-3">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-sky-600" />
            <h2 className="font-bold text-base text-slate-900">
              Kartu Tanda Anggota (KTA) Digital Resmi
            </h2>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            KTA AKTIF
          </span>
        </div>

        {person && <KtaCard person={person} layout="side-by-side" />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Specs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Informasi Biodata Kader
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Nama Lengkap</span>
                <span className="font-semibold text-slate-900 text-sm mt-0.5 block">{person?.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">ID Anggota / Akun</span>
                <span className="font-mono text-slate-800 font-semibold mt-0.5 block">{person?.id}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Surel (Email)</span>
                <span className="text-slate-800 font-mono mt-0.5 block">{person?.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Nomor Kontak</span>
                <span className="text-slate-800 font-mono mt-0.5 block">{person?.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Nomor Induk Kependudukan (NIK)</span>
                <span className="text-slate-800 font-mono mt-0.5 block">{person?.nikDummy}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Provinsi</span>
                <span className="text-slate-800 font-semibold mt-0.5 block">{person?.province}</span>
              </div>
            </div>
          </div>

          {/* Active Appointments (Workspaces) for this person */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
              <span>Penugasan SK Resmi Anda</span>
              <span className="text-xs text-slate-400 font-mono font-normal">
                {account?.workspaces.length} Surat Keputusan
              </span>
            </h2>

            <div className="space-y-2.5">
              {account?.workspaces.map((ws) => {
                const isCurrent = workspace?.id === ws.id;
                return (
                  <div
                    key={ws.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      isCurrent
                        ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-400'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{ws.roleTitle}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            AKTIF
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {ws.unitName} · {ws.regionScopeLabel}
                      </div>
                    </div>

                    {!isCurrent && (
                      <button
                        onClick={() => switchWorkspace(ws.id)}
                        className="px-3 py-1 bg-white border border-slate-200 hover:border-blue-400 text-xs font-semibold text-blue-700 rounded-lg transition-colors"
                      >
                        Beralih
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
