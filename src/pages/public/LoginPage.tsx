import React, { useState } from 'react';
import { WingLogo } from '../../components/common/WingLogo';
import {
  Lock,
  User,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_ACCOUNTS } from '../../data/mockData';

interface LoginPageProps {
  onNavigate: (path: string) => void;
  onOpenInspector: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, onOpenInspector }) => {
  const { loginAs } = useAuth();
  const [selectedAccountId, setSelectedAccountId] = useState('ACC-001');
  const [usernameInput, setUsernameInput] = useState('ahmad.fauzi');
  const [passwordInput, setPasswordInput] = useState('demo123');

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
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6">
        {/* Prototype Auth Warning Banner */}
        <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
            <div>
              <span className="font-bold uppercase tracking-wider block text-[11px]">
                AKUN DEMO — BUKAN AUTENTIKASI PRODUKSI
              </span>
              <span className="text-[11px] text-amber-800">
                Pilih salah satu akun simulasi yang telah terdaftar dengan hak akses sesuai surat keputusan (SK).
              </span>
            </div>
          </div>
          <button
            onClick={onOpenInspector}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-amber-300 rounded-lg text-xs font-semibold hover:bg-amber-100 transition-colors shrink-0"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-800" />
            <span>Inspector</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Card */}
          <div className="md:col-span-6 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
            <div className="space-y-2">
              <WingLogo size={36} />
              <h1 className="text-xl font-bold text-slate-900 pt-2">
                Masuk ke Portal Internal
              </h1>
              <p className="text-xs text-slate-500">
                Gunakan kredensial akun simulasi untuk mengakses ruang kerja (workspace) Anda.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label htmlFor="login-username" className="block font-semibold text-slate-700 mb-1">
                  Nama Pengguna (Username)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="login-username"
                    type="text"
                    required
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    placeholder="nama.pengguna"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="block font-semibold text-slate-700 mb-1">
                  Kata Sandi Demo
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
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Kredensial simulasi otomatis terisi sesuai persona yang dipilih.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#102C63] hover:bg-[#0b1f47] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className="hover:text-slate-900"
              >
                &larr; Kembali ke Beranda
              </button>
              <button
                type="button"
                onClick={onOpenInspector}
                className="text-blue-700 hover:underline font-medium"
              >
                Buka Role Inspector
              </button>
            </div>
          </div>

          {/* Right Column: Persona Switcher List */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Pilih Persona Uji Coba Cepat
              </h2>
              <span className="text-[10px] text-slate-400">Klik untuk memilih</span>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  id: 'ACC-001',
                  name: 'Ahmad Fauzi, S.E.',
                  role: 'DPC_MANAGER',
                  roleDesc: 'Ketua DPC Menteng (DKI Jakarta) & Kader Ranting',
                  badge: 'Kecamatan & Anggota',
                },
                {
                  id: 'ACC-002',
                  name: 'Siti Rahmawati, S.Sos.',
                  role: 'WING_MANAGER',
                  roleDesc: 'Koordinator DPW Pemuda Perindo (Sayap) & Evaluator Caleg',
                  badge: 'Sayap Otonom',
                },
                {
                  id: 'ACC-003',
                  name: 'Bambang Wijaya, S.Kom.',
                  role: 'TPS_WITNESS',
                  roleDesc: 'Saksi Mandat Resmi TPS 012 Kebon Sirih',
                  badge: 'Saksi TPS',
                },
                {
                  id: 'ACC-004',
                  name: 'Dr. Hendra Kusuma, M.Si.',
                  role: 'EXECUTIVE',
                  roleDesc: 'Pimpinan DPP — Command Center Nasional',
                  badge: 'Eksekutif DPP',
                },
                {
                  id: 'ACC-005',
                  name: 'Eko Prasetyo, S.H.',
                  role: 'TPS_VERIFIER',
                  roleDesc: 'Verifikator Berkas C1 Wilayah & Direktur LBH Perindo',
                  badge: 'Verifikator & Badan',
                },
                {
                  id: 'ACC-000',
                  name: 'Administrator Sistem Demo',
                  role: 'TECH_OPERATOR',
                  roleDesc: 'DPP Admin Nasional & Operator Teknis Audit',
                  badge: 'Admin & Reliability',
                },
              ].map((p) => {
                const isSelected = selectedAccountId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectAccount(p.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/50 shadow-2xs ring-1 ring-blue-400'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{p.name}</span>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                          {p.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{p.roleDesc}</div>
                    </div>
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 ml-2" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 ml-2" />
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
