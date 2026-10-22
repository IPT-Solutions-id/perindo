import React, { useState } from 'react';
import {
  Users,
  Building2,
  TrendingUp,
  FileCheck2,
  Vote,
  CalendarCheck,
  HeartHandshake,
  ShieldCheck,
  Award,
  AlertCircle,
  Plus,
  ArrowRight,
  CreditCard,
  QrCode,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Activity,
  Server,
  Database,
  Lock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { KtaCard } from '../../components/common/KtaCard';

interface OverviewPageProps {
  onNavigate: (path: string) => void;
  onOpenInspector: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate, onOpenInspector }) => {
  const { workspace, person } = useAuth();
  const { members, programs, activities, tickets, pollingStations, approvals, auditLogs } = useData();

  const role = workspace?.role || 'MEMBER';

  // 1. MEMBER DASHBOARD
  if (role === 'MEMBER') {
    const myTickets = tickets.filter((t) => t.creatorName === person?.name || t.unitId === workspace?.unitId);
    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
              Portal Anggota Resmi
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Selamat Datang, {person?.name}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Unit Terdaftar: <strong className="text-slate-800">{workspace?.unitName}</strong> ({workspace?.regionScopeLabel})
            </p>
          </div>
          <button
            onClick={() => onNavigate('/app/profile')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors shrink-0"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Lihat KTA Digital Lengkap</span>
          </button>
        </div>

        {/* Digital KTA Official Design Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-700" />
                <span className="font-bold text-xs text-slate-900">
                  Kartu Tanda Anggota (KTA) Sisi Depan & Belakang
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                TERVERIFIKASI RESMI
              </span>
            </div>

            {person && <KtaCard person={person} layout="flip" />}
          </div>

          {/* Quick Actions & My Aspirations */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-blue-600" />
                  Aspirasi & Layanan Saya
                </h2>
                <button
                  onClick={() => onNavigate('/app/services')}
                  className="text-xs font-semibold text-blue-700 hover:underline"
                >
                  Ajukan Baru &rarr;
                </button>
              </div>

              {myTickets.length === 0 ? (
                <p className="text-xs text-slate-500 py-3">Belum ada aspirasi yang diajukan.</p>
              ) : (
                <div className="space-y-2 text-xs">
                  {myTickets.map((t) => (
                    <div key={t.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">{t.subject}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{t.ticketNumber} · {t.category}</div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        t.status === 'SELESAI' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-2">
              <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-red-600" />
                Agenda Ranting Terdekat
              </h2>
              <div className="text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">Rembug Kader Ranting Kebon Sirih</div>
                <div className="text-[11px] text-slate-500">02 April 2025 · 19.30 WIB di Balai RW 03</div>
                <p className="text-[11px] text-slate-500">Konsolidasi pemetaan kesiapan warga dan silaturahmi berkala.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. DPC / DPD / DPW MANAGER DASHBOARD
  if (role === 'DPC_MANAGER' || role === 'DPD_MANAGER' || role === 'DPW_MANAGER') {
    return (
      <div className="space-y-6">
        {/* Territory Manager Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-800 uppercase tracking-wider">
              Pusat Kendali Pengurus Wilayah ({workspace?.level})
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              {workspace?.unitName}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Ketua Wilayah: <strong className="text-slate-800">{person?.name}</strong> · Cakupan: {workspace?.regionScopeLabel}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/app/members')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Daftar Kader</span>
            </button>
            <button
              onClick={() => onNavigate('/app/programs')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Program Kerja</span>
            </button>
          </div>
        </div>

        {/* Territory KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Anggota Terdaftar</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">340</div>
            <div className="text-[11px] text-emerald-600 mt-1 font-medium">+14 kader bulan ini</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Ranting Aktif</span>
              <Building2 className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">5 / 5</div>
            <div className="text-[11px] text-slate-500 mt-1">100% kelurahan terisi SK</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Realisasi Program UMKM</span>
              <TrendingUp className="w-4 h-4 text-red-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">73.9%</div>
            <div className="text-[11px] text-slate-500 mt-1">Rp92.400.000 terserap</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-medium">Kesiapan Saksi TPS</span>
              <Vote className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">92%</div>
            <div className="text-[11px] text-emerald-600 mt-1">Mandat telah diverifikasi</div>
          </div>
        </div>

        {/* Operational Monitoring Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Ongoing Programs */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-600" />
                Program Kerja Unggulan Kecamatan
              </h2>
              <button onClick={() => onNavigate('/app/programs')} className="text-xs text-blue-700 font-semibold hover:underline">
                Semua Program &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {programs.slice(0, 2).map((prog) => (
                <div key={prog.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{prog.title}</span>
                    <span className="text-[10px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                      {prog.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{prog.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-mono">
                    <span>Target: {prog.targetParticipants} pedagang</span>
                    <span>Anggaran: Rp{(prog.budgetAllocated / 1000000).toFixed(1)} Juta</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending DPP Approvals */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-indigo-600" />
                Status Pengajuan SK ke DPP
              </h2>
              <button onClick={() => onNavigate('/app/approvals')} className="text-xs text-blue-700 font-semibold hover:underline">
                Detail &rarr;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {approvals.slice(0, 2).map((item) => (
                <div key={item.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 space-y-1.5">
                  <div className="font-semibold text-slate-900">{item.title}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{item.docNumber}</div>
                  <div className="flex items-center gap-1.5 text-amber-700 text-[11px] font-medium pt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>SIMULASI • MENUNGGU VERIFIKASI DPP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. WING MANAGER DASHBOARD (e.g. Pemuda Perindo)
  if (role === 'WING_MANAGER') {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-purple-300">
              Sayap Otonom Kepemudaan
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">
              DPW Pemuda Perindo DKI Jakarta
            </h1>
            <p className="text-xs text-purple-200 mt-1">
              Koordinator Wilayah: <strong>{person?.name}</strong> · Struktur Independen di Bawah Koordinasi DPP
            </p>
          </div>
          <button
            onClick={() => onNavigate('/app/programs')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold transition-colors shrink-0"
          >
            + Program Kader Muda
          </button>
        </div>

        <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
          <span>
            <strong>Pemisahan Pohon Sayap (Autonomy Boundary):</strong> Sayap Pemuda Perindo memiliki struktur keanggotaan dan program kerja otonom. Tidak memiliki akses mengubah susunan pengurus partai induk (DPC/DPD).
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Kader Muda Terdaftar</span>
            <div className="text-2xl font-extrabold text-purple-900 font-mono mt-1">1.240</div>
            <div className="text-[11px] text-purple-700 mt-1">5 Wilayah Kotamadya DKI</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Program Vokasi & Digital</span>
            <div className="text-2xl font-extrabold text-blue-900 font-mono mt-1">3 Agenda</div>
            <div className="text-[11px] text-slate-500 mt-1">115 Peserta Aktif</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Serapan Anggaran Pelatihan</span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">80.8%</div>
            <div className="text-[11px] text-emerald-600 mt-1">Rp48.500.000 Terealisasi</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <h2 className="font-bold text-sm text-slate-900">Agenda Sayap Terjadwal</h2>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-slate-900">Workshop Advokasi Media Sosial Positif Kader Muda</div>
              <div className="text-[11px] text-slate-500">28 Maret 2025 · Graha Harmoni Cikini · 78 Kader Terdaftar</div>
            </div>
            <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded">
              TERJADWAL
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 4. TPS WITNESS DASHBOARD
  if (role === 'TPS_WITNESS') {
    const assignedTps = pollingStations[0]; // TPS 012
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-red-700 uppercase tracking-wider">
              Mandat Saksi TPS Resmi
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              {assignedTps.code} — Kelurahan Kebon Sirih
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Petugas Saksi: <strong>{person?.name}</strong> · DPT Terdaftar: {assignedTps.dptTotal} Pemilih
            </p>
          </div>

          <button
            onClick={() => onNavigate('/app/elections')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Vote className="w-3.5 h-3.5" />
            <span>Isi Form C1 Plano Simulasi</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Status Mandat SK</span>
            <div className="text-lg font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-5 h-5" />
              <span>SK/SAKSI/2024 Diterima</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Surat tugas fisik terdistribusi</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Status Pengiriman C1</span>
            <div className="text-lg font-bold text-blue-700 mt-1 flex items-center gap-1.5">
              <Clock className="w-5 h-5" />
              <span>Terverifikasi Verifikator</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">230 Suara Sah Dicatat</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Hotline Bantuan Advokasi</span>
            <div className="text-lg font-bold text-slate-900 mt-1 font-mono">0812-9988-7766</div>
            <div className="text-[11px] text-slate-500 mt-1">LBH Perindo Siaga Pemilu</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <h2 className="font-bold text-sm text-slate-900">Petunjuk Saksi TPS</h2>
          <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
            <li>Hadir di TPS selambatnya pukul 06.30 WIB dengan mengenakan identitas mandat resmi.</li>
            <li>Pastikan kotak suara kosong sebelum proses pemungutan suara dimulai.</li>
            <li>Foto formulir C1 Plano secara tegak lurus dengan pencahayaan terang setelah penghitungan selesai.</li>
            <li>Input angka ke aplikasi dan serahkan salinan fisik ke koordinator DPC.</li>
          </ul>
        </div>
      </div>
    );
  }

  // 5. EXECUTIVE COMMAND CENTER DASHBOARD (DPP Level)
  if (role === 'EXECUTIVE') {
    return (
      <div className="space-y-6">
        <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
              DPP EXECUTIVE COMMAND CENTER
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">
              Agregat Kesiapan Organisasi Nasional
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Ringkasan Eksekutif: <strong>{person?.name}</strong> · Mode Privasi PII Mentah Aktif
            </p>
          </div>
          <button
            onClick={() => onNavigate('/app/executive')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors shrink-0"
          >
            Buka Command Center Lengkap &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500">Total Kader Nasional</span>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-1">42.500</div>
            <div className="text-[11px] text-slate-400 mt-0.5">38 Provinsi Terpetakan</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500">Kelengkapan DPD (Kab/Kota)</span>
            <div className="text-2xl font-bold text-blue-700 font-mono mt-1">94.2%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Struktur SK Definitif</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500">Realisasi Program Kerakyatan</span>
            <div className="text-2xl font-bold text-emerald-700 font-mono mt-1">Rp174.9 Jt</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Serapan UMKM & Sosial</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500">Kesiapan Jaringan Saksi</span>
            <div className="text-2xl font-bold text-purple-700 font-mono mt-1">88.5%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Saksi Terplot ke TPS</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-300 text-xs border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-400" />
            <span>Prinsip Perlindungan Data Eksekutif: Menampilkan statistik agregat tanpa mengurai NIK atau identitas privat perorangan.</span>
          </div>
          <button onClick={() => onNavigate('/privasi')} className="text-sky-400 hover:underline shrink-0">
            Kebijakan Privasi
          </button>
        </div>
      </div>
    );
  }

  // 6. TECH OPERATOR DASHBOARD
  if (role === 'TECH_OPERATOR') {
    return (
      <div className="space-y-6">
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              SYSTEM RELIABILITY CONSOLE
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">
              Kesehatan Infrastruktur & Log Audit
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Operator: <strong>{person?.name}</strong> · Hak Akses: Observasi Sistem & Keamanan (Tanpa Data Kader)
            </p>
          </div>
          <button
            onClick={() => onNavigate('/app/admin/health')}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-colors shrink-0"
          >
            Diagnostik Penuh &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500">Status Gateway API Mock</span>
            <div className="text-lg font-bold text-emerald-700 mt-1 font-mono">100% OPERASIONAL</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Latensi rerata: 18ms</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500">Integritas Log Audit</span>
            <div className="text-lg font-bold text-blue-700 mt-1 font-mono">HASH TERVERIFIKASI</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{auditLogs.length} peristiwa terekam</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500">Penyimpanan Mock State</span>
            <div className="text-lg font-bold text-slate-900 mt-1 font-mono">LOCAL PERSISTENCE</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Survivable across refresh</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <h2 className="font-bold text-sm text-slate-900">Peristiwa Audit Terkini</h2>
          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.slice(0, 3).map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-blue-700">{log.action}</span>
                  <span className="text-slate-500 ml-2">{log.targetResource}</span>
                </div>
                <div className="font-mono text-slate-400 text-[11px]">{log.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Fallback default stateful overview
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        <h1 className="text-xl font-bold text-slate-900">Dashboard {workspace?.roleTitle}</h1>
        <p className="text-xs text-slate-500 mt-1">Unit: {workspace?.unitName} ({workspace?.regionScopeLabel})</p>
      </div>
    </div>
  );
};
