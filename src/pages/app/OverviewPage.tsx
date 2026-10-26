import React, { useState } from 'react';
import {
  Users,
  Building2,
  TrendingUp,
  FileCheck2,
  Vote,
  CalendarCheck,
  HeartHandshake,
  AlertCircle,
  Plus,
  CreditCard,
  CheckCircle2,
  Clock,
  Lock,
  Crown,
  Send,
  Megaphone,
  ArrowUpRight,
  Layers,
  X,
  Check,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { KtaCard } from '../../components/common/KtaCard';
import { DirectiveItem, OrgLevel } from '../../types';
import { motion } from 'framer-motion';

interface OverviewPageProps {
  onNavigate: (path: string) => void;
  onOpenInspector: () => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  const { workspace, person, getManagedUnitIds, isNationalRole } = useAuth();
  const {
    members,
    programs,
    activities,
    tickets,
    pollingStations,
    approvals,
    auditLogs,
    directives,
    addDirective,
    updateDirectiveStatus,
    updateApprovalStatus,
  } = useData();

  const role = workspace?.role || 'MEMBER';
  const currentLevel = workspace?.level || 'DPP';
  const managedUnitIds = getManagedUnitIds();

  // Modal state for issuing new Directive / Disposition
  const [isDirectiveModalOpen, setIsDirectiveModalOpen] = useState(false);
  const [dirTitle, setDirTitle] = useState('');
  const [dirTargetLevel, setDirTargetLevel] = useState<DirectiveItem['targetLevel']>('DPW');
  const [dirTargetRegion, setDirTargetRegion] = useState('ALL');
  const [dirPriority, setDirPriority] = useState<DirectiveItem['priority']>('PENTING');
  const [dirDeadline, setDirDeadline] = useState('30 April 2025');
  const [dirNotes, setDirNotes] = useState('');

  // Modal state for updating directive execution progress
  const [selectedDirective, setSelectedDirective] = useState<DirectiveItem | null>(null);
  const [progressNoteInput, setProgressNoteInput] = useState('');

  const canIssueDirective = [
    'KETUA_UMUM',
    'DPP_ADMIN',
    'EXECUTIVE',
    'DPW_MANAGER',
    'DPD_MANAGER',
    'DPC_MANAGER',
  ].includes(role);

  const handleCreateDirective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dirTitle) return;

    addDirective({
      title: dirTitle,
      description:
        dirNotes || 'Instruksi operasional harian untuk dilaksanakan secara berjenjang.',
      issuerName: person?.name || 'Pimpinan Partai',
      issuerRoleTitle: workspace?.roleTitle || currentLevel,
      targetLevel: dirTargetLevel,
      targetUnitId: dirTargetRegion,
      priority: dirPriority,
      deadline: dirDeadline,
    });

    setIsDirectiveModalOpen(false);
    setDirTitle('');
    setDirNotes('');
  };

  const handleSaveDirectiveProgress = (
    item: DirectiveItem,
    nextStatus: DirectiveItem['status']
  ) => {
    updateDirectiveStatus(
      item.id,
      nextStatus,
      progressNoteInput.trim() ||
        `Ditindaklanjuti oleh ${person?.name} (${workspace?.unitName}) pada ${new Date().toLocaleDateString('id-ID')}.`,
      person?.name
    );
    setSelectedDirective(null);
    setProgressNoteInput('');
  };

  // Filter directives relevant to current user's tier
  const relevantDirectives = directives.filter((d) => {
    if (isNationalRole) return true;
    if (d.targetLevel === 'SEMUA_JENJANG' || d.targetLevel === currentLevel) return true;
    if (role === 'DPW_MANAGER' && ['DPW', 'DPD', 'DPC', 'DPRT'].includes(d.targetLevel)) return true;
    if (role === 'DPD_MANAGER' && ['DPD', 'DPC', 'DPRT'].includes(d.targetLevel)) return true;
    if (role === 'DPC_MANAGER' && ['DPC', 'DPRT'].includes(d.targetLevel)) return true;
    return false;
  });

  // Reusable Daily Directives & Disposition Section for all Organizational Tiers
  const renderDailyDirectivesDesk = () => (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#D7283F]" />
            <h2 className="font-bold text-sm text-slate-900">
              Instruksi & Disposisi Kerja Berjenjang (Top-Down & Bottom-Up)
            </h2>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Alur penugasan harian dari Ketua Umum &rarr; DPP &rarr; DPW &rarr; DPD &rarr; DPC &rarr; DPRt beserta laporan realisasinya.
          </p>
        </div>

        {canIssueDirective && (
          <button
            onClick={() => setIsDirectiveModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition-colors shrink-0 cursor-pointer shadow-2xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Terbitkan Instruksi / Disposisi</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relevantDirectives.map((dir) => (
          <div
            key={dir.id}
            className="p-4 rounded-xl border border-sky-200/80 bg-sky-50/40 hover:bg-white transition-all flex flex-col justify-between gap-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                    {dir.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      dir.priority === 'INSTRUKSI_KHUSUS_KETUM'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : dir.priority === 'PENTING'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {dir.priority.replace(/_/g, ' ')}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    dir.status === 'SELESAI_DILAPORKAN'
                      ? 'bg-emerald-100 text-emerald-800'
                      : dir.status === 'SEDANG_DIKERJAKAN'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {dir.status.replace(/_/g, ' ')}
                </span>
              </div>

              <h3 className="font-bold text-xs text-slate-900 leading-snug">{dir.title}</h3>
              <p className="text-[11px] text-slate-600 leading-relaxed">{dir.description}</p>

              <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                <div>
                  Penerbit:{' '}
                  <strong className="text-slate-700">
                    {dir.issuerName} ({dir.issuerRoleTitle})
                  </strong>
                </div>
                <div>
                  Sasaran Jenjang:{' '}
                  <strong className="text-blue-800">
                    {dir.targetLevel === 'SEMUA_JENJANG'
                      ? 'Seluruh Jenjang Nasional'
                      : `Tingkat ${dir.targetLevel}`}
                  </strong>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 text-[11px] text-slate-600">
                <span className="font-semibold text-slate-800 block text-[10px] uppercase">
                  Laporan Progres Harian:
                </span>
                {dir.progressNote}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px]">
              <span className="text-slate-500 font-mono">Tenggat: {dir.deadline}</span>

              <div className="flex items-center gap-1.5">
                {dir.status !== 'SELESAI_DILAPORKAN' && (
                  <button
                    onClick={() => {
                      setSelectedDirective(dir);
                      setProgressNoteInput(dir.progressNote);
                    }}
                    className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Perbarui Progres
                  </button>
                )}
                {dir.status !== 'SELESAI_DILAPORKAN' && (
                  <button
                    onClick={() =>
                      handleSaveDirectiveProgress(dir, 'SELESAI_DILAPORKAN')
                    }
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Check className="w-3 h-3" />
                    <span>Selesai</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 0. KETUA UMUM DASHBOARD (Supreme National Authority across all 38 Provinces)
  if (role === 'KETUA_UMUM') {
    const pendingKetumApprovals = approvals.filter(
      (a) => a.status === 'DISETUJUI_DPP' || a.status === 'MENUNGGU_VERIFIKASI_DPP'
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-6"
      >
        {/* Ketua Umum Executive Banner in Fresh Light Blue */}
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white rounded-2xl p-6 sm:p-7 shadow-md border border-sky-300 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/20 border border-white/30 text-white text-[10px] font-mono font-bold uppercase tracking-widest">
              <Crown className="w-3.5 h-3.5 text-amber-200" />
              <span>Otoritas Tertinggi Partai — Hak Akses Nasional Penuh</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Meja Kerja Ketua Umum Partai Perindo
            </h1>
            <p className="text-xs text-sky-50 max-w-2xl leading-relaxed">
              Selamat bertugas, <strong>{person?.name}</strong>. Anda memegang kendali langsung atas instruksi strategis nasional, pengesahan SK definitif seluruh tingkatan (DPP, DPW, DPD, DPC, DPRt), pemantauan serapan program kerakyatan, dan kesiapan saksi Pemilu di 38 Provinsi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsDirectiveModalOpen(true)}
              className="px-4 py-2.5 bg-white text-sky-700 hover:bg-sky-50 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Megaphone className="w-4 h-4 text-[#D7283F]" />
              <span>Terbitkan Instruksi Ketua Umum</span>
            </button>
            <button
              onClick={() => onNavigate('/app/approvals')}
              className="px-4 py-2.5 bg-sky-700/60 hover:bg-sky-700/80 text-white border border-white/30 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-amber-200" />
              <span>Sahkan SK ({pendingKetumApprovals.length})</span>
            </button>
          </div>
        </div>

        {/* National Hierarchy Pulse KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-200 shadow-2xs border-l-4 border-l-sky-500">
            <div className="flex items-center justify-between text-sky-800 text-xs font-semibold">
              <span>Total Kader Terverifikasi</span>
              <Users className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1.5">
              42.500
            </div>
            <div className="text-[11px] text-sky-700 font-medium mt-1">
              38 DPW · 514 DPD · 5.200+ DPC/DPRt
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs border-l-4 border-l-[#D7283F]">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>Instruksi & Disposisi Aktif</span>
              <Megaphone className="w-4 h-4 text-[#D7283F]" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1.5">
              {directives.length} Instruksi
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {directives.filter((d) => d.status === 'SELESAI_DILAPORKAN').length} selesai,{' '}
              {directives.filter((d) => d.status !== 'SELESAI_DILAPORKAN').length} dikerjakan
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs border-l-4 border-l-amber-500">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>Antrean Pengesahan SK</span>
              <FileCheck2 className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1.5">
              {approvals.filter((a) => a.status !== 'DISAHKAN_KETUA_UMUM').length} Berkas
            </div>
            <div className="text-[11px] text-amber-700 font-medium mt-1">
              Siap disahkan tanda tangan Ketua Umum
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs border-l-4 border-l-emerald-600">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
              <span>Realisasi Program Nasional</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums mt-1.5">
              Rp420,9 Jt
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              {programs.length} Program Kerakyatan Berjalan
            </div>
          </div>
        </div>

        {/* Daily Directives & Dispositions Section */}
        {renderDailyDirectivesDesk()}

        {/* Quick Final SK Sign-Off & Regional Performance Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quick SK Approval Box for Ketua Umum */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-sky-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <div>
                <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-sky-600" />
                  Meja Pengesahan SK & Anggaran Berjenjang
                </h2>
                <p className="text-[11px] text-slate-500">
                  Otorisasi langsung oleh Ketua Umum atas berkas usulan DPW/DPD/DPC
                </p>
              </div>
              <button
                onClick={() => onNavigate('/app/approvals')}
                className="text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
              >
                Buka Semua &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {approvals.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-sky-200/80 bg-sky-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-sky-800 bg-sky-100 px-1.5 py-0.5 rounded">
                        {item.docNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.status === 'DISAHKAN_KETUA_UMUM'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-[11px] text-slate-500">
                      Pengusul: {item.applicantUnit}
                    </div>
                  </div>

                  {item.status !== 'DISAHKAN_KETUA_UMUM' && (
                    <button
                      onClick={() =>
                        updateApprovalStatus(
                          item.id,
                          'DISAHKAN_KETUA_UMUM',
                          `Disahkan secara definitif oleh Ketua Umum (${person?.name}).`
                        )
                      }
                      className="px-3 py-1.5 bg-sky-600 hover:bg-emerald-600 text-white rounded-lg font-semibold text-[11px] shrink-0 transition-colors cursor-pointer"
                    >
                      Sahkan SK (Ketum)
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hierarchy Operational Readiness Summary */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-sky-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <div>
                <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  Kinerja Harian Struktur Berjenjang
                </h2>
                <p className="text-[11px] text-slate-500">
                  Pantauan kepatuhan operasional dari tingkat Provinsi hingga Kelurahan
                </p>
              </div>
              <button
                onClick={() => onNavigate('/app/organizations')}
                className="text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
              >
                Pohon Struktur &rarr;
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                {
                  tier: 'DPP Pusat',
                  unit: 'Sekretariat Jenderal & Eksekutif',
                  task: 'Verifikasi SK Nasional & Komando Saksi',
                  rate: '98%',
                },
                {
                  tier: 'DPW Provinsi',
                  unit: 'DPW DKI Jakarta & DPW Jawa Barat',
                  task: 'Supervisi Kabupaten/Kota & Penjaringan Caleg',
                  rate: '94%',
                },
                {
                  tier: 'DPD Kab/Kota',
                  unit: 'DPD Jakarta Pusat & DPD Kota Bandung',
                  task: 'Rekomendasi SK DPC & Distribusi Gerobak UMKM',
                  rate: '91%',
                },
                {
                  tier: 'DPC Kecamatan',
                  unit: 'DPC Kecamatan Menteng',
                  task: 'Rekrutmen Kader, Pembinaan Ranting & Posko Aspirasi',
                  rate: '95%',
                },
                {
                  tier: 'DPRt Kelurahan',
                  unit: 'DPRt Kelurahan Kebon Sirih',
                  task: 'Pendataan Saksi TPS, KTA Warga & Rembug RW',
                  rate: '100%',
                },
              ].map((row) => (
                <div
                  key={row.tier}
                  className="p-3 rounded-xl bg-sky-50/60 border border-sky-100 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold bg-sky-500 text-white px-2 py-0.5 rounded">
                        {row.tier}
                      </span>
                      <span className="font-bold text-slate-900">{row.unit}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{row.task}</div>
                  </div>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 tabular-nums">
                    {row.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modals rendered at bottom */}
        {renderModals()}
      </motion.div>
    );
  }

  // 1. MEMBER DASHBOARD
  if (role === 'MEMBER') {
    const myTickets = tickets.filter(
      (t) => t.creatorName === person?.name || t.unitId === workspace?.unitId
    );
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-white rounded-2xl border border-sky-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span>Portal Anggota Resmi</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              Selamat Datang, {person?.name}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              Unit Terdaftar: <strong className="text-sky-900">{workspace?.unitName}</strong> (
              {workspace?.regionScopeLabel})
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('/app/profile')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Lihat KTA Digital Lengkap</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-sky-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-sky-100 pb-2.5">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-sky-600" />
                <span className="font-bold text-xs text-slate-900">
                  Kartu Tanda Anggota (KTA) Digital Sisi Depan & Belakang
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                TERVERIFIKASI RESMI
              </span>
            </div>

            {person && <KtaCard person={person} layout="flip" />}
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-blue-600" />
                  Aspirasi & Layanan Saya
                </h2>
                <button
                  onClick={() => onNavigate('/app/services')}
                  className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer"
                >
                  Ajukan Baru &rarr;
                </button>
              </div>

              {myTickets.length === 0 ? (
                <p className="text-xs text-slate-500 py-3">Belum ada aspirasi yang diajukan.</p>
              ) : (
                <div className="space-y-2 text-xs">
                  {myTickets.map((t) => (
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      key={t.id}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between transition-colors hover:bg-slate-100/80"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">{t.subject}</div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {t.ticketNumber} · {t.category}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          t.status === 'SELESAI'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {t.status}
                      </span>
                    </motion.div>
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
                <div className="font-semibold text-slate-800">
                  Rembug Kader Ranting Kebon Sirih
                </div>
                <div className="text-[11px] text-slate-500">
                  02 April 2025 · 19.30 WIB di Balai RW 03
                </div>
                <p className="text-[11px] text-slate-500">
                  Konsolidasi pemetaan kesiapan warga dan silaturahmi berkala.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // 2. TERRITORIAL HIERARCHY MANAGERS: DPW (Provinsi), DPD (Kab/Kota), DPC (Kecamatan), DPRt (Kelurahan)
  if (
    role === 'DPW_MANAGER' ||
    role === 'DPD_MANAGER' ||
    role === 'DPC_MANAGER' ||
    role === 'DPRT_MANAGER'
  ) {
    const scopedPrograms = programs.filter((p) => managedUnitIds.includes(p.unitId));
    const scopedActivities = activities.filter((a) => managedUnitIds.includes(a.unitId));
    const scopedApprovals = approvals.filter(
      (a) => !a.unitId || managedUnitIds.includes(a.unitId)
    );

    const tierDescription: Record<string, string> = {
      DPW: 'Koordinasi tingkat Provinsi: membawahi seluruh DPD Kabupaten/Kota, supervisi program wilayah, dan verifikasi pencalonan legislatif.',
      DPD: 'Koordinasi tingkat Kabupaten/Kota: membawahi DPC Kecamatan, verifikasi usulan SK Ranting/DPC, dan distribusi program UMKM.',
      DPC: 'Koordinasi tingkat Kecamatan: membawahi DPRt Kelurahan, rekrutmen kader aktif, dan posko aspirasi warga.',
      DPRt: 'Ujung tombak tingkat Kelurahan/Desa: pendataan kader RW/RT, pengawalan saksi TPS, dan rembug warga harian.',
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-6"
      >
        {/* Territory Manager Header in Fresh Light Blue */}
        <div className="bg-gradient-to-r from-sky-50 via-blue-50/70 to-white rounded-2xl border border-sky-200 p-6 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              <span>
                Meja Kerja Harian {workspace?.level} — Wewenang Teritorial Berjenjang
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {workspace?.unitName} ({workspace?.regionScopeLabel})
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl">
              Pejabat Aktif: <strong className="text-sky-900">{person?.name}</strong> ({workspace?.roleTitle}) ·{' '}
              {tierDescription[workspace?.level || 'DPC']}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('/app/members')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Rekrut Kader</span>
            </button>
            <button
              onClick={() => onNavigate('/app/approvals')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-sky-50 text-sky-800 border border-sky-300 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-sky-600" />
              <span>Usulan & Verifikasi SK</span>
            </button>
          </div>
        </div>

        {/* Territory KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-200 shadow-2xs border-l-4 border-l-sky-500">
            <div className="flex items-center justify-between text-sky-800 mb-1.5">
              <span className="text-xs font-semibold">Unit dalam Wewenang</span>
              <Building2 className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {managedUnitIds.length} Unit
            </div>
            <div className="text-[11px] text-sky-700 mt-1 font-medium">
              Termasuk unit subordinat di bawah {workspace?.level}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sky-200 shadow-2xs border-l-4 border-l-sky-400">
            <div className="flex items-center justify-between text-slate-500 mb-1.5">
              <span className="text-xs font-medium">Program Kerja Wilayah</span>
              <TrendingUp className="w-4 h-4 text-sky-500" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {scopedPrograms.length} Program
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Aktif dijalankan di wilayah kerja
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs border-l-4 border-l-[#D7283F]">
            <div className="flex items-center justify-between text-slate-500 mb-1.5">
              <span className="text-xs font-medium">Agenda Lapangan</span>
              <CalendarCheck className="w-4 h-4 text-[#D7283F]" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {scopedActivities.length} Kegiatan
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Konsolidasi & pelayanan warga
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs border-l-4 border-l-emerald-600">
            <div className="flex items-center justify-between text-slate-500 mb-1.5">
              <span className="text-xs font-medium">Dokumen SK & Anggaran</span>
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {scopedApprovals.length} Berkas
            </div>
            <div className="text-[11px] text-emerald-700 mt-1 font-medium">
              Alur verifikasi berjenjang aktif
            </div>
          </div>
        </div>

        {/* Daily Directives & Dispositions */}
        {renderDailyDirectivesDesk()}

        {/* Operational Monitoring Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Ongoing Programs in Scope */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-red-600" />
                Program Kerja dalam Yurisdiksi {workspace?.level}
              </h2>
              <button
                onClick={() => onNavigate('/app/programs')}
                className="text-xs text-blue-700 font-semibold hover:underline cursor-pointer"
              >
                Kelola Program &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {(scopedPrograms.length > 0 ? scopedPrograms : programs.slice(0, 2)).map((prog) => (
                <div
                  key={prog.id}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{prog.title}</span>
                    <span className="text-[10px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                      {prog.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">{prog.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-mono tabular-nums">
                    <span>
                      Realisasi: {prog.currentParticipants} / {prog.targetParticipants} peserta
                    </span>
                    <span>Anggaran: Rp{(prog.budgetAllocated / 1000000).toFixed(1)} Juta</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals in Scope */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-indigo-600" />
                Pengajuan & Verifikasi SK Wilayah
              </h2>
              <button
                onClick={() => onNavigate('/app/approvals')}
                className="text-xs text-blue-700 font-semibold hover:underline cursor-pointer"
              >
                Meja SK &rarr;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {scopedApprovals.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-500">{item.docNumber}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                      {item.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-900">{item.title}</div>
                  <div className="text-[11px] text-slate-500">Pengusul: {item.applicantUnit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {renderModals()}
      </motion.div>
    );
  }

  // 3. WING MANAGER DASHBOARD (e.g. Pemuda Perindo)
  if (role === 'WING_MANAGER') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-sky-100">
              Sayap Otonom Kepemudaan
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">
              DPW Pemuda Perindo DKI Jakarta
            </h1>
            <p className="text-xs text-sky-50 mt-1">
              Koordinator Wilayah: <strong>{person?.name}</strong> · Struktur Independen di Bawah Koordinasi DPP
            </p>
          </div>
          <button
            onClick={() => onNavigate('/app/programs')}
            className="px-4 py-2 bg-white text-sky-700 hover:bg-sky-50 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer"
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
      </motion.div>
    );
  }

  // 4. TPS WITNESS DASHBOARD
  if (role === 'TPS_WITNESS') {
    const assignedTps = pollingStations[0];
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
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
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Vote className="w-3.5 h-3.5" />
            <span>Isi Form C1 Plano</span>
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
      </motion.div>
    );
  }

  // 5. EXECUTIVE COMMAND CENTER & DPP ADMIN DASHBOARD
  if (role === 'EXECUTIVE' || role === 'DPP_ADMIN') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white rounded-2xl p-6 shadow-md border border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-sky-100 uppercase tracking-widest">
              DEWAN PIMPINAN PUSAT (DPP) — KOMANDO OPERASIONAL
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">
              Pusat Kendali Administrasi & Eksekutif Nasional
            </h1>
            <p className="text-xs text-sky-50 mt-1">
              Pejabat DPP: <strong>{person?.name}</strong> ({workspace?.roleTitle})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/app/executive')}
              className="px-4 py-2 bg-white text-sky-700 hover:bg-sky-50 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer shadow-xs"
            >
              Command Center Nasional &rarr;
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-200">
            <span className="text-xs text-sky-800 font-medium">Total Kader Nasional</span>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-1 tabular-nums">42.500</div>
            <div className="text-[11px] text-sky-700 mt-0.5">38 Provinsi Terpetakan</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sky-200">
            <span className="text-xs text-slate-500">Kelengkapan DPD (Kab/Kota)</span>
            <div className="text-2xl font-bold text-sky-600 font-mono mt-1 tabular-nums">94.2%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Struktur SK Definitif</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sky-200">
            <span className="text-xs text-slate-500">Realisasi Program Kerakyatan</span>
            <div className="text-2xl font-bold text-emerald-700 font-mono mt-1 tabular-nums">Rp420,9 Jt</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Serapan UMKM & Sosial</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-sky-200">
            <span className="text-xs text-slate-500">Kesiapan Jaringan Saksi</span>
            <div className="text-2xl font-bold text-sky-700 font-mono mt-1 tabular-nums">88.5%</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Saksi Terplot ke TPS</div>
          </div>
        </div>

        {renderDailyDirectivesDesk()}

        <div className="p-4 rounded-xl bg-sky-50 text-sky-900 text-xs border border-sky-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-600" />
            <span>
              Prinsip Perlindungan Data Eksekutif: Menampilkan statistik agregat tanpa mengurai NIK atau identitas privat perorangan.
            </span>
          </div>
          <button
            onClick={() => onNavigate('/privasi')}
            className="text-sky-700 font-semibold hover:underline shrink-0 cursor-pointer"
          >
            Kebijakan Privasi
          </button>
        </div>

        {renderModals()}
      </motion.div>
    );
  }

  // 6. TECH OPERATOR DASHBOARD
  if (role === 'TECH_OPERATOR') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl p-6 shadow-md border border-sky-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold text-sky-100 uppercase tracking-widest">
              SYSTEM RELIABILITY CONSOLE
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">
              Kesehatan Infrastruktur & Log Audit
            </h1>
            <p className="text-xs text-sky-50 mt-1">
              Operator: <strong>{person?.name}</strong> · Hak Akses: Observasi Sistem & Keamanan
            </p>
          </div>
          <button
            onClick={() => onNavigate('/app/admin/health')}
            className="px-4 py-2 bg-white text-sky-700 hover:bg-sky-50 rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer"
          >
            Diagnostik Penuh &rarr;
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
          <h2 className="font-bold text-sm text-slate-900">Peristiwa Audit Terkini</h2>
          <div className="divide-y divide-slate-100 text-xs">
            {auditLogs.slice(0, 4).map((log) => (
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
      </motion.div>
    );
  }

  // Fallback for other roles (CANDIDATE_EVALUATOR, TPS_VERIFIER, INSTITUTION_MANAGER)
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Meja Kerja {workspace?.roleTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Unit: {workspace?.unitName} ({workspace?.regionScopeLabel})
          </p>
        </div>
        <button
          onClick={() => onNavigate('/app/services')}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          Buka Layanan & Advokasi
        </button>
      </div>
      {renderDailyDirectivesDesk()}
      {renderModals()}
    </motion.div>
  );

  function renderModals() {
    return (
      <>
        {/* Issue New Directive Modal */}
        {isDirectiveModalOpen && (
          <div className="fixed inset-0 z-50 bg-sky-950/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-sky-200 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-amber-200" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Terbitkan Instruksi / Disposisi Berjenjang
                  </span>
                </div>
                <button
                  onClick={() => setIsDirectiveModalOpen(false)}
                  className="text-sky-100 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateDirective} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Pokok Instruksi / Disposisi Harian <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={dirTitle}
                    onChange={(e) => setDirTitle(e.target.value)}
                    placeholder="Contoh: Konsolidasi Saksi TPS & Verifikasi KTA Ranting"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Jenjang Sasaran
                    </label>
                    <select
                      value={dirTargetLevel}
                      onChange={(e) =>
                        setDirTargetLevel(e.target.value as DirectiveItem['targetLevel'])
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                    >
                      <option value="SEMUA_JENJANG">Seluruh Jenjang (Nasional)</option>
                      <option value="DPW">DPW (Provinsi)</option>
                      <option value="DPD">DPD (Kabupaten/Kota)</option>
                      <option value="DPC">DPC (Kecamatan)</option>
                      <option value="DPRT">DPRt (Kelurahan/Ranting)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Tingkat Prioritas
                    </label>
                    <select
                      value={dirPriority}
                      onChange={(e) =>
                        setDirPriority(e.target.value as DirectiveItem['priority'])
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                    >
                      {role === 'KETUA_UMUM' && (
                        <option value="INSTRUKSI_KHUSUS_KETUM">
                          Instruksi Khusus Ketua Umum
                        </option>
                      )}
                      <option value="PENTING">Prioritas Penting</option>
                      <option value="BIASA">Operasional Biasa</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Wilayah Sasaran
                    </label>
                    <input
                      type="text"
                      value={dirTargetRegion}
                      onChange={(e) => setDirTargetRegion(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Batas Waktu Pelaporan
                    </label>
                    <input
                      type="text"
                      value={dirDeadline}
                      onChange={(e) => setDirDeadline(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Arahan Tindak Lanjut Awal
                  </label>
                  <textarea
                    rows={2}
                    value={dirNotes}
                    onChange={(e) => setDirNotes(e.target.value)}
                    placeholder="Rincian target kerja harian yang wajib dilaporkan pengurus bawahan..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsDirectiveModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Terbitkan Sekarang
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Directive Progress Modal */}
        {selectedDirective && (
          <div className="fixed inset-0 z-50 bg-sky-950/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-sky-200 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">
                  Laporkan Progres Pelaksanaan Instruksi
                </span>
                <button
                  onClick={() => setSelectedDirective(null)}
                  className="text-sky-100 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs">
                <div className="font-bold text-slate-900">{selectedDirective.title}</div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Catatan Realisasi Lapangan ({workspace?.unitName})
                  </label>
                  <textarea
                    rows={3}
                    value={progressNoteInput}
                    onChange={(e) => setProgressNoteInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleSaveDirectiveProgress(selectedDirective, 'SEDANG_DIKERJAKAN')
                    }
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold cursor-pointer"
                  >
                    Simpan Progres
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSaveDirectiveProgress(selectedDirective, 'SELESAI_DILAPORKAN')
                    }
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold cursor-pointer"
                  >
                    Tandai Selesai Dilaporkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
};
