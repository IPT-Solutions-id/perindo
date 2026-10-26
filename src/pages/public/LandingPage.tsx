import {
  Users,
  ShieldCheck,
  Building2,
  FileCheck,
  Vote,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

interface LandingPageProps {
  onNavigate: (path: string) => void;
  onOpenInspector: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenInspector }) => {
  const { account, loginAs } = useAuth();

  return (
    <div className="bg-[#F5F7FB] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-200 bg-gradient-to-b from-white via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold text-[#102C63] bg-blue-50/90 border border-[#1667C7]/20 px-3.5 py-1.5 rounded-full shadow-2xs hover:shadow-xs transition-shadow">
                <img src="/assets/logo_symbol.png" alt="Emblem Perindo" className="w-5 h-auto object-contain" />
                <span className="font-bold text-[#102C63]">PARTAI PERSATUAN INDONESIA</span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-medium">Portal Tata Kelola Terpadu</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#102C63] tracking-tight leading-[1.15]">
                Satu Sistem Terpadu untuk Seluruh Jenjang Organisasi <span className="text-[#D7283F]">Perindo</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                Kelola hierarki kepengurusan mulai dari DPP hingga DPRt, eksekusi program ekonomi kerakyatan & UMKM,
                terbitkan KTA digital kader resmi, dan pantau kesiapan saksi TPS secara terkoordinasi dalam satu platform aman.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {account ? (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate('/app/overview')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#102C63] hover:bg-[#D7283F] text-white rounded-xl text-sm font-semibold shadow-md shadow-[#102C63]/15 transition-colors cursor-pointer"
                  >
                    <span>Masuk ke Dashboard ({account.workspaces[0]?.roleTitle})</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onNavigate('/login')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#102C63] hover:bg-[#D7283F] text-white rounded-xl text-sm font-semibold shadow-md shadow-[#102C63]/15 transition-colors cursor-pointer"
                  >
                    <span>Masuk ke Portal Resmi</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('/fitur')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-[#102C63] rounded-xl text-sm font-semibold border border-slate-300 shadow-2xs transition-all hover:border-[#102C63] cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#1667C7]" />
                  <span>Pelajari Fitur Sistem</span>
                </motion.button>
              </div>

              {/* Bullet Highlights */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1667C7] shrink-0" />
                  <span>Hierarki DPP, DPW, DPD, DPC, DPRt</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1667C7] shrink-0" />
                  <span>Isolasi Wilayah Ketat (Cross-Region Protection)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1667C7] shrink-0" />
                  <span>Dukungan Sayap Otonom & Badan Advokasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1667C7] shrink-0" />
                  <span>Manajemen Saksi TPS & Form C1 Plano</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive Quick Access Portal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
              className="lg:col-span-5"
            >
              <div className="bg-[#0e1f42] text-white rounded-2xl p-6 shadow-2xl border border-[#1a3875] border-t-4 border-t-[#D7283F] space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Akses Cepat Pengurus & Kader
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-300 font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">PORTAL AKTIF</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Pilih salah satu figur pengurus untuk langsung mengakses ruang kerja operasional sesuai surat keputusan (SK):
                </p>


                <div className="space-y-2.5">
                  {[
                    {
                      accId: 'ACC-001',
                      name: 'Ahmad Fauzi, S.E.',
                      role: 'DPC_MANAGER',
                      roleLabel: 'Ketua DPC Menteng (DKI Jakarta)',
                      desc: 'Akses tingkat kecamatan & subordinat ranting',
                    },
                    {
                      accId: 'ACC-002',
                      name: 'Siti Rahmawati, S.Sos.',
                      role: 'WING_MANAGER',
                      roleLabel: 'Pengurus DPW Pemuda Perindo (Sayap)',
                      desc: 'Struktur otonom sayap kepemudaan',
                    },
                    {
                      accId: 'ACC-003',
                      name: 'Bambang Wijaya, S.Kom.',
                      role: 'TPS_WITNESS',
                      roleLabel: 'Saksi Mandat TPS 012 Kebon Sirih',
                      desc: 'Form pelaporan C1 dan insiden TPS',
                    },
                    {
                      accId: 'ACC-004',
                      name: 'Dr. Hendra Kusuma, M.Si.',
                      role: 'EXECUTIVE',
                      roleLabel: 'DPP Command Center Eksekutif',
                      desc: 'Agregat metrik nasional tanpa data PII',
                    },
                  ].map((persona) => (
                    <motion.button
                      key={persona.accId}
                      whileHover={{ scale: 1.015, x: 2 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => {
                        loginAs(persona.accId);
                        onNavigate('/app/overview');
                      }}
                      className="w-full text-left p-3 rounded-xl bg-[#142854] hover:bg-[#1b356e] border border-white/10 hover:border-[#D7283F] transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                          {persona.name}
                        </div>
                        <div className="text-[11px] text-sky-300 font-medium">
                          {persona.roleLabel}
                        </div>
                        <div className="text-[10px] text-slate-400">{persona.desc}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#D7283F] transition-colors shrink-0 ml-2" />
                    </motion.button>
                  ))}
                </div>

                <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-white/10">
                  <span>Atau gunakan form masuk demo:</span>
                  <button
                    onClick={() => onNavigate('/login')}
                    className="text-sky-300 hover:text-white hover:underline font-semibold cursor-pointer"
                  >
                    Buka Halaman Login &rarr;
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* KPI & Stat Proof Strip */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#102C63] font-mono tabular-nums">
                5 Tingkat
              </div>
              <div className="text-xs text-slate-600 mt-1 font-medium">
                DPP · DPW · DPD · DPC · DPRt
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#D7283F] font-mono tabular-nums">
                12 Peran
              </div>
              <div className="text-xs text-slate-600 mt-1 font-medium">
                Matriks Hak Akses (RBAC) Ketat
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#1667C7] font-mono tabular-nums">
                100% Mock
              </div>
              <div className="text-xs text-slate-600 mt-1 font-medium">
                Data Sintetis & Aman Privasi
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                1 Platform
              </div>
              <div className="text-xs text-slate-600 mt-1 font-medium">
                Manajemen Terpusat & Sinkron
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Arsitektur Tata Kelola & Modul Fungsional
          </h2>
          <p className="text-sm text-slate-600">
            Didesain khusus untuk memenuhi kebutuhan organisasi modern, akuntabilitas anggaran,
            perlindungan data anggota, dan pembinaan kewilayahan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Hierarki Organisasi & Otonomi Sayap
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Memisahkan struktur partai reguler (DPP hingga DPRt) dengan organisasi sayap (Pemuda, Wanita)
              dan badan fungsional (LBH, Rescue). Tidak ada kebocoran wewenang lintas sayap.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/fitur')}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1"
              >
                <span>Pelajari Struktur</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Program Kerja & Penguatan UMKM
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pencatatan realisasi kegiatan gerobak usaha, pelatihan vokasi pemuda, baksos kesehatan,
              serta pengawasan penyerapan anggaran dengan status verifikasi DPP.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/fitur')}
                className="text-xs font-semibold text-rose-700 hover:text-rose-900 inline-flex items-center gap-1"
              >
                <span>Lihat Modul Program</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
              <Vote className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Pelaporan Saksi TPS Mandiri (Simulasi)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Penugasan saksi per TPS dengan surat mandat SK, input angka kehadiran dan perolehan suara
              dari form C1 plano, verifikasi ganda tanpa menghubungkan hasil resmi pemilu.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/fitur')}
                className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1"
              >
                <span>Alur Saksi & Verifikator</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy and Boundaries Callout */}
      <section className="bg-[#102C63] text-white py-12 relative overflow-hidden border-t-4 border-[#D7283F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs text-rose-300 font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-[#D7283F]" />
                Standar Etika & Kepatuhan Simulasi
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Batas Penggunaan Data & Netralitas Sistem
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Aplikasi ini tidak memuat data pemilih riil (DPT resmi KPU), tidak melakukan microtargeting pemilih,
                dan tidak menerbitkan sertifikat persetujuan AD/ART final. Seluruh alur persetujuan ditandai{' '}
                <span className="text-amber-300 font-mono font-semibold">SIMULASI • MENUNGGU VERIFIKASI DPP</span>.
              </p>
            </div>

            <div className="shrink-0 flex gap-3">
              <button
                onClick={() => onNavigate('/privasi')}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium border border-white/20 transition-colors"
              >
                Baca Kebijakan Privasi
              </button>
              <button
                onClick={() => onNavigate('/login')}
                className="px-5 py-2.5 bg-[#D7283F] hover:bg-[#b81d31] text-white rounded-xl text-xs font-semibold transition-colors shadow-md shadow-[#D7283F]/30"
              >
                Masuk Demo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
