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
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
            Akun & Keanggotaan
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Profil Pengguna & KTA Digital</h1>
          <p className="text-xs text-slate-500 mt-1">
            Data identitas kader, riwayat penugasan surat keputusan (SK), dan kartu identitas digital.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
        >
          {copiedKta ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedKta ? 'Tersalin ke Clipboard' : 'Salin Nomor KTA'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Digital KTA Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span>Kartu Tanda Anggota (KTA)</span>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="text-blue-700 font-semibold hover:underline text-[11px]"
            >
              {isFlipped ? 'Lihat Sisi Depan' : 'Putar Sisi Belakang'}
            </button>
          </div>

          {!isFlipped ? (
            /* Front of KTA */
            <div className="bg-gradient-to-br from-[#102C63] via-[#0d234f] to-[#1667C7] text-white rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-5 border border-blue-900">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-sm">
                    P
                  </div>
                  <div>
                    <div className="font-extrabold text-xs tracking-wider uppercase">PARTAI PERINDO</div>
                    <div className="text-[10px] text-white/70">PERSATUAN INDONESIA</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded text-white font-bold">
                  KTA DIGITAL
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-[10px] text-white/60 uppercase tracking-wider block">Nama Lengkap</span>
                  <span className="text-base font-bold text-white tracking-wide">{person?.name}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-white/60 uppercase tracking-wider block">Nomor KTA</span>
                    <span className="font-mono text-xs font-semibold text-sky-200">{person?.ktaNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/60 uppercase tracking-wider block">Wilayah Domisili</span>
                    <span className="text-xs text-white/90">{person?.city}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70">
                <div className="flex items-center gap-1.5">
                  <QrCode className="w-5 h-5 text-white" />
                  <span>Validasi QR DPP</span>
                </div>
                <span className="font-mono text-[10px]">Tgl Gabung: {person?.joinedDate}</span>
              </div>
            </div>
          ) : (
            /* Back of KTA */
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4 border border-slate-800">
              <div className="border-b border-slate-800 pb-3">
                <div className="font-bold text-xs uppercase tracking-wider text-slate-300">
                  Ketentuan Pemegang KTA
                </div>
              </div>
              <ul className="text-[11px] text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Kartu ini adalah identitas resmi kader Partai Perindo (Data Simulasi).</li>
                <li>Dilarang memindahtangankan kartu kepada pihak lain tanpa izin partai.</li>
                <li>Jika menemukan kartu ini, harap hubungi sekretariat partai terdekat.</li>
              </ul>
              <div className="pt-4 border-t border-slate-800 text-center text-[10px] text-slate-500 font-mono">
                DPP PARTAI PERINDO · JAKARTA
              </div>
            </div>
          )}

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500">
            Klik 'Putar Sisi Belakang' untuk melihat ketentuan kartu.
          </div>
        </div>

        {/* Right Column: Profile Specs & Appointments */}
        <div className="lg:col-span-7 space-y-6">
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
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">ID Akun Simulasi</span>
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
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">NIK (Tersamar)</span>
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
