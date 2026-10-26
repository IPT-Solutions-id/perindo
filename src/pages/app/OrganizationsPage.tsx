import React, { useState } from 'react';
import {
  Building2,
  ChevronRight,
  Shield,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Info,
  Users,
  FileText,
  Sliders,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_UNITS, MOCK_ORGANIZATIONS } from '../../data/mockData';
import { Unit } from '../../types';

interface OrganizationsPageProps {
  onOpenInspector: () => void;
}

export const OrganizationsPage: React.FC<OrganizationsPageProps> = ({ onOpenInspector }) => {
  const { workspace, checkUnitAccess } = useAuth();
  const [selectedUnit, setSelectedUnit] = useState<Unit>(MOCK_UNITS[3]); // Default DPC Menteng
  const [accessDeniedReason, setAccessDeniedReason] = useState<string | null>(null);

  const handleSelectUnit = (unit: Unit) => {
    const accessCheck = checkUnitAccess(unit.id);
    if (!accessCheck.allowed) {
      setAccessDeniedReason(accessCheck.reason || 'Akses ditolak.');
      setSelectedUnit(unit);
    } else {
      setAccessDeniedReason(null);
      setSelectedUnit(unit);
    }
  };

  const partyUnits = MOCK_UNITS.filter((u) => u.type === 'PARTY');
  const wingUnits = MOCK_UNITS.filter((u) => u.type === 'WING');
  const institutionUnits = MOCK_UNITS.filter((u) => u.type === 'INSTITUTION');

  return (
    <div className="space-y-6">
      {/* Page Header in Fresh Light Blue */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-white rounded-2xl border border-sky-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Tata Kelola Struktur ({workspace?.level} — {workspace?.unitName})
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Hierarki Struktur & Sayap Organisasi</h1>
          <p className="text-xs text-slate-600 mt-1">
            Menampilkan jenjang resmi DPP &rarr; DPW &rarr; DPD &rarr; DPC &rarr; DPRt serta organisasi sayap otonom.
          </p>
        </div>

        <button
          onClick={onOpenInspector}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-100 hover:bg-sky-200/80 text-sky-900 border border-sky-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5 text-sky-600" />
          <span>Uji Isolasi Wilayah di Inspector</span>
        </button>
      </div>

      {/* Cross-Region Test Notice Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Uji Coba Proteksi Lintas Wilayah (Cross-Region Demonstration):</span>
          <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
            Jika ruang kerja aktif Anda adalah <strong>{workspace?.unitName} ({workspace?.regionScopeLabel})</strong>, klik unit <strong>DPD Kota Bandung (Jawa Barat)</strong> di daftar bawah untuk menyaksikan penegakan batasan hak akses wilayah.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Organizational Tree Navigator */}
        <div className="lg:col-span-5 space-y-4">
          {/* Party Units (DKI & Jabar) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Struktur Partai Induk (DKI Jakarta & Jabar)
            </h2>

            <div className="space-y-1.5 text-xs">
              {partyUnits.map((u) => {
                const isSelected = selectedUnit?.id === u.id;
                const isCrossRegion = u.regionScope.province === 'Jawa Barat';
                return (
                  <button
                    key={u.id}
                    onClick={() => handleSelectUnit(u)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/60 font-semibold text-blue-900 ring-1 ring-blue-400'
                        : 'border-slate-100 bg-slate-50/70 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] bg-slate-200/80 px-1.5 py-0.5 rounded font-bold text-slate-700">
                          {u.level}
                        </span>
                        <span className="truncate">{u.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-normal">
                        Cakupan: {u.regionScope.province} {u.regionScope.regency ? `· ${u.regionScope.regency}` : ''}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isCrossRegion && (
                        <span className="text-[10px] text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded font-medium">
                          Uji Jabar
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wing & Institution */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              Sayap Otonom & Badan Fungsional
            </h2>

            <div className="space-y-1.5 text-xs">
              {[...wingUnits, ...institutionUnits].map((u) => {
                const isSelected = selectedUnit?.id === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => handleSelectUnit(u)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50/60 font-semibold text-purple-900 ring-1 ring-purple-400'
                        : 'border-slate-100 bg-slate-50/70 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded font-bold">
                          {u.type}
                        </span>
                        <span>{u.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-normal">
                        Hierarki Otonom Terpisah
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Unit Detail or Access Denied Card */}
        <div className="lg:col-span-7">
          {accessDeniedReason ? (
            <div className="bg-white rounded-2xl border-2 border-rose-300 p-8 shadow-sm space-y-5 text-center">
              <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl mx-auto flex items-center justify-center">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                  Akses Wilayah Ditolak (Cross-Region Restriction)
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Kewenangan Terbatas pada Wilayah Kerja SK Anda
                </h3>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-left text-xs text-rose-900 space-y-2">
                <div>
                  <strong>Alasan Penolakan:</strong>
                  <p className="text-[11px] mt-0.5 leading-relaxed">{accessDeniedReason}</p>
                </div>
                <div className="pt-2 border-t border-rose-200/60 text-[11px]">
                  <strong>Unit yang Dituju:</strong> {selectedUnit.name} ({selectedUnit.regionScope.province})
                  <br />
                  <strong>Unit Anda Saat Ini:</strong> {workspace?.unitName} ({workspace?.regionScopeLabel})
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Untuk menguji akses ke unit Jawa Barat, gunakan <strong>Demo Access Inspector</strong> dan ganti ke akun dengan peran nasional (contoh: DPP Admin atau Eksekutif).
              </p>

              <button
                onClick={onOpenInspector}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Buka Demo Inspector
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-sky-200 p-6 sm:p-8 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                      {selectedUnit.code}
                    </span>
                    <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                      SK AKTIF
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1.5">{selectedUnit.name}</h3>
                  <div className="text-xs text-sky-700 font-medium mt-0.5">Tingkat Struktur: {selectedUnit.level}</div>
                </div>

                <div className="text-right bg-sky-50 px-4 py-2 rounded-xl border border-sky-200/80">
                  <div className="text-2xl font-bold font-mono text-sky-900 tabular-nums">
                    {selectedUnit.totalMembers.toLocaleString('id-ID')}
                  </div>
                  <div className="text-[11px] text-sky-700 font-medium">Kader Terdata</div>
                </div>
              </div>

              {/* Unit Specifications */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-100">
                  <span className="text-sky-700 block text-[10px] uppercase font-semibold">Nomor SK Pengesahan</span>
                  <span className="font-mono font-semibold text-slate-900 block mt-1">{selectedUnit.skNumber}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Dikeluarkan oleh tingkat atasan</span>
                </div>

                <div className="p-3.5 bg-sky-50/60 rounded-xl border border-sky-100">
                  <span className="text-sky-700 block text-[10px] uppercase font-semibold">Cakupan Wilayah</span>
                  <span className="font-semibold text-slate-900 block mt-1">{selectedUnit.regionScope.province}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">
                    {selectedUnit.regionScope.regency || selectedUnit.regionScope.district || 'Lingkup Wilayah'}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sky-50/90 border border-sky-200 text-xs text-sky-950 space-y-2">
                <div className="font-semibold text-sky-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  Kewenangan Terverifikasi
                </div>
                <p className="text-[11px] leading-relaxed text-sky-900/90">
                  Unit ini berada dalam cakupan kepengurusan yang sah untuk ruang kerja Anda saat ini. Anda dapat mengelola program kerja, menerbitkan surat tugas kegiatan, dan meninjau keanggotaan subordinat.
                </p>
              </div>

              <div className="pt-2 border-t border-sky-100 flex items-center justify-between text-xs text-slate-500">
                <span>Status AD/ART:</span>
                <span className="font-mono text-[11px] text-sky-700 font-semibold">
                  AKTIF • TERINTEGRASI NASIONAL
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
