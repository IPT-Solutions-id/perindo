import React, { useState } from 'react';
import {
  Users,
  Shield,
  Layers,
  Vote,
  FileText,
  Activity,
  HeartHandshake,
  CheckCircle2,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface FeaturesPageProps {
  onNavigate: (path: string) => void;
  onOpenInspector: () => void;
}

export const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate, onOpenInspector }) => {
  const [activeSection, setActiveSection] = useState<'hierarchy' | 'roles' | 'security' | 'tps'>('hierarchy');

  return (
    <div className="bg-[#F5F7FB] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Header */}
        <div className="max-w-3xl space-y-2">
          <div className="text-xs font-semibold text-blue-800 uppercase tracking-wider">
            Fitur & Tata Kelola
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Kemampuan Platform Organisasi PERINDO ONE
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Eksplorasi modul sistem administrasi partai, struktur kewenangan bertingkat, batasan privasi data kader,
            serta tata kelola sayap dan lembaga fungsional.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-medium">
          {[
            { id: 'hierarchy', label: 'Hierarki Kepengurusan (DPP - DPRt)' },
            { id: 'roles', label: '12 Matriks Peran (RBAC)' },
            { id: 'security', label: 'Isolasi Wilayah & Privasi Data' },
            { id: 'tps', label: 'Pelaporan Saksi & Verifikasi C1' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                activeSection === tab.id
                  ? 'bg-[#102C63] text-white shadow-2xs font-semibold'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Hierarchy */}
        {activeSection === 'hierarchy' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Pohon Struktur Organisasi Bertingkat
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Platform memodelkan struktur partai sesuai tata tertib organisasi berjenjang. Setiap pengurus memiliki
                surat keputusan (SK) aktif dengan masa bakti yang tercatat dan terikat pada wilayah tertentu:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
                {[
                  { level: 'DPP', name: 'Dewan Pimpinan Pusat', scope: 'Nasional / Seluruh Wilayah' },
                  { level: 'DPW', name: 'Dewan Pimpinan Wilayah', scope: 'Tingkat Provinsi' },
                  { level: 'DPD', name: 'Dewan Pimpinan Daerah', scope: 'Tingkat Kabupaten / Kota' },
                  { level: 'DPC', name: 'Dewan Pimpinan Cabang', scope: 'Tingkat Kecamatan' },
                  { level: 'DPRt', name: 'Dewan Pimpinan Ranting', scope: 'Tingkat Kelurahan / Desa' },
                ].map((item) => (
                  <div key={item.level} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <span className="font-mono text-sm font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {item.level}
                    </span>
                    <h3 className="font-semibold text-xs text-slate-900 mt-2">{item.name}</h3>
                    <p className="text-[11px] text-slate-500 mt-1">{item.scope}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-blue-900">Dukungan Sayap & Lembaga Fungsional:</div>
                <p>
                  Organisasi Sayap (contoh: <strong>Pemuda Perindo</strong>, Kartini Perindo) dan Badan Otonom (contoh: <strong>LBH Perindo</strong>)
                  memiliki pohon keanggotaan dan program sendiri tanpa mencampuri wewenang administratif partai induk di wilayah.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Roles (RBAC) */}
        {activeSection === 'roles' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              12 Peran dengan Kewenangan Terisolasi (RBAC)
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Setiap pengguna hanya melihat modul yang relevan dengan tanggung jawab penugasan resminya:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 text-xs">
              {[
                { role: 'MEMBER', title: 'Kader Umum', desc: 'Akses KTA digital, pendaftaran kegiatan, dan tiket aspirasi.' },
                { role: 'DPRT_MANAGER', title: 'Pengurus Ranting (Desa)', desc: 'Kegiatan tingkat kelurahan dan koordinasi saksi TPS.' },
                { role: 'DPC_MANAGER', title: 'Pengurus Cabang (Kecamatan)', desc: 'Program kerja kecamatan dan supervisi ranting bawahan.' },
                { role: 'DPD_MANAGER', title: 'Pengurus Daerah (Kota/Kab)', desc: 'Pengelolaan struktur kab/kota dan rekapitulasi daerah.' },
                { role: 'DPW_MANAGER', title: 'Pengurus Wilayah (Provinsi)', desc: 'Koordinasi lintas DPD dan kebijakan tingkat provinsi.' },
                { role: 'DPP_ADMIN', title: 'Admin DPP Nasional', desc: 'Pengesahan SK kepengurusan dan manajemen kebijakan nasional.' },
                { role: 'WING_MANAGER', title: 'Koordinator Sayap', desc: 'Program kaderisasi kepemudaan dalam pohon sayap otonom.' },
                { role: 'INSTITUTION_MANAGER', title: 'Direktur Badan (LBH)', desc: 'Advokasi hukum masyarakat dan penanganan sengketa.' },
                { role: 'TPS_WITNESS', title: 'Saksi Mandat TPS', desc: 'Pelaporan suara TPS dan pengunggahan formulir C1 plano.' },
                { role: 'TPS_VERIFIER', title: 'Verifikator Berkas TPS', desc: 'Validasi independen atas data yang dikirimkan saksi.' },
                { role: 'CANDIDATE_EVALUATOR', title: 'Penilai Seleksi Caleg', desc: 'Penilaian rubrik integritas dan kapabilitas bakal calon.' },
                { role: 'EXECUTIVE', title: 'Command Center Eksekutif', desc: 'Agregat metrik strategis nasional tanpa akses data PII mentah.' },
              ].map((r) => (
                <div key={r.role} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div className="font-mono text-[10px] text-blue-700 font-semibold">{r.role}</div>
                  <div className="font-bold text-slate-900 mt-0.5">{r.title}</div>
                  <div className="text-slate-600 text-[11px] mt-1">{r.desc}</div>
                </div>
              ))}
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenInspector}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Buka Demo Inspector untuk Menguji Peran</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Security & Isolation */}
        {activeSection === 'security' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Isolasi Wilayah & Privasi Data Terjamin
            </h2>
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Platform menerapkan aturan <strong>Boundary Isolation</strong>: Pengurus DPC di wilayah Jakarta (contoh: DPC Menteng)
                secara otomatis ditolak saat mencoba membuka arsip administratif pengurus di Jawa Barat (contoh: DPD Kota Bandung).
              </p>
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1.5 text-rose-900">
                <div className="font-bold flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-rose-700" />
                  Perlindungan Privasi Kader (Privacy by Design)
                </div>
                <p className="text-[11px] leading-relaxed">
                  Dalam prototipe ini, tidak ada NIK atau KTP riil yang disimpan. Data nama dan ID kader bersifat sintetis (contoh: DEMO-001).
                  Peran Technical Operator dan Executive secara ketat dibatasi sehingga tidak dapat melihat data identitas perseorangan kader.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: TPS Witness */}
        {activeSection === 'tps' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Pelaporan Saksi TPS & Form C1 Plano
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Simulasi alur berjenjang pemantauan pemungutan suara di tingkat TPS:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">1</div>
                <div className="font-bold text-slate-900">Mandat & SK Saksi</div>
                <p className="text-slate-600 text-[11px]">Saksi resmi ditugaskan ke TPS spesifik (contoh: TPS 012 Kebon Sirih).</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">2</div>
                <div className="font-bold text-slate-900">Input Data C1 Plano</div>
                <p className="text-slate-600 text-[11px]">Saksi menginput angka perolehan suara sah, tidak sah, dan suara partai disertai catatan insiden.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">3</div>
                <div className="font-bold text-slate-900">Verifikasi Independen</div>
                <p className="text-slate-600 text-[11px]">Tim Verifikator memeriksa kesesuaian angka sebelum disetujui ke agregat laporan wilayah.</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick CTA */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base">Siap Menjelajahi Aplikasi?</h3>
            <p className="text-xs text-slate-400">Masuk sebagai salah satu pengurus demo untuk melihat alur kerja lengkap.</p>
          </div>
          <button
            onClick={() => onNavigate('/login')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold whitespace-nowrap transition-colors"
          >
            Masuk Portal Demo &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};
