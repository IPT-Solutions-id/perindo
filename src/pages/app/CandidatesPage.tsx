import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Sliders,
  Star,
  FileCheck,
  UserCheck,
  X,
  AlertCircle,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { CandidateProfile, RubricScore } from '../../types';

export const CandidatesPage: React.FC = () => {
  const { candidates, rubricScores, saveRubricScore } = useData();
  const { workspace, person } = useAuth();

  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile | null>(null);

  // Rubric Form State
  const [integrityScore, setIntegrityScore] = useState(85);
  const [partyLoyaltyScore, setPartyLoyaltyScore] = useState(85);
  const [publicCompetenceScore, setPublicCompetenceScore] = useState(85);
  const [grassrootsNetworkScore, setGrassrootsNetworkScore] = useState(80);
  const [recommendation, setRecommendation] = useState<RubricScore['recommendation']>('DIREKOMENDASIKAN');
  const [notes, setNotes] = useState('');

  const openRubricModal = (candidate: CandidateProfile) => {
    setSelectedCandidate(candidate);
    const existing = rubricScores[candidate.id];
    if (existing) {
      setIntegrityScore(existing.integrityScore);
      setPartyLoyaltyScore(existing.partyLoyaltyScore);
      setPublicCompetenceScore(existing.publicCompetenceScore);
      setGrassrootsNetworkScore(existing.grassrootsNetworkScore);
      setRecommendation(existing.recommendation);
      setNotes(existing.evaluationNotes);
    } else {
      setIntegrityScore(80);
      setPartyLoyaltyScore(80);
      setPublicCompetenceScore(80);
      setGrassrootsNetworkScore(80);
      setRecommendation('DIREKOMENDASIKAN');
      setNotes('');
    }
  };

  const handleSaveRubric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    saveRubricScore({
      candidateId: selectedCandidate.id,
      evaluatorName: person?.name || 'Evaluator Resmi',
      integrityScore: Number(integrityScore),
      partyLoyaltyScore: Number(partyLoyaltyScore),
      publicCompetenceScore: Number(publicCompetenceScore),
      grassrootsNetworkScore: Number(grassrootsNetworkScore),
      recommendation,
      evaluationNotes: notes || 'Penilaian kualifikasi umum telah selesai dilaksanakan.',
      evaluatedAt: 'Hari ini',
    });

    setSelectedCandidate(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
            Meritokrasi Seleksi Calon
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Rubrik Penilaian Bakal Calon Legislatif</h1>
          <p className="text-xs text-slate-500 mt-1">
            Penilaian objektif berbasis 4 pilar: Integritas Rekam Jejak, Loyalitas Partai, Kompetensi Publik, dan Jejaring Akar Rumput.
          </p>
        </div>

        <span className="font-mono text-[11px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
          {candidates.length} Bakal Calon Terdaftar
        </span>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {candidates.map((cand) => {
          const scoreRecord = rubricScores[cand.id];
          return (
            <div
              key={cand.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                    {cand.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      cand.evaluationStatus === 'LULUS_SELEKSI'
                        ? 'bg-emerald-100 text-emerald-800'
                        : cand.evaluationStatus === 'SEDANG_DINILAI'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {cand.evaluationStatus.replace(/_/g, ' ')}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900">{cand.name}</h3>
                  <div className="text-xs text-blue-700 font-semibold mt-0.5">
                    Target: {cand.targetOffice.replace(/_/g, ' ')}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{cand.electoralDistrict}</div>
                </div>

                <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div><strong>Pendidikan:</strong> {cand.education}</div>
                  <div><strong>Latar Belakang:</strong> {cand.occupation}</div>
                </div>

                {scoreRecord && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Skor Rubrik Rerata:</span>
                      <span className="font-mono text-base font-extrabold text-blue-700">
                        {cand.totalScore} / 100
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600 font-mono">
                      <div>Integritas: {scoreRecord.integrityScore}</div>
                      <div>Loyalitas: {scoreRecord.partyLoyaltyScore}</div>
                      <div>Kompetensi: {scoreRecord.publicCompetenceScore}</div>
                      <div>Akar Rumput: {scoreRecord.grassrootsNetworkScore}</div>
                    </div>

                    <div className="pt-1 border-t border-slate-200 text-[10px] text-emerald-800 font-semibold uppercase">
                      Rekomendasi: {scoreRecord.recommendation.replace(/_/g, ' ')}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => openRubricModal(cand)}
                  className="w-full py-2 bg-[#102C63] hover:bg-[#0c224d] text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{scoreRecord ? 'Edit Skor Rubrik' : 'Isi Penilaian Rubrik'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rubric Evaluation Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Penilaian Rubrik — {selectedCandidate.name}
              </span>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRubric} className="p-6 space-y-4 text-xs">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>1. Integritas Rekam Jejak (0-100)</span>
                    <span className="font-mono text-blue-700">{integrityScore}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={integrityScore}
                    onChange={(e) => setIntegrityScore(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>2. Komitmen & Loyalitas Visi Partai (0-100)</span>
                    <span className="font-mono text-blue-700">{partyLoyaltyScore}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={partyLoyaltyScore}
                    onChange={(e) => setPartyLoyaltyScore(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>3. Kapabilitas & Artikulasi Publik (0-100)</span>
                    <span className="font-mono text-blue-700">{publicCompetenceScore}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={publicCompetenceScore}
                    onChange={(e) => setPublicCompetenceScore(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>4. Jejaring & Basis Massa Lapangan (0-100)</span>
                    <span className="font-mono text-blue-700">{grassrootsNetworkScore}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={grassrootsNetworkScore}
                    onChange={(e) => setGrassrootsNetworkScore(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Keputusan Rekomendasi
                </label>
                <select
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                >
                  <option value="SANGAT_DIREKOMENDASIKAN">Sangat Direkomendasikan (Prioritas)</option>
                  <option value="DIREKOMENDASIKAN">Direkomendasikan</option>
                  <option value="DIPERTIMBANGKAN">Dipertimbangkan (Perlu Penguatan)</option>
                  <option value="TIDAK_DIREKOMENDASIKAN">Tidak Direkomendasikan</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Catatan Kualitatif Evaluator
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan kelebihan, potensi suara, atau catatan hukum/etik..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedCandidate(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#102C63] text-white rounded-lg font-semibold hover:bg-[#0c224d]"
                >
                  Simpan Hasil Rubrik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
