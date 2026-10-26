import React, { useState, useRef } from 'react';
import {
  Search,
  Filter,
  Plus,
  Download,
  CreditCard,
  X,
  CheckCircle2,
  Camera,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Person } from '../../types';
import { KtaCard } from '../../components/common/KtaCard';

export const MembersPage: React.FC = () => {
  const { members, addMember } = useData();
  const { workspace } = useAuth();
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvince, setFilterProvince] = useState('ALL');
  const [selectedMemberForKta, setSelectedMemberForKta] = useState<Person | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Member Form State (Full KTA Fields)
  const [newName, setNewName] = useState('');
  const [newKtaId16, setNewKtaId16] = useState('3202018905120002');
  const [newBirthPlaceDate, setNewBirthPlaceDate] = useState('Sukabumi/12-05-1989');
  const [newAddressLine1, setNewAddressLine1] = useState('Kp. Sirnagalih RT. 04 RW. 29,');
  const [newAddressLine2, setNewAddressLine2] = useState('Pelabuhanratu, Pelabuhanratu,');
  const [newCity, setNewCity] = useState('KABUPATEN SUKABUMI');
  const [newProvince, setNewProvince] = useState('Jawa Barat');
  const [newPhone, setNewPhone] = useState('+6281210338821');
  const [newEmail, setNewEmail] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState<string>('/assets/kta/member_photo.png');

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.ktaId16 || m.ktaNumber).toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProv = filterProvince === 'ALL' || m.province === filterProvince;
    return matchesSearch && matchesProv;
  });

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const clean16 = newKtaId16.trim() || `3202018810${String(members.length + 1).padStart(6, '0')}`;

    addMember({
      name: newName,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@perindo.id`,
      phone: newPhone || '+6281210338821',
      nikDummy: `${clean16.substring(0, 6)}******${clean16.substring(12)}`,
      ktaId16: clean16,
      birthPlaceDate: newBirthPlaceDate || 'Jakarta/15-05-1988',
      addressLine1: newAddressLine1 || 'Jl. Pangeran Diponegoro No. 29,',
      addressLine2: newAddressLine2 || 'Menteng, Menteng,',
      photoUrl: newPhotoUrl || '/assets/kta/member_photo.png',
      city: newCity.toUpperCase(),
      province: newProvince,
      avatarSeed: newName.split(' ')[0],
    });

    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Nama', 'Nomor KTA 16 Digit', 'TTL', 'Alamat', 'Kota/Kab', 'Provinsi', 'Telepon'];
    const rows = filteredMembers.map((m) => [
      m.id,
      `"${m.name}"`,
      m.ktaId16 || m.ktaNumber,
      `"${m.birthPlaceDate || ''}"`,
      `"${m.addressLine1 || ''} ${m.addressLine2 || ''}"`,
      `"${m.city}"`,
      `"${m.province}"`,
      m.phone,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `data_kta_kader_perindo_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Preview default featured member (Rizky fuzi berlina or first member)
  const featuredPreviewMember =
    selectedMemberForKta ||
    members.find((m) => m.id === 'DEMO-RIZKY') ||
    members[0];

  return (
    <div className="space-y-6">
      {/* Header in Fresh Light Blue */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-white rounded-2xl border border-sky-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
            Administrasi Keanggotaan & KTA Dinamis ({workspace?.level} — {workspace?.unitName})
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Database Anggota & Penerbitan KTA Resmi
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Setiap data anggota memiliki KTA Depan & Belakang yang otomatis menyesuaikan foto, nomor 16 digit, TTL, alamat, dan QR Code.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-sky-200 bg-white hover:bg-sky-50 text-sky-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Anggota & KTA Baru</span>
          </button>
        </div>
      </div>

      {/* Live Interactive KTA Showcase Banner for Selected Member */}
      {featuredPreviewMember && (
        <div className="bg-white rounded-2xl border border-sky-200 p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100 pb-3">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-sky-600">
                Pratinjau KTA Resmi (Sisi Depan & Belakang)
              </div>
              <h2 className="font-bold text-base text-slate-900 mt-0.5">
                KTA Milik: {featuredPreviewMember.name} ({featuredPreviewMember.ktaId16 || featuredPreviewMember.ktaNumber})
              </h2>
            </div>
            <span className="text-[11px] text-sky-700 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-lg">
              Klik <strong>Lihat KTA</strong> pada tabel di bawah untuk mengganti anggota yang ditampilkan
            </span>
          </div>

          <KtaCard person={featuredPreviewMember} layout="side-by-side" />
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama anggota, nomor KTA 16 digit, atau kabupaten/kota..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={filterProvince}
            onChange={(e) => setFilterProvince(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Semua Provinsi</option>
            <option value="Jawa Barat">Jawa Barat</option>
            <option value="DKI Jakarta">DKI Jakarta</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Foto & Nama Anggota</th>
                <th className="py-3.5 px-4">Nomor KTA (16 Digit)</th>
                <th className="py-3.5 px-4">Tempat / Tgl Lahir</th>
                <th className="py-3.5 px-4">Alamat & Wilayah</th>
                <th className="py-3.5 px-4">Telepon</th>
                <th className="py-3.5 px-4 text-right">Kartu KTA</th>
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
                filteredMembers.map((m) => {
                  const isSelected = featuredPreviewMember?.id === m.id;
                  return (
                    <tr
                      key={m.id}
                      className={`transition-colors ${
                        isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={m.photoUrl || '/assets/kta/member_photo.png'}
                            alt={m.name}
                            className="w-9 h-11 rounded object-cover object-top border border-slate-200 bg-white shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = '/assets/kta/member_photo.png';
                            }}
                          />
                          <div>
                            <div className="font-bold text-slate-900">{m.name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {m.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 tabular-nums">
                        {m.ktaId16 || m.ktaNumber}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {m.birthPlaceDate || `${m.city}/31-10-1987`}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-800 text-[11px] leading-snug">
                          {m.addressLine1} {m.addressLine2}
                        </div>
                        <div className="text-[10px] font-semibold text-blue-800 mt-0.5">
                          {m.city}, {m.province}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600 tabular-nums">
                        {m.phone}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedMemberForKta(m);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-sky-600 text-white shadow-2xs'
                              : 'text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200/80'
                          }`}
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>{isSelected ? 'Sedang Ditampilkan' : 'Lihat KTA'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal with Full KTA Fields & Photo Upload */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-sky-950/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-sky-200 overflow-hidden my-8">
            <div className="p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Daftarkan Anggota & Terbitkan KTA Baru
              </span>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-sky-100 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              {/* Photo Upload Row */}
              <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <img
                  src={newPhotoUrl}
                  alt="Pratinjau Foto KTA"
                  className="w-14 h-18 object-cover object-top rounded border border-slate-300 bg-white shrink-0"
                />
                <div className="space-y-1.5">
                  <div className="font-bold text-slate-900">Pasfoto Anggota untuk KTA</div>
                  <p className="text-[11px] text-slate-500">
                    Pasfoto ini akan langsung tampil pada sisi depan KTA anggota.
                  </p>
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-semibold text-slate-700 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#D7283F]" />
                    <span>Pilih Foto dari Perangkat</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nama Lengkap (Sesuai KTA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Contoh: Rizky fuzi berlina"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nomor KTA / NIK 16 Digit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newKtaId16}
                    onChange={(e) => setNewKtaId16(e.target.value)}
                    placeholder="3202018710310001"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tempat / Tanggal Lahir
                  </label>
                  <input
                    type="text"
                    value={newBirthPlaceDate}
                    onChange={(e) => setNewBirthPlaceDate(e.target.value)}
                    placeholder="Sukabumi/31-10-1987"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+6281210338821"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Alamat Baris 1 (Jalan/Kampung & RT/RW)
                  </label>
                  <input
                    type="text"
                    value={newAddressLine1}
                    onChange={(e) => setNewAddressLine1(e.target.value)}
                    placeholder="Kp.sirnagalih RT. 04 RW. 29,"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Alamat Baris 2 (Kelurahan/Desa & Kecamatan)
                  </label>
                  <input
                    type="text"
                    value={newAddressLine2}
                    onChange={(e) => setNewAddressLine2(e.target.value)}
                    placeholder="Pelabuhanratu, Pelabuhanratu,"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Kabupaten / Kota (Huruf Kapital di KTA)
                  </label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="KABUPATEN SUKABUMI"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Provinsi</label>
                  <input
                    type="text"
                    value={newProvince}
                    onChange={(e) => setNewProvince(e.target.value)}
                    placeholder="Jawa Barat"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-[11px] text-sky-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>
                  Begitu disimpan, KTA Depan & Belakang anggota ini langsung terbit sesuai format resmi referensi Anda.
                </span>
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
                  className="px-5 py-2 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-500 transition-colors cursor-pointer"
                >
                  Simpan & Terbitkan KTA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
