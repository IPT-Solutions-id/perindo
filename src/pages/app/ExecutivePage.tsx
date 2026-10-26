import React from 'react';
import {
  BarChart3,
  Users,
  Building2,
  TrendingUp,
  Vote,
  ShieldCheck,
  Lock,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export const ExecutivePage: React.FC = () => {
  const { workspace, person } = useAuth();
  const { programs } = useData();

  return (
    <div className="space-y-6">
      {/* Header in Fresh Light Blue */}
      <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-300"></span>
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-sky-100">
              PUSAT KOMANDO DPP NASIONAL (COMMAND CENTER)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Pemantauan Kesiapan & Operasi Struktur Partai
          </h1>
          <p className="text-xs text-sky-50 mt-1">
            Data statistik makro diolah dari seluruh struktur DPW dan DPD tanpa mengekspos identitas pribadi (PII) perseorangan kader.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-white/15 backdrop-blur-2xs border border-white/30 px-3.5 py-2 rounded-xl text-right">
            <div className="text-[10px] text-sky-100 uppercase font-mono">Status Sistem</div>
            <div className="text-xs font-bold text-white font-mono">SINKRONISASI 100%</div>
          </div>
        </div>
      </div>

      {/* Privacy Guarantee Banner */}
      <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-sky-600 shrink-0" />
          <span>
            <strong>Prinsip Privacy by Design:</strong> Dashboard eksekutif hanya menyajikan angka rekapitulasi, rasio pemenuhan struktur, dan realisasi anggaran. Identitas pribadi kader dilindungi dari pelacakan sepihak.
          </span>
        </div>
      </div>

      {/* Aggregate Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-200 shadow-2xs">
          <div className="flex items-center justify-between text-sky-800 mb-2">
            <span className="text-xs font-semibold">Total Kader Nasional</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">42.500</div>
          <div className="text-[11px] text-emerald-600 mt-1 font-medium">+1.850 bulan berjalan</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Pemenuhan DPD (Kab/Kota)</span>
            <Building2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-black text-blue-700 font-mono tabular-nums">94.2%</div>
          <div className="text-[11px] text-slate-500 mt-1">484 dari 514 Kab/Kota</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Realisasi Program UMKM</span>
            <TrendingUp className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono tabular-nums">Rp174.9 Jt</div>
          <div className="text-[11px] text-slate-500 mt-1">Gerobak & Modal Rakyat</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Kesiapan Jaringan TPS</span>
            <Vote className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-purple-700 font-mono tabular-nums">88.5%</div>
          <div className="text-[11px] text-slate-500 mt-1">Plot Saksi Terkonfirmasi</div>
        </div>
      </div>

      {/* Provincial Readiness Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="font-bold text-base text-slate-900">
            Kesiapan Struktur per Wilayah Prioritas
          </h2>
          <span className="text-xs text-slate-500 font-mono">Tahun Anggaran 2025</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Wilayah DPW</th>
                <th className="py-3 px-4">Kader Aktif</th>
                <th className="py-3 px-4">Kelengkapan DPC</th>
                <th className="py-3 px-4">Penyerapan Program</th>
                <th className="py-3 px-4">Indeks Kesiapan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-sans font-bold text-slate-900">DKI Jakarta</td>
                <td className="py-3 px-4 tabular-nums">8.420</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">100% (44 Kec)</td>
                <td className="py-3 px-4">Rp140.900.000</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    SANGAT SIAP (98%)
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-sans font-bold text-slate-900">Jawa Barat</td>
                <td className="py-3 px-4 tabular-nums">14.200</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">91.4% (572 Kec)</td>
                <td className="py-3 px-4">Rp215.400.000</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                    SIAP (92%)
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-sans font-bold text-slate-900">Jawa Tengah</td>
                <td className="py-3 px-4 tabular-nums">11.800</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">88.2% (508 Kec)</td>
                <td className="py-3 px-4">Rp180.200.000</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                    SIAP (89%)
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="py-3 px-4 font-sans font-bold text-slate-900">Jawa Timur</td>
                <td className="py-3 px-4 tabular-nums">12.100</td>
                <td className="py-3 px-4 text-emerald-700 font-semibold">89.6% (597 Kec)</td>
                <td className="py-3 px-4">Rp195.000.000</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                    SIAP (90%)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
