import React, { useState } from 'react';
import {
  Vote,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Check,
  RotateCcw,
  Camera,
  X,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { PollingStation, TpsSubmission } from '../../types';

export const ElectionsPage: React.FC = () => {
  const { pollingStations, tpsSubmissions, submitTpsReport, verifyTpsSubmission } = useData();
  const { workspace, person } = useAuth();

  const isWitness = workspace?.role === 'TPS_WITNESS';
  const isVerifier = workspace?.role === 'TPS_VERIFIER' || workspace?.role === 'DPP_ADMIN';

  const [activeTab, setActiveTab] = useState<'stations' | 'submissions'>('stations');
  const [selectedTpsForReport, setSelectedTpsForReport] = useState<PollingStation | null>(null);

  // Witness Report Form
  const [votersPresent, setVotersPresent] = useState(230);
  const [validVotes, setValidVotes] = useState(226);
  const [invalidVotes, setInvalidVotes] = useState(4);
  const [partyVotes, setPartyVotes] = useState(48);
  const [reportNotes, setReportNotes] = useState('Proses penghitungan berjalan tertib dan aman disaksikan saksi partai lain.');

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTpsForReport) return;

    submitTpsReport({
      tpsId: selectedTpsForReport.id,
      tpsCode: `${selectedTpsForReport.code} ${selectedTpsForReport.village}`,
      witnessName: person?.name || 'Saksi Mandat Resmi',
      totalVotersPresent: Number(votersPresent),
      validVotes: Number(validVotes),
      invalidVotes: Number(invalidVotes),
      partyVotes: Number(partyVotes),
      presidentialVoteA: Math.round(validVotes * 0.4),
      presidentialVoteB: Math.round(validVotes * 0.45),
      presidentialVoteC: Math.round(validVotes * 0.15),
      c1DocumentUploaded: true,
      notes: reportNotes,
    });

    setSelectedTpsForReport(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header in Fresh Light Blue */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-white rounded-2xl border border-sky-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Koordinasi Saksi & Rekapitulasi C1 Plano ({workspace?.level} — {workspace?.unitName})
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Pemantauan TPS & Rekapitulasi Berkas</h1>
          <p className="text-xs text-slate-600 mt-1">
            Pelaporan data suara saksi internal partai terkoordinasi untuk pengawalan suara di TPS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-sky-800 bg-sky-100 border border-sky-200 px-3 py-1.5 rounded-xl">
            {pollingStations.length} TPS Terpetakan
          </span>
        </div>
      </div>

      {/* Official Tabulation Notice */}
      <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Instrumen Tabulasi Internal Saksi Partai:</span>
          <p className="text-[11px] text-sky-900/80 mt-0.5 leading-relaxed">
            Modul ini dipergunakan oleh saksi mandat resmi dan verifikator wilayah Partai Perindo untuk pencatatan C1 plano dan pengawalan suara berjenjang. Penetapan rekapitulasi resmi pemilu secara hukum mengacu pada pleno Komisi Pemilihan Umum (KPU).
          </p>
        </div>
      </div>


      {/* Segmented Controls */}
      <div className="flex items-center gap-2 border-b border-sky-200 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('stations')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'stations'
              ? 'bg-sky-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:text-sky-900 border border-sky-200'
          }`}
        >
          Daftar TPS & Mandat Saksi
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'submissions'
              ? 'bg-sky-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:text-sky-900 border border-sky-200'
          }`}
        >
          Laporan C1 Masuk ({tpsSubmissions.length})
        </button>
      </div>

      {/* Tab 1: Polling Stations */}
      {activeTab === 'stations' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pollingStations.map((tps) => {
              const submission = tpsSubmissions.find((s) => s.tpsId === tps.id);
              return (
                <div
                  key={tps.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {tps.code}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          tps.status === 'TERVERIFIKASI'
                            ? 'bg-emerald-100 text-emerald-800'
                            : tps.status === 'PROSES_VERIFIKASI'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {tps.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <div>
                      <div className="font-bold text-sm text-slate-900">
                        {tps.village}, {tps.district}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        DPT: {tps.dptTotal} Pemilih Terdaftar
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                      <div className="text-slate-500 text-[10px] uppercase font-semibold">
                        Saksi Bertugas
                      </div>
                      <div className="font-semibold text-slate-800">
                        {tps.assignedWitnessName || 'Belum Ditugaskan'}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {tps.assignedWitnessPhone}
                      </div>
                    </div>

                    {submission && (
                      <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-xs space-y-1">
                        <div className="text-blue-900 font-semibold text-[11px]">
                          Data C1 Terinput:
                        </div>
                        <div className="flex justify-between text-slate-700 font-mono text-[11px]">
                          <span>Suara Partai Perindo:</span>
                          <strong>{submission.partyVotes} Suara</strong>
                        </div>
                        <div className="flex justify-between text-slate-700 font-mono text-[11px]">
                          <span>Total Suara Sah:</span>
                          <span>{submission.validVotes} Suara</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedTpsForReport(tps)}
                      className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Vote className="w-3.5 h-3.5" />
                      <span>{submission ? 'Perbarui Form C1' : 'Input Form C1 Saksi'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Submissions & Verification */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          {tpsSubmissions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded">
                      {sub.tpsCode}
                    </span>
                    <span className="text-xs text-slate-500">
                      Pengirim: <strong>{sub.witnessName}</strong> ({sub.submittedAt})
                    </span>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full uppercase shrink-0 ${
                    sub.status === 'DISETUJUI'
                      ? 'bg-emerald-100 text-emerald-800'
                      : sub.status === 'PERLU_PERBAIKAN'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {sub.status.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Numerical Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase">Pemilih Hadir</span>
                  <span className="font-mono text-lg font-bold text-slate-900 tabular-nums">
                    {sub.totalVotersPresent}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase">Suara Sah</span>
                  <span className="font-mono text-lg font-bold text-emerald-700 tabular-nums">
                    {sub.validVotes}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-slate-500 block text-[10px] uppercase">Suara Tidak Sah</span>
                  <span className="font-mono text-lg font-bold text-rose-700 tabular-nums">
                    {sub.invalidVotes}
                  </span>
                </div>
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center">
                  <span className="text-blue-900 block text-[10px] uppercase font-bold">
                    Suara Perindo
                  </span>
                  <span className="font-mono text-lg font-bold text-blue-800 tabular-nums">
                    {sub.partyVotes}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <span className="font-semibold text-slate-800 block text-[11px] mb-0.5">
                  Catatan Saksi di Lokasi:
                </span>
                <p className="text-[11px] text-slate-600">{sub.notes}</p>
                {sub.verifierNotes && (
                  <div className="mt-2 pt-2 border-t border-slate-200 text-emerald-800 text-[11px]">
                    <strong>Catatan Tim Verifikator:</strong> {sub.verifierNotes}
                  </div>
                )}
              </div>

              {/* Verifier Action Toolbar */}
              {isVerifier && (
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Otorisasi Verifikasi Berkas:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        verifyTpsSubmission(
                          sub.id,
                          'DISETUJUI',
                          'Angka telah dicocokkan dengan salinan foto C1 Plano dan diverifikasi valid.'
                        )
                      }
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold flex items-center gap-1 shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Setujui Berkas C1</span>
                    </button>
                    <button
                      onClick={() =>
                        verifyTpsSubmission(
                          sub.id,
                          'PERLU_PERBAIKAN',
                          'Foto plano buram pada halaman tanda tangan KPPS. Mohon saksi mengunggah ulang.'
                        )
                      }
                      className="px-3 py-1.5 border border-rose-200 text-rose-700 hover:bg-rose-50 rounded-lg font-semibold flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Minta Perbaikan</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input Modal */}
      {selectedTpsForReport && (
        <div className="fixed inset-0 z-50 bg-sky-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-sky-200 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Input Laporan C1 Plano — {selectedTpsForReport.code}
              </span>
              <button
                onClick={() => setSelectedTpsForReport(null)}
                className="text-sky-100 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-[11px]">
                Pastikan angka yang dimasukkan sesuai dengan lembar formulir C1 Plano bertanda tangan KPPS.
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Pemilih Hadir</label>
                  <input
                    type="number"
                    value={votersPresent}
                    onChange={(e) => setVotersPresent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Suara Sah</label>
                  <input
                    type="number"
                    value={validVotes}
                    onChange={(e) => setValidVotes(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Suara Tidak Sah</label>
                  <input
                    type="number"
                    value={invalidVotes}
                    onChange={(e) => setInvalidVotes(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-blue-900 mb-1">Suara Partai Perindo</label>
                  <input
                    type="number"
                    value={partyVotes}
                    onChange={(e) => setPartyVotes(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-blue-400 bg-blue-50/50 font-mono font-bold text-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Catatan Lapangan & Kejadian Khusus
                </label>
                <textarea
                  rows={3}
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedTpsForReport(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
                >
                  Kirim Laporan Saksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
