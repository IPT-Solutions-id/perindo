import React, { useState } from 'react';
import {
  CalendarCheck,
  Plus,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  X,
  Search,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Activity } from '../../types';

export const ActivitiesPage: React.FC = () => {
  const { activities, addActivity } = useData();
  const { workspace, person } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Activity State
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('05 Mei 2025');
  const [time, setTime] = useState('10.00 - 12.30 WIB');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const filteredActivities = activities.filter(
    (a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) return;

    addActivity({
      title,
      date,
      time,
      location,
      notes,
      unitId: workspace?.unitId || 'UNIT-DPC-MENTENG',
      attendeesCount: 0,
      status: 'TERJADWAL',
      coordinator: person?.name || 'Pengurus Unit',
    });

    setIsAddModalOpen(false);
    setTitle('');
    setLocation('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
            Jadwal Operasional
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Agenda & Kegiatan Lapangan</h1>
          <p className="text-xs text-slate-500 mt-1">
            Koordinasi konsolidasi pengurus, rembug ranting, workshop kader, dan baksos warga.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#102C63] hover:bg-[#0c224d] text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Jadwalkan Kegiatan Baru</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama agenda atau lokasi kegiatan..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    act.status === 'SELESAI'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {act.status}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1.5">{act.title}</h3>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{act.attendeesCount} Peserta Hadir</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">Waktu Pelaksanaan:</span>
                  <div>{act.date} · {act.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">Lokasi Kegiatan:</span>
                  <div>{act.location}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
              <div>Koordinator: <strong className="text-slate-700">{act.coordinator}</strong></div>
              <div className="text-[11px] text-slate-400 italic">{act.notes}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Activity Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Jadwalkan Agenda Kegiatan Baru
              </span>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nama Kegiatan / Agenda <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Rapat Koordinasi Pengurus Ranting"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Contoh: 10 April 2025"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Waktu</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="Contoh: 14.00 - 16.00 WIB"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Lokasi Tempat <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Sekretariat DPC / Balai RW"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Catatan Tambahan</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Agenda pokok bahasan, kebutuhan logistik, dll."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
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
                  className="px-5 py-2 bg-[#102C63] text-white rounded-lg font-semibold hover:bg-[#0c224d]"
                >
                  Simpan Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
