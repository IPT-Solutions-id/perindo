import React, { useState } from 'react';
import {
  Plus,
  Search,
  Calendar,
  CheckCircle2,
  X,
  UserPlus,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Program } from '../../types';

export const ProgramsPage: React.FC = () => {
  const { programs, addProgram, updateProgramProgress } = useData();
  const { workspace } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Program State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Program['category']>('EKONOMI_UMKM');
  const [targetParticipants, setTargetParticipants] = useState(50);
  const [budgetAllocated, setBudgetAllocated] = useState(50000000);

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'ALL' || p.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addProgram({
      title,
      description,
      category,
      targetParticipants: Number(targetParticipants),
      budgetAllocated: Number(budgetAllocated),
      unitId: workspace?.unitId || 'UNIT-DPC-MENTENG',
      status: 'DIAJUKAN',
      startDate: 'Segera',
      endDate: '3 Bulan Kedepan',
    });

    setIsAddModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header in Fresh Light Blue */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-white rounded-2xl border border-sky-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Pengelolaan Program Kerja ({workspace?.level} — {workspace?.unitName})
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Program Pemberdayaan & UMKM</h1>
          <p className="text-xs text-slate-600 mt-1">
            Realisasi program kerakyatan harian, pencatatan penerima manfaat, dan serapan anggaran berjenjang.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Buat Program Baru</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari program kerja atau kode..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden"
        >
          <option value="ALL">Semua Kategori</option>
          <option value="EKONOMI_UMKM">Ekonomi & Gerobak UMKM</option>
          <option value="PEMUDA">Kaderisasi & Pemuda</option>
          <option value="SOSIAL">Sosial & Kesehatan</option>
        </select>
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((prog) => {
          const budgetPercent = Math.min(
            100,
            Math.round((prog.budgetSpent / prog.budgetAllocated) * 100)
          );
          const participantPercent = Math.min(
            100,
            Math.round((prog.currentParticipants / prog.targetParticipants) * 100)
          );

          return (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    {prog.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      prog.status === 'SELESAI'
                        ? 'bg-emerald-100 text-emerald-800'
                        : prog.status === 'BERJALAN'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {prog.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">{prog.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{prog.description}</p>

                {/* Progress Indicators */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Partisipan:</span>
                      <span className="font-mono font-medium text-slate-800 tabular-nums">
                        {prog.currentParticipants} / {prog.targetParticipants} Orang ({participantPercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all"
                        style={{ width: `${participantPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Penyerapan Anggaran:</span>
                      <span className="font-mono font-medium text-slate-800 tabular-nums">
                        Rp{(prog.budgetSpent / 1000000).toFixed(1)}Jt / Rp{(prog.budgetAllocated / 1000000).toFixed(1)}Jt
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-red-500 h-full rounded-full transition-all"
                        style={{ width: `${budgetPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {prog.startDate} – {prog.endDate}
                  </span>
                  <span className="font-mono text-slate-500">{prog.category}</span>
                </div>

                {/* Daily Action Bar */}
                {prog.status !== 'SELESAI' && (
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => updateProgramProgress(prog.id, 5, 2500000)}
                      className="flex-1 py-1.5 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>+5 Penerima & Realisasi</span>
                    </button>
                    <button
                      onClick={() =>
                        updateProgramProgress(
                          prog.id,
                          Math.max(1, prog.targetParticipants - prog.currentParticipants),
                          Math.max(0, prog.budgetAllocated - prog.budgetSpent)
                        )
                      }
                      className="py-1.5 px-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      title="Tandai Selesai"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Selesai</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Program Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-sky-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-sky-200 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Usulkan Program Kerja Baru
              </span>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-sky-100 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Judul Program <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Bantuan Tenda Usaha PKL Cikini"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Deskripsi & Tujuan Program <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan sasaran warga, manfaat nyata bagi rakyat, dan target realisasi..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Program['category'])}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                  >
                    <option value="EKONOMI_UMKM">Ekonomi & UMKM</option>
                    <option value="PEMUDA">Kader Muda & Vokasi</option>
                    <option value="SOSIAL">Sosial & Kesehatan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Target Peserta (Orang)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={targetParticipants}
                    onChange={(e) => setTargetParticipants(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Estimasi Anggaran (Rupiah)
                </label>
                <input
                  type="number"
                  step={1000000}
                  value={budgetAllocated}
                  onChange={(e) => setBudgetAllocated(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden font-mono"
                />
              </div>

              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-[11px] text-sky-900">
                Program baru akan otomatis tercatat atas nama unit <strong>{workspace?.unitName}</strong>.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-500 cursor-pointer"
                >
                  Simpan Usulan Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
