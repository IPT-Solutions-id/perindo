import React from 'react';
import { Shield, Lock, EyeOff, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = () => {
  return (
    <div className="bg-[#F5F7FB] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-5">
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md font-mono">
              STANDAR DATA SIMULASI & PRIVASI PROTOTIPE
            </span>
            <h1 className="text-2xl font-bold text-slate-900 mt-2">
              Kebijakan Privasi, Batasan Data, dan Netralitas Sistem
            </h1>
            <p className="text-xs text-slate-500">
              Terakhir diperbarui: 2025 · Versi Prototipe Internal Web
            </p>
          </div>

          <div className="space-y-6 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                1. Prinsip Nol Data Riil (Zero Real PII)
              </h2>
              <p>
                Platform PERINDO ONE dalam fase build ini sepenuhnya beroperasi menggunakan <strong>data sintetis tiruan</strong>.
                Sistem tidak menghubungkan atau meminta Nomor Induk Kependudukan (NIK) asli, foto KTP, riwayat pemilih perorangan,
                maupun data rahasia perbankan/keuangan kader. Semua nomor KTA dan identitas pengurus yang tampil merupakan data uji (contoh: DEMO-001).
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-indigo-600" />
                2. Pemisahan Peran Teknis & Eksekutif (Privacy by Design)
              </h2>
              <p>
                Guna mematuhi standar perlindungan data pribadi dan tata kelola korporat yang baik:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600">
                <li>
                  <strong>TECH_OPERATOR (Operator Sistem):</strong> Hanya dapat mengamati metrik kesehatan server, latensi, dan log audit. Tidak memiliki izin membaca nama, alamat, atau identitas perseorangan kader.
                </li>
                <li>
                  <strong>EXECUTIVE (Pimpinan Pusat):</strong> Mengamati dashboard Command Center dengan agregat statistik nasional tanpa eksposur identitas personal (PII mentah) tingkat ranting.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                3. Pembatasan Persuasi & Microtargeting Politik
              </h2>
              <p>
                Platform ini strictly <strong>bukan sistem persuasi politik tertarget atau kampanye mikro</strong>.
                Tidak terdapat modul skor pengaruh pemilih (voter influence scoring), pelacakan preferensi pemilih rahasia,
                atau pengiriman pesan otomatis massal kepada warga non-anggota.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                4. Batasan Hukum Pemilu & AD/ART
              </h2>
              <p>
                Modul pelaporan TPS adalah simulasi koordinasi saksi internal partai untuk menguji mekanisme pembacaan C1 plano.
                Data di dalamnya tidak mewakili dan tidak menggantikan rekapitulasi resmi Komisi Pemilihan Umum (KPU).
                Seluruh kebijakan pengesahan SK berstatus <strong>SIMULASI • MENUNGGU VERIFIKASI DPP</strong>.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Kepatuhan terhadap tata kelola privasi sistem informasi organisasi.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
