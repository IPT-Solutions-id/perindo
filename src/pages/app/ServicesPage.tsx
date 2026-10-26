import React, { useState } from 'react';
import {
  HeartHandshake,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  MessageSquare,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { ServiceTicket } from '../../types';

export const ServicesPage: React.FC = () => {
  const { tickets, createTicket, updateTicketStatus } = useData();
  const { workspace, person } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ServiceTicket['category']>('ASPIRASI');
  const [priority, setPriority] = useState<ServiceTicket['priority']>('SEDANG');

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.creatorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCategory === 'ALL' || t.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !description) return;

    createTicket({
      creatorName: person?.name || 'Kader Pengusul',
      creatorKta: person?.ktaNumber || 'KTA-DEMO-00000',
      unitId: workspace?.unitId || 'UNIT-DPC-MENTENG',
      category,
      subject,
      description,
      priority,
      assignedTo: 'Sekretariat Wilayah',
    });

    setIsAddModalOpen(false);
    setSubject('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header in Fresh Light Blue */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-white rounded-2xl border border-sky-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Pusat Pengaduan & Aspirasi ({workspace?.level} — {workspace?.unitName})
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Layanan Kader & Bantuan Warga</h1>
          <p className="text-xs text-slate-600 mt-1">
            Penanganan tiket pembaruan data KTA, advokasi hukum LBH, permohonan baksos, dan keluhan ranting.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Buat Tiket Baru</span>
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
            placeholder="Cari subjek tiket, nomor tiket, atau nama pemohon..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden"
        >
          <option value="ALL">Semua Kategori</option>
          <option value="ASPIRASI">Aspirasi Warga / Lingkungan</option>
          <option value="KTA_BANTUAN">Bantuan Administrasi KTA</option>
          <option value="HUKUM">Advokasi Hukum (LBH)</option>
          <option value="KESEHATAN_SOSIAL">Kesehatan & Baksos</option>
        </select>
      </div>

      {/* Ticket Cards */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                    {ticket.ticketNumber}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ticket.priority === 'TINGGI' || ticket.priority === 'MENDESAK'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    PRIORITAS: {ticket.priority}
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-2">{ticket.subject}</h3>
              </div>

              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase shrink-0 ${
                  ticket.status === 'SELESAI'
                    ? 'bg-emerald-100 text-emerald-800'
                    : ticket.status === 'DIPROSES'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {ticket.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{ticket.description}</p>

            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
              <div>
                Pemohon: <strong className="text-slate-800">{ticket.creatorName}</strong> ({ticket.creatorKta}) · Dibuat: {ticket.createdAt}
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2">
                {ticket.status === 'BARU' && (
                  <button
                    onClick={() => updateTicketStatus(ticket.id, 'DIPROSES')}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Proses Tiket
                  </button>
                )}
                {ticket.status === 'DIPROSES' && (
                  <button
                    onClick={() => updateTicketStatus(ticket.id, 'SELESAI')}
                    className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tandai Selesai</span>
                  </button>
                )}
                {ticket.status === 'SELESAI' && (
                  <span className="text-[11px] text-emerald-700 font-medium">
                    Tiket Ditutup
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Ticket Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-sky-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-sky-200 overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Ajukan Tiket Aspirasi / Layanan
              </span>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-sky-100 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Subjek Permohonan / Aspirasi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: Permohonan Bantuan Hukum Kasus Tanah Warga"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                  >
                    <option value="ASPIRASI">Aspirasi Lingkungan</option>
                    <option value="KTA_BANTUAN">Bantuan Administrasi KTA</option>
                    <option value="HUKUM">Advokasi Hukum (LBH)</option>
                    <option value="KESEHATAN_SOSIAL">Kesehatan & Baksos</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tingkat Urgensi</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                  >
                    <option value="RENDAH">Rendah</option>
                    <option value="SEDANG">Sedang</option>
                    <option value="TINGGI">Tinggi</option>
                    <option value="MENDESAK">Mendesak</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Uraian Detail Masalah <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan secara runtut latar belakang persoalan, pihak yang terlibat, dan bentuk bantuan yang diharapkan..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-500 cursor-pointer"
                >
                  Kirimkan Tiket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
