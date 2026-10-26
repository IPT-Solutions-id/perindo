import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  RotateCcw,
  Check,
  Plus,
  X,
  Crown,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { ApprovalItem } from '../../types';

export const ApprovalsPage: React.FC = () => {
  const { approvals, updateApprovalStatus, createApprovalRequest } = useData();
  const { workspace, person } = useAuth();

  const role = workspace?.role || 'MEMBER';
  const isKetum = role === 'KETUA_UMUM';
  const isDpp = role === 'DPP_ADMIN' || role === 'EXECUTIVE';
  const isDpwOrDpd = role === 'DPW_MANAGER' || role === 'DPD_MANAGER';

  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ApprovalItem['type']>('SK_PENGURUS');
  const [signatoryLevel, setSignatoryLevel] = useState<ApprovalItem['signatoryLevel']>('DPP');
  const [notes, setNotes] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    createApprovalRequest({
      title,
      applicantUnit: workspace?.unitName || 'DPC Menteng',
      unitId: workspace?.unitId || 'UNIT-DPC-MENTENG',
      type,
      signatoryLevel,
      notes:
        notes ||
        `Diajukan oleh ${person?.name} (${workspace?.roleTitle}) untuk verifikasi berjenjang.`,
    });

    setIsSubmitModalOpen(false);
    setTitle('');
    setNotes('');
  };

  const getBadgeStyle = (status: ApprovalItem['status']) => {
    switch (status) {
      case 'DISAHKAN_KETUA_UMUM':
        return 'bg-amber-100 text-amber-900 border border-amber-300';
      case 'DISETUJUI_DPP':
        return 'bg-emerald-100 text-emerald-800';
      case 'MENUNGGU_VERIFIKASI_DPP':
        return 'bg-blue-100 text-blue-800';
      case 'MENUNGGU_REKOMENDASI_WILAYAH':
        return 'bg-purple-100 text-purple-800';
      case 'DIKEMBALIKAN':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header in Fresh Light Blue */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-white rounded-2xl border border-sky-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Alur Pengesahan Berjenjang (DPRt &rarr; DPC &rarr; DPD &rarr; DPW &rarr; DPP &rarr; Ketua Umum)
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Verifikasi & Pengesahan SK / Anggaran
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Pengajuan dari tingkat bawah direkomendasikan oleh DPD/DPW, diverifikasi DPP, dan disahkan definitif oleh Ketua Umum.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajukan SK / Proposal Baru</span>
          </button>
        </div>
      </div>

      {/* Multi-Tier Stepper Legend */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200">
            <div className="font-mono text-[10px] font-bold text-purple-800">TAHAP 1 · WILAYAH</div>
            <div className="font-bold text-slate-900 mt-0.5">Rekomendasi DPD / DPW</div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Pemeriksaan kelengkapan berkas usulan DPRt / DPC.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
            <div className="font-mono text-[10px] font-bold text-blue-800">TAHAP 2 · PUSAT</div>
            <div className="font-bold text-slate-900 mt-0.5">Verifikasi Sekjen DPP</div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Validasi kuorum AD/ART dan kelayakan anggaran.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <div className="font-mono text-[10px] font-bold text-emerald-800">TAHAP 3 · PERSETUJUAN DPP</div>
            <div className="font-bold text-slate-900 mt-0.5">Disetujui Pengurus DPP</div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Nomor registrasi SK diterbitkan untuk meja Ketua Umum.
            </div>
          </div>
          <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-300">
            <div className="font-mono text-[10px] font-bold text-amber-900">TAHAP 4 · FINAL</div>
            <div className="font-bold text-slate-900 mt-0.5">Pengesahan Ketua Umum</div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Keputusan inkrah dan berlaku mengikat secara nasional.
            </div>
          </div>
        </div>
      </div>

      {/* Approvals Card Stack */}
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
                className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase shrink-0 ${getBadgeStyle(
                  item.status
                )}`}
              >
                {item.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
              <div>
                <span className="font-semibold text-slate-900">Unit Pengusul:</span>
                <div className="text-slate-700 mt-0.5">{item.applicantUnit}</div>
              </div>
              <div>
                <span className="font-semibold text-slate-900">Tanggal Pengajuan:</span>
                <div className="text-slate-700 mt-0.5">{item.submittedDate}</div>
              </div>
              <div>
                <span className="font-semibold text-slate-900">Pejabat Pengesah:</span>
                <div className="text-slate-700 mt-0.5">{item.signatoryLevel}</div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
              <span className="font-semibold text-slate-800 block text-[11px] mb-0.5">
                Riwayat & Catatan Verifikasi Berjenjang:
              </span>
              <p className="text-[11px] leading-relaxed">{item.notes}</p>
            </div>

            {/* Tiered Action Bar */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="text-slate-500 text-[11px]">
                Peran Anda Saat Ini:{' '}
                <strong className="text-slate-800">
                  {workspace?.roleTitle} ({workspace?.level})
                </strong>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Step 1: DPD / DPW Recommendation */}
                {(isDpwOrDpd || isDpp || isKetum) &&
                  item.status === 'MENUNGGU_REKOMENDASI_WILAYAH' && (
                    <button
                      onClick={() =>
                        updateApprovalStatus(
                          item.id,
                          'MENUNGGU_VERIFIKASI_DPP',
                          `Direkomendasikan oleh ${person?.name} (${workspace?.unitName}) untuk diteruskan ke meja Sekjen DPP.`
                        )
                      }
                      className="px-3.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>Teruskan Rekomendasi ke DPP</span>
                    </button>
                  )}

                {/* Step 2: DPP Verification */}
                {(isDpp || isKetum) &&
                  (item.status === 'MENUNGGU_VERIFIKASI_DPP' ||
                    item.status === 'MENUNGGU_REKOMENDASI_WILAYAH') && (
                    <button
                      onClick={() =>
                        updateApprovalStatus(
                          item.id,
                          'DISETUJUI_DPP',
                          `Diverifikasi dan disetujui oleh DPP (${person?.name}). Menunggu tanda tangan pengesahan Ketua Umum.`
                        )
                      }
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Setujui Verifikasi DPP</span>
                    </button>
                  )}

                {/* Step 3: Ketua Umum Final Sign-Off */}
                {isKetum && item.status !== 'DISAHKAN_KETUA_UMUM' && (
                  <button
                    onClick={() =>
                      updateApprovalStatus(
                        item.id,
                        'DISAHKAN_KETUA_UMUM',
                        `SK / Anggaran disahkan secara definitif oleh Ketua Umum Partai Perindo (${person?.name}).`
                      )
                    }
                    className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-200" />
                    <span>Sahkan Definitif (Ketua Umum)</span>
                  </button>
                )}

                {/* Return for Revision */}
                {(isKetum || isDpp || isDpwOrDpd) &&
                  item.status !== 'DISAHKAN_KETUA_UMUM' &&
                  item.status !== 'DIKEMBALIKAN' && (
                    <button
                      onClick={() =>
                        updateApprovalStatus(
                          item.id,
                          'DIKEMBALIKAN',
                          `Berkas dikembalikan oleh ${person?.name} (${workspace?.roleTitle}) untuk dilengkapi berita acara musyawarah.`
                        )
                      }
                      className="px-3 py-1.5 border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Kembalikan Berkas</span>
                    </button>
                  )}

                {item.status === 'DISAHKAN_KETUA_UMUM' && (
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                    <ShieldCheck className="w-4 h-4" />
                    Telah Berkekuatan Hukum Tetap (Inkrah)
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit New Approval Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-sky-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-sky-200 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Ajukan Permohonan SK / Anggaran Berjenjang
              </span>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="text-sky-100 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Judul Dokumen Permohonan <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Pengesahan Susunan Pengurus DPRt Kelurahan Cikini"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Jenis Dokumen
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ApprovalItem['type'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                  >
                    <option value="SK_PENGURUS">SK Kepengurusan Struktur</option>
                    <option value="PROPOSAL_ANGGARAN">Proposal Pencairan Anggaran</option>
                    <option value="SURAT_TUGAS">Surat Tugas / Mandat Saksi</option>
                    <option value="PERMOHONAN_KTA">Permohonan KTA Kolektif</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Otoritas Pengesah Akhir
                  </label>
                  <select
                    value={signatoryLevel}
                    onChange={(e) =>
                      setSignatoryLevel(e.target.value as ApprovalItem['signatoryLevel'])
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                  >
                    <option value="DPP">Ketua Umum & DPP Pusat</option>
                    <option value="DPW">Ketua DPW Provinsi</option>
                    <option value="DPD">Ketua DPD Kabupaten/Kota</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Keterangan & Berita Acara Pengantar
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tuliskan ringkasan hasil rapat pleno atau rincian kebutuhan..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                >
                  Kirim Pengajuan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
