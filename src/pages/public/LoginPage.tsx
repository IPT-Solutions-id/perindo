import React, { useState } from 'react';
import { WingLogo } from '../../components/common/WingLogo';
import {
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Crown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_ACCOUNTS } from '../../data/mockData';

interface LoginPageProps {
  onNavigate: (path: string) => void;
  onOpenInspector: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { loginAs } = useAuth();
  const [selectedAccountId, setSelectedAccountId] = useState('ACC-KETUM');
  const [usernameInput, setUsernameInput] = useState('ketum.perindo');
  const [passwordInput, setPasswordInput] = useState('perindo2025');

  const handleSelectAccount = (accId: string) => {
    setSelectedAccountId(accId);
    const acc = MOCK_ACCOUNTS.find((a) => a.id === accId);
    if (acc) {
      setUsernameInput(acc.username);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedAccountId);
    const acc = MOCK_ACCOUNTS.find((a) => a.id === selectedAccountId);
    if (acc && acc.workspaces.length > 1) {
      onNavigate('/pilih-workspace');
    } else {
      onNavigate('/app/overview');
    }
  };

  return (
    <div className="bg-[#F5F7FB] min-h-screen py-10 flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6">
        {/* Official Institutional Badge Banner */}
        <div className="mb-6 p-3.5 rounded-xl bg-blue-50/80 border border-[#1667C7]/20 text-[#102C63] text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#1667C7] shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider block text-[11px]">
                SISTEM INFORMASI MANAJEMEN RESMI PARTAI PERINDO
              </span>
              <span className="text-[11px] text-slate-600">
                Portal komando berjenjang: Ketua Umum &rarr; DPP &rarr; DPW &rarr; DPD &rarr; DPC &rarr; DPRt.
              </span>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
            SISTEM ONLINE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Card */}
          <div className="md:col-span-5 bg-white rounded-2xl border border-slate-200 border-t-4 border-t-[#102C63] p-8 shadow-xs space-y-6">
            <div className="space-y-2">
              <WingLogo size={36} />
              <h1 className="text-xl font-bold text-[#102C63] pt-2">
                Masuk ke Portal Internal
              </h1>
              <p className="text-xs text-slate-500">
                Pilih jenjang jabatan di sebelah kanan atau masukkan kredensial pengurus Anda.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label htmlFor="login-username" className="block font-semibold text-slate-700 mb-1">
                  ID Pengguna / Nomor KTA
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="login-username"
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="nama.pengguna@perindo.id"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#1667C7] font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="block font-semibold text-slate-700 mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#1667C7] font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#102C63] hover:bg-[#D7283F] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Masuk ke Ruang Kerja</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="hover:text-slate-900 cursor-pointer"
              >
                &larr; Kembali ke Beranda
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/kontak')}
                className="text-[#1667C7] hover:underline font-medium cursor-pointer"
              >
                Bantuan Teknis
              </button>
            </div>
          </div>

          {/* Right Column: Complete 6-Tier Hierarchy Persona Switcher List */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#102C63]">
                Pilih Jenjang Jabatan Organisasi (6 Tingkat)
              </h2>
              <span className="text-[10px] text-slate-500 font-medium">
                Wewenang Berjenjang Sesuai Wilayah
              </span>
            </div>

            <div className="space-y-2">
              {[
                {
                  id: 'ACC-KETUM',
                  name: 'Angela H. Tanoesoedibjo',
                  roleDesc: 'Ketua Umum Partai Perindo — Otoritas Penuh Seluruh Indonesia (38 Provinsi)',
                  badge: '1 · KETUA UMUM',
                  isTop: true,
                },
                {
                  id: 'ACC-004',
                  name: 'Dr. Hendra Kusuma, M.Si.',
                  roleDesc: 'Dewan Pimpinan Pusat (DPP) — Komando Eksekutif & Verifikasi SK Nasional',
                  badge: '2 · DPP PUSAT',
                },
                {
                  id: 'ACC-DPW',
                  name: 'Ir. Budi Santoso, M.M.',
                  roleDesc: 'Ketua DPW Provinsi DKI Jakarta — Membawahi DPD, DPC & DPRt se-DKI Jakarta',
                  badge: '3 · DPW PROVINSI',
                },
                {
                  id: 'ACC-DPD',
                  name: 'H. Rahmat Hidayat, S.H.',
                  roleDesc: 'Ketua DPD Kota Jakarta Pusat — Membawahi DPC Kecamatan & DPRt Kelurahan',
                  badge: '4 · DPD KAB/KOTA',
                },
                {
                  id: 'ACC-001',
                  name: 'Ahmad Fauzi, S.E.',
                  roleDesc: 'Ketua DPC Kecamatan Menteng — Pembinaan DPRt, Rekrutmen Kader & UMKM',
                  badge: '5 · DPC KECAMATAN',
                },
                {
                  id: 'ACC-DPRT',
                  name: 'M. Ridwan Kamiluddin',
                  roleDesc: 'Ketua DPRt Kelurahan Kebon Sirih — Ujung Tombak Saksi TPS & Rembug RW',
                  badge: '6 · DPRt KELURAHAN',
                },
                {
                  id: 'ACC-002',
                  name: 'Siti Rahmawati, S.Sos.',
                  roleDesc: 'Koordinator DPW Pemuda Perindo (Sayap Otonom) & Tim Seleksi Caleg',
                  badge: 'SAYAP & CALEG',
                },
              ].map((p) => {
                const isSelected = selectedAccountId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectAccount(p.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-[#102C63] border-l-4 border-l-[#D7283F] bg-blue-50/70 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {p.isTop && <Crown className="w-3.5 h-3.5 text-amber-600" />}
                        <span className="text-xs font-bold text-slate-900">{p.name}</span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            p.isTop
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : isSelected
                              ? 'text-[#102C63] bg-blue-100'
                              : 'text-blue-700 bg-blue-50'
                          }`}
                        >
                          {p.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">{p.roleDesc}</div>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-[#D7283F] shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
