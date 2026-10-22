import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Download,
  CreditCard,
  QrCode,
  ShieldAlert,
  X,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Person } from '../../types';

export const MembersPage: React.FC = () => {
  const { members, addMember } = useData();
  const { workspace } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('ALL');
  const [selectedMemberForKta, setSelectedMemberForKta] = useState<Person | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Member Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCity, setNewCity] = useState('Jakarta Pusat');
  const [newProvince, setNewProvince] = useState('DKI Jakarta');

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.ktaNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = filterCity === 'ALL' || m.city === filterCity;
    return matchesSearch && matchesCity;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    addMember({
      name: newName,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@demo.perindo.local`,
      phone: newPhone || '0812-0000-1111',
      nikDummy: '317101******9999',
      city: newCity,
      province: newProvince,
      avatarSeed: newName.split(' ')[0],
    });

    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Nama', 'Nomor KTA', 'Kota', 'Provinsi', 'Tgl Gabung'];
    const rows = filteredMembers.map((m) => [m.id, m.name, m.ktaNumber, m.city, m.province, m.joinedDate]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data_kader_perindo_simulasi_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
            Administrasi Keanggotaan
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">Database Anggota & KTA Digital</h1>
          <p className="text-xs text-slate-500 mt-1">
            Wilayah: <strong className="text-slate-800">{workspace?.unitName}</strong> · Total Terdata: {filteredMembers.length} Orang
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#102C63] hover:bg-[#0c224d] text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Kader Simulasi</span>
          </button>
        </div>
      </div>

      {/* Synthetic Data Alert Banner */}
      <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            <strong>Perlindungan Privasi:</strong> Seluruh NIK disamarkan (masking) dan nama merupakan data sintetis simulasi untuk tujuan pengujian prototipe.
          </span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama kader, nomor KTA, atau kota..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Semua Kota/Kabupaten</option>
            <option value="Jakarta Pusat">Jakarta Pusat</option>
            <option value="Jakarta Selatan">Jakarta Selatan</option>
            <option value="Jakarta Barat">Jakarta Barat</option>
            <option value="Kota Bandung">Kota Bandung (Jawa Barat)</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Kader & ID</th>
                <th className="py-3.5 px-4">Nomor KTA</th>
                <th className="py-3.5 px-4">NIK (Tersamar)</th>
                <th className="py-3.5 px-4">Wilayah / Domisili</th>
                <th className="py-3.5 px-4">Tgl Gabung</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Tidak ditemukan data kader yang sesuai pencarian.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{m.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{m.id} · {m.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-blue-700 tabular-nums">
                      {m.ktaNumber}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 tabular-nums">
                      {m.nikDummy}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-slate-800">{m.city}</div>
                      <div className="text-[10px] text-slate-400">{m.province}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {m.joinedDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedMemberForKta(m)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>KTA Digital</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital KTA Modal */}
      {selectedMemberForKta && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Kartu Tanda Anggota (KTA Digital)
              </span>
              <button
                onClick={() => setSelectedMemberForKta(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* KTA Card Design */}
              <div className="bg-gradient-to-br from-[#102C63] via-[#0d234f] to-[#1667C7] text-white rounded-2xl p-5 shadow-lg space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/15 pb-3">
                  <div>
                    <div className="text-[10px] font-bold tracking-widest uppercase text-white/80">PARTAI PERINDO</div>
                    <div className="text-xs font-extrabold text-white">KARTU TANDA ANGGOTA</div>
                  </div>
                  <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded font-bold">
                    RESMI SIMULASI
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] text-white/60 uppercase block">Nama Anggota</span>
                    <span className="text-sm font-bold text-white tracking-wide">{selectedMemberForKta.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-white/60 uppercase block">Nomor KTA</span>
                      <span className="font-mono text-[11px] text-sky-200">{selectedMemberForKta.ktaNumber}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/60 uppercase block">Domisili</span>
                      <span className="text-[11px]">{selectedMemberForKta.city}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[10px] text-white/70">
                  <div className="flex items-center gap-1.5">
                    <QrCode className="w-5 h-5 text-white" />
                    <span>Scan Validasi DPP</span>
                  </div>
                  <span className="font-mono">{selectedMemberForKta.joinedDate}</span>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setSelectedMemberForKta(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                >
                  Tutup Tampilan KTA
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Tambah Kader Baru (Simulasi)
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
                  Nama Lengkap & Gelar <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Irfan Hakim, S.T."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="irfan@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Telepon</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kota/Kabupaten</label>
                  <select
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Jakarta Pusat">Jakarta Pusat</option>
                    <option value="Jakarta Selatan">Jakarta Selatan</option>
                    <option value="Jakarta Timur">Jakarta Timur</option>
                    <option value="Kota Bandung">Kota Bandung</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Provinsi</label>
                  <select
                    value={newProvince}
                    onChange={(e) => setNewProvince(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="DKI Jakarta">DKI Jakarta</option>
                    <option value="Jawa Barat">Jawa Barat</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800">
                Data akan otomatis mendapatkan nomor KTA unik simulasi dan tersimpan di memori browser.
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
                  Simpan Kader Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
