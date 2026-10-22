import React from 'react';
import {
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  RotateCcw,
  Check,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const ApprovalsPage: React.FC = () => {
  const { approvals, updateApprovalStatus } = useData();
  const { workspace } = useAuth();

  const isDppAdmin = workspace?.role === 'DPP_ADMIN' || workspace?.role === 'EXECUTIVE';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
            Pengesahan Dokumen & SK
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Verifikasi & Persetujuan DPP</h1>
          <p className="text-xs text-slate-500 mt-1">
            Arsip digital permohonan SK kepengurusan, surat tugas saksi, dan proposal anggaran wilayah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
            {approvals.length} Dokumen Terdaftar
          </span>
        </div>
      </div>

      {/* Mandatory Disclaimer Watermark Card */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Ketentuan Tata Kelola & Batasan Hukum AD/ART:</span>
          <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
            Sistem tidak menetapkan aturan mutlak AD/ART sendiri. Seluruh alur persetujuan yang berjalan di antarmuka ini berstatus{' '}
            <strong className="font-mono text-amber-900">SIMULASI • MENUNGGU VERIFIKASI DPP</strong> dan membutuhkan pengesahan pleno DPP definitif.
          </p>
        </div>
      </div>

      {/* Approvals Table / Card Stack */}
      <div className="space-y-4">
        {approvals.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                    {item.docNumber}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-2">{item.title}</h3>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full uppercase shrink-0 ${
                  item.status === 'DISETUJUI_DPP'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.status === 'DIKEMBALIKAN'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {item.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-900">Unit Pengusul:</span>
                <div className="text-slate-700 mt-0.5">{item.applicantUnit}</div>
              </div>
              <div>
                <span className="font-semibold text-slate-900">Tanggal Pengajuan:</span>
                <div className="text-slate-700 mt-0.5">{item.submittedDate}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-800 block text-[11px] mb-0.5">Catatan Verifikasi:</span>
              <p className="text-[11px] leading-relaxed">{item.notes}</p>
            </div>

            {/* Action Bar for Authorized Verifiers */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-slate-500 text-[11px]">
                Tingkat Otorisasi Tanda Tangan: <strong className="text-slate-700">{item.signatoryLevel}</strong>
              </div>

              <div className="flex items-center gap-2">
                {isDppAdmin ? (
                  <>
                    <button
                      onClick={() =>
                        updateApprovalStatus(
                          item.id,
                          'DISETUJUI_DPP',
                          'Telah diverifikasi dan disahkan oleh Pejabat Berwenang DPP Perindo (Simulasi).'
                        )
                      }
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Setujui SK (DPP)</span>
                    </button>
                    <button
                      onClick={() =>
                        updateApprovalStatus(
                          item.id,
                          'DIKEMBALIKAN',
                          'Berkas dikembalikan untuk perbaikan lampiran berita acara musyawarah.'
                        )
                      }
                      className="px-3 py-1.5 border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-lg font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Kembalikan Berkas</span>
                    </button>
                  </>
                ) : (
                  <span className="text-[11px] text-slate-400 italic">
                    Hanya DPP_ADMIN yang berwenang mengeksekusi pengesahan SK.
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
