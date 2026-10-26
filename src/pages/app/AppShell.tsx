import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  TrendingUp,
  HeartHandshake,
  FileCheck2,
  Vote,
  Award,
  BarChart3,
  ActivitySquare,
  LogOut,
  ChevronDown,
  Layers,
  Sliders,
  Menu,
  X,
  Crown,
  Shield,
  CreditCard,
  Eye,
} from 'lucide-react';
import { WingLogo } from '../../components/common/WingLogo';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { motion } from 'framer-motion';

interface AppShellProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInspector: () => void;
  children: React.ReactNode;
}

const HIERARCHY_QUICK_ROLES = [
  {
    accountId: 'ACC-KETUM',
    workspaceId: 'WS-KETUM-NASIONAL',
    shortLabel: 'Ketua Umum',
    subLabel: 'Otoritas Nasional',
    levelBadge: 'KETUM',
  },
  {
    accountId: 'ACC-004',
    workspaceId: 'WS-EXEC-DPP',
    shortLabel: 'DPP Pusat',
    subLabel: 'Sekjen / Eksekutif',
    levelBadge: 'DPP',
  },
  {
    accountId: 'ACC-DPW',
    workspaceId: 'WS-DPW-DKI',
    shortLabel: 'DPW Provinsi',
    subLabel: 'DKI Jakarta',
    levelBadge: 'DPW',
  },
  {
    accountId: 'ACC-DPD',
    workspaceId: 'WS-DPD-JAKPUS',
    shortLabel: 'DPD Kab/Kota',
    subLabel: 'Jakarta Pusat',
    levelBadge: 'DPD',
  },
  {
    accountId: 'ACC-001',
    workspaceId: 'WS-DPC-MENTENG',
    shortLabel: 'DPC Kecamatan',
    subLabel: 'Kec. Menteng',
    levelBadge: 'DPC',
  },
  {
    accountId: 'ACC-DPRT',
    workspaceId: 'WS-DPRT-KEBONSIRIH',
    shortLabel: 'DPRt Kelurahan',
    subLabel: 'Kel. Kebon Sirih',
    levelBadge: 'DPRt',
  },
];

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSection {
  group: string;
  items: NavItem[];
}

function getNavSectionsForRole(role: UserRole | undefined, showAllModules: boolean): NavSection[] {
  const allModules: NavSection[] = [
    {
      group: 'Utama & Struktur',
      items: [
        { path: '/app/overview', label: 'Meja Kerja Harian', icon: LayoutDashboard },
        { path: '/app/members', label: 'Database Kader & KTA', icon: Users },
        { path: '/app/organizations', label: 'Struktur Organisasi', icon: Building2 },
      ],
    },
    {
      group: 'Program & Layanan Harian',
      items: [
        { path: '/app/programs', label: 'Program & UMKM', icon: TrendingUp },
        { path: '/app/activities', label: 'Agenda & Kegiatan', icon: CalendarCheck },
        { path: '/app/services', label: 'Layanan & Aspirasi', icon: HeartHandshake },
        { path: '/app/approvals', label: 'Verifikasi & SK Berjenjang', icon: FileCheck2 },
      ],
    },
    {
      group: 'Pemilu & Komando Strategis',
      items: [
        { path: '/app/elections', label: 'Saksi TPS & Rekapitulasi', icon: Vote },
        { path: '/app/candidates', label: 'Rubrik Seleksi Caleg', icon: Award },
        { path: '/app/executive', label: 'Command Center Nasional', icon: BarChart3 },
        { path: '/app/admin/health', label: 'Diagnostik & Audit', icon: ActivitySquare },
      ],
    },
  ];

  if (showAllModules || !role || role === 'KETUA_UMUM' || role === 'DPP_ADMIN' || role === 'EXECUTIVE') {
    if (role === 'KETUA_UMUM') {
      return [
        {
          group: 'Komando Ketua Umum',
          items: [
            { path: '/app/overview', label: 'Meja Kerja Ketua Umum', icon: Crown, badge: 'KETUM' },
            { path: '/app/executive', label: 'Command Center Nasional', icon: BarChart3 },
            { path: '/app/approvals', label: 'Pengesahan SK Definitif', icon: FileCheck2, badge: 'OTORITAS' },
          ],
        },
        {
          group: 'Struktur & Kader Nasional',
          items: [
            { path: '/app/organizations', label: 'Pohon Struktur 6 Jenjang', icon: Building2 },
            { path: '/app/members', label: 'Database Kader & KTA', icon: Users },
            { path: '/app/programs', label: 'Program Kerakyatan & UMKM', icon: TrendingUp },
            { path: '/app/activities', label: 'Agenda & Konsolidasi', icon: CalendarCheck },
            { path: '/app/services', label: 'Aspirasi & Advokasi Rakyat', icon: HeartHandshake },
          ],
        },
        {
          group: 'Pemenangan Pemilu & Audit',
          items: [
            { path: '/app/candidates', label: 'Seleksi Caleg Nasional', icon: Award },
            { path: '/app/elections', label: 'Tabulasi Saksi TPS Nasional', icon: Vote },
            { path: '/app/admin/health', label: 'Audit & Integritas Sistem', icon: ActivitySquare },
          ],
        },
      ];
    }
    return allModules;
  }

  switch (role) {
    case 'DPW_MANAGER':
      return [
        {
          group: 'Komando DPW Provinsi',
          items: [
            { path: '/app/overview', label: 'Meja Kerja DPW Provinsi', icon: LayoutDashboard, badge: 'DPW' },
            { path: '/app/organizations', label: 'Struktur DPW & DPD Kab/Kota', icon: Building2 },
            { path: '/app/members', label: 'Database Kader & KTA Provinsi', icon: Users },
          ],
        },
        {
          group: 'Operasional & Verifikasi Wilayah',
          items: [
            { path: '/app/approvals', label: 'Rekomendasi SK Wilayah', icon: FileCheck2 },
            { path: '/app/programs', label: 'Program & UMKM Wilayah', icon: TrendingUp },
            { path: '/app/activities', label: 'Agenda Konsolidasi Provinsi', icon: CalendarCheck },
            { path: '/app/services', label: 'Layanan & Aspirasi Wilayah', icon: HeartHandshake },
          ],
        },
        {
          group: 'Pemenangan Pemilu Provinsi',
          items: [
            { path: '/app/candidates', label: 'Penjaringan Caleg DPRD Prov', icon: Award },
            { path: '/app/elections', label: 'Koordinasi Saksi Provinsi', icon: Vote },
          ],
        },
      ];

    case 'DPD_MANAGER':
      return [
        {
          group: 'Komando DPD Kab/Kota',
          items: [
            { path: '/app/overview', label: 'Meja Kerja DPD Kab/Kota', icon: LayoutDashboard, badge: 'DPD' },
            { path: '/app/organizations', label: 'Struktur DPD, DPC & DPRt', icon: Building2 },
            { path: '/app/members', label: 'Kader & Penerbitan KTA', icon: Users },
          ],
        },
        {
          group: 'Program & Administrasi Daerah',
          items: [
            { path: '/app/approvals', label: 'Verifikasi SK DPC & DPRt', icon: FileCheck2 },
            { path: '/app/programs', label: 'Distribusi Gerobak & UMKM', icon: TrendingUp },
            { path: '/app/activities', label: 'Jadwal Kunjungan & Rapat', icon: CalendarCheck },
            { path: '/app/services', label: 'Posko Aspirasi Kab/Kota', icon: HeartHandshake },
          ],
        },
        {
          group: 'Pemenangan Pemilu Daerah',
          items: [
            { path: '/app/candidates', label: 'Seleksi Caleg DPRD Kab/Kota', icon: Award },
            { path: '/app/elections', label: 'Rekapitulasi Saksi Daerah', icon: Vote },
          ],
        },
      ];

    case 'DPC_MANAGER':
      return [
        {
          group: 'Operasional DPC Kecamatan',
          items: [
            { path: '/app/overview', label: 'Meja Kerja DPC Kecamatan', icon: LayoutDashboard, badge: 'DPC' },
            { path: '/app/members', label: 'Rekrutmen Kader & Cetak KTA', icon: Users },
            { path: '/app/organizations', label: 'Struktur DPC & Ranting DPRt', icon: Building2 },
          ],
        },
        {
          group: 'Pembinaan Warga & Ranting',
          items: [
            { path: '/app/programs', label: 'Bantuan UMKM Kecamatan', icon: TrendingUp },
            { path: '/app/activities', label: 'Agenda & Sapa Warga', icon: CalendarCheck },
            { path: '/app/services', label: 'Posko Aspirasi Kecamatan', icon: HeartHandshake },
            { path: '/app/approvals', label: 'Pengajuan SK Pengurus', icon: FileCheck2 },
            { path: '/app/elections', label: 'Koordinasi Saksi Kecamatan', icon: Vote },
          ],
        },
      ];

    case 'DPRT_MANAGER':
      return [
        {
          group: 'Ujung Tombak DPRt Kelurahan',
          items: [
            { path: '/app/overview', label: 'Meja Kerja DPRt Kelurahan', icon: LayoutDashboard, badge: 'DPRt' },
            { path: '/app/members', label: 'Pendataan Kader & KTA Warga', icon: Users },
            { path: '/app/activities', label: 'Rembug RW/RT & Kegiatan', icon: CalendarCheck },
          ],
        },
        {
          group: 'Layanan Warga & TPS',
          items: [
            { path: '/app/services', label: 'Aspirasi & Bantuan Warga', icon: HeartHandshake },
            { path: '/app/elections', label: 'Data Saksi TPS & C1 Plano', icon: Vote },
            { path: '/app/approvals', label: 'Permohonan SK Ranting & KTA', icon: FileCheck2 },
            { path: '/app/organizations', label: 'Info Struktur Kelurahan', icon: Building2 },
          ],
        },
      ];

    case 'WING_MANAGER':
      return [
        {
          group: 'Sayap Otonom Partai',
          items: [
            { path: '/app/overview', label: 'Meja Kerja Sayap Otonom', icon: LayoutDashboard, badge: 'SAYAP' },
            { path: '/app/members', label: 'Database Kader Muda & KTA', icon: Users },
            { path: '/app/programs', label: 'Program Vokasi & Kepemudaan', icon: TrendingUp },
            { path: '/app/activities', label: 'Agenda & Pelatihan Kader', icon: CalendarCheck },
            { path: '/app/approvals', label: 'Proposal & SK Sayap', icon: FileCheck2 },
            { path: '/app/organizations', label: 'Hierarki Otonom Sayap', icon: Building2 },
          ],
        },
      ];

    case 'TPS_WITNESS':
    case 'TPS_VERIFIER':
      return [
        {
          group: 'Tugas Mandat Saksi & TPS',
          items: [
            { path: '/app/overview', label: 'Meja Tugas Saksi TPS', icon: LayoutDashboard, badge: 'TPS' },
            { path: '/app/elections', label: 'Input C1 Plano & Rekap Suara', icon: Vote },
            { path: '/app/services', label: 'Hotline Advokasi LBH', icon: HeartHandshake },
            { path: '/app/profile', label: 'Profil & KTA Saksi Resmi', icon: CreditCard },
          ],
        },
      ];

    case 'MEMBER':
      return [
        {
          group: 'Portal Kader & Anggota',
          items: [
            { path: '/app/overview', label: 'Beranda Anggota & KTA', icon: LayoutDashboard, badge: 'KADER' },
            { path: '/app/profile', label: 'KTA Digital & Biodata Saya', icon: CreditCard },
            { path: '/app/activities', label: 'Agenda Ranting Terdekat', icon: CalendarCheck },
            { path: '/app/services', label: 'Ajukan Aspirasi / Bantuan', icon: HeartHandshake },
          ],
        },
      ];

    case 'TECH_OPERATOR':
      return [
        {
          group: 'Infrastruktur & Keamanan',
          items: [
            { path: '/app/overview', label: 'Konsol Keamanan Sistem', icon: LayoutDashboard, badge: 'OPS' },
            { path: '/app/admin/health', label: 'Diagnostik & Audit Logs', icon: ActivitySquare },
            { path: '/app/organizations', label: 'Topologi Unit Sistem', icon: Building2 },
          ],
        },
      ];

    default:
      return allModules;
  }
}

export const AppShell: React.FC<AppShellProps> = ({
  currentPath,
  onNavigate,
  onOpenInspector,
  children,
}) => {
  const { account, person, workspace, loginAs, switchWorkspace, logout, isNationalRole } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);
  const [showAllMenus, setShowAllMenus] = useState(false);

  const navSections = getNavSectionsForRole(workspace?.role, showAllMenus);
  const totalRoleItems = navSections.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <div className="min-h-screen bg-[#F4F9FF] flex flex-col">
      {/* Institutional Topbar */}
      <header className="bg-white border-b border-sky-200/80 sticky top-0 z-30 shadow-2xs">
        {/* Fresh Light Blue to Perindo Red Hairline Stripe */}
        <div className="h-[3px] w-full bg-gradient-to-r from-sky-400 via-sky-500 to-[#D7283F]" />

        <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Left: Mobile hamburger + Brand & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-sky-700 hover:text-sky-950 rounded-lg hover:bg-sky-50"
              aria-label="Toggle Menu Sidebar"
            >
              {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => onNavigate('/app/overview')}
              className="focus:outline-hidden text-left transition-transform hover:scale-[1.02]"
            >
              <WingLogo size={32} />
            </button>

            {/* Breadcrumb divider */}
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 pl-4 border-l border-sky-100">
              <span className="text-sky-700 font-semibold">Portal Organisasi</span>
              <span>/</span>
              <span className="font-bold text-slate-800 capitalize">
                {currentPath.replace('/app/', '').replace('-', ' ') || 'Overview'}
              </span>
            </div>
          </div>

          {/* Right: Workspace Switcher + Role Inspector + User Profile */}
          <div className="flex items-center gap-2.5">
            {/* Workspace Switcher Dropdown */}
            {account && (
              <div className="relative">
                <button
                  onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-sky-200 bg-sky-50/70 hover:bg-sky-100/80 text-xs text-sky-900 transition-colors cursor-pointer"
                  title="Ganti Penugasan / SK"
                >
                  {workspace?.role === 'KETUA_UMUM' ? (
                    <Crown className="w-3.5 h-3.5 text-amber-600" />
                  ) : (
                    <Layers className="w-3.5 h-3.5 text-sky-600" />
                  )}
                  <span className="font-semibold max-w-[140px] sm:max-w-[200px] truncate">
                    {workspace?.roleTitle || 'Pilih Workspace'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-sky-500" />
                </button>

                {workspaceDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-sky-200 py-2 z-50 text-xs">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-sky-600 border-b border-sky-100">
                      Penugasan SK Aktif ({person?.name})
                    </div>
                    {account.workspaces.map((ws) => (
                      <button
                        key={ws.id}
                        onClick={() => {
                          switchWorkspace(ws.id);
                          setWorkspaceDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 hover:bg-sky-50 transition-colors flex items-center justify-between ${
                          workspace?.id === ws.id
                            ? 'bg-sky-100/70 font-semibold text-sky-900'
                            : 'text-slate-700'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <div className="truncate">{ws.name}</div>
                          <div className="text-[10px] text-slate-500 font-normal">
                            {ws.roleTitle} · {ws.regionScopeLabel}
                          </div>
                        </div>
                        {workspace?.id === ws.id && (
                          <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0"></span>
                        )}
                      </button>
                    ))}
                    <div className="pt-2 mt-1 border-t border-sky-100 px-3 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setWorkspaceDropdownOpen(false);
                          onNavigate('/pilih-workspace');
                        }}
                        className="text-sky-700 hover:underline text-[11px] font-semibold"
                      >
                        Semua Penugasan &rarr;
                      </button>
                      <button
                        onClick={() => {
                          setWorkspaceDropdownOpen(false);
                          onOpenInspector();
                        }}
                        className="text-slate-600 hover:text-slate-900 text-[11px] font-medium"
                      >
                        Panel Peran Lengkap
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* User Profile and Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-sky-100">
              <button
                onClick={() => onNavigate('/app/profile')}
                className="flex items-center gap-2 text-left hover:opacity-85 transition-opacity cursor-pointer"
                title="Buka Profil Pengguna"
              >
                <div
                  className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs ring-2 ${
                    workspace?.role === 'KETUA_UMUM'
                      ? 'bg-gradient-to-br from-sky-500 to-blue-600 ring-amber-400'
                      : 'bg-gradient-to-br from-sky-500 to-blue-600 ring-sky-200'
                  }`}
                >
                  {person ? person.name.substring(0, 1) : 'U'}
                </div>
                <div className="hidden xl:block">
                  <div className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[130px]">
                    {person?.name || 'User'}
                  </div>
                  <div className="text-[10px] text-sky-600 font-mono font-semibold truncate">
                    {workspace?.level || 'DPP'} · {workspace?.regionScopeLabel}
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  logout();
                  onNavigate('/login');
                }}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                title="Keluar dari Akun"
                aria-label="Keluar"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Fresh Light-Blue Hierarchical Role Switcher Bar (Ketum -> DPP -> DPW -> DPD -> DPC -> DPRt) */}
        <div className="bg-gradient-to-r from-sky-50 via-blue-50/90 to-sky-100/70 text-sky-950 px-4 sm:px-6 py-2 border-t border-sky-200/80 flex items-center justify-between gap-3 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-bold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-sky-600" />
              Simulasi Jenjang Jabatan:
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {HIERARCHY_QUICK_ROLES.map((item) => {
              const isActive =
                account?.id === item.accountId && workspace?.id === item.workspaceId;
              return (
                <button
                  key={item.workspaceId}
                  onClick={() => {
                    loginAs(item.accountId, item.workspaceId);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-sky-600 text-white font-bold shadow-xs ring-2 ring-sky-300'
                      : 'bg-white/90 hover:bg-sky-100 text-sky-900 border border-sky-200/90 font-medium'
                  }`}
                >
                  <span
                    className={`font-mono text-[9px] px-1.5 py-0.2 rounded font-bold ${
                      isActive
                        ? 'bg-white/25 text-white'
                        : 'bg-sky-100 text-sky-700'
                    }`}
                  >
                    {item.levelBadge}
                  </span>
                  <span>{item.shortLabel}</span>
                  <span className="hidden md:inline text-[10px] opacity-80">
                    ({item.subLabel})
                  </span>
                </button>
              );
            })}

            <button
              onClick={onOpenInspector}
              className="px-2.5 py-1 rounded-lg text-[11px] bg-sky-100 hover:bg-sky-200/80 text-sky-800 font-semibold flex items-center gap-1 shrink-0 border border-sky-300/80 cursor-pointer ml-1"
              title="Pilih peran Sayap, LBH, Saksi TPS, atau DPW Jawa Barat"
            >
              <Sliders className="w-3 h-3 text-sky-600" />
              <span>Peran Lainnya</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (264px) */}
        <aside className="hidden lg:flex flex-col w-66 bg-white border-r border-sky-200/80 shrink-0 select-none">
          {/* Active Unit & Authority Badge Card in Fresh Light Blue */}
          <div className="p-4 border-b border-sky-100 bg-gradient-to-br from-sky-50/90 via-blue-50/50 to-white space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-sky-700 tracking-wider">
                Wewenang Aktif
              </span>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                  workspace?.role === 'KETUA_UMUM'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : isNationalRole
                    ? 'bg-sky-100 text-sky-800 border border-sky-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {workspace?.role === 'KETUA_UMUM'
                  ? 'OTORITAS PENUH'
                  : isNationalRole
                  ? 'NASIONAL'
                  : `TERITORIAL ${workspace?.level}`}
              </span>
            </div>
            <div className="text-xs font-bold text-slate-900 truncate">
              {workspace?.unitName || 'DPP Pusat'}
            </div>
            <div className="text-[11px] text-sky-700 font-medium truncate">
              Cakupan: {workspace?.regionScopeLabel || 'Nasional'}
            </div>
            <div className="pt-1.5 flex items-center justify-between border-t border-sky-200/60 text-[10px]">
              <span className="text-sky-800 font-semibold">
                Menu Peran ({totalRoleItems} Modul)
              </span>
              {!isNationalRole && (
                <button
                  onClick={() => setShowAllMenus(!showAllMenus)}
                  className="text-sky-600 hover:text-sky-800 underline font-semibold cursor-pointer flex items-center gap-0.5"
                  title="Tampilkan seluruh modul atau khusus jabatan ini"
                >
                  <Eye className="w-3 h-3" />
                  <span>{showAllMenus ? 'Sesuai Peran' : 'Semua Menu'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-medium">
            {navSections.map((section) => (
              <div key={section.group} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-600/80">
                  {section.group}
                </div>
                {section.items.map((item) => {
                  const isActive = currentPath === item.path;
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.path}
                      onClick={() => onNavigate(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                        isActive
                          ? 'bg-sky-100/90 text-sky-950 font-bold shadow-2xs border-l-[3.5px] border-sky-500'
                          : 'text-slate-700 hover:bg-sky-50/80 hover:text-sky-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-sky-600' : 'text-slate-400'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                            isActive
                              ? 'bg-sky-600 text-white'
                              : 'bg-sky-100 text-sky-700'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Bottom Sidebar Institutional Badge */}
          <div className="p-3 border-t border-sky-100 bg-sky-50/60">
            <div className="flex items-center gap-2 text-[11px] text-sky-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="font-semibold truncate">Hierarki 6 Jenjang Aktif</span>
            </div>
            <div className="text-[10px] text-sky-700/80 mt-0.5 font-medium">
              Ketum · DPP · DPW · DPD · DPC · DPRt
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-sky-950/30 backdrop-blur-2xs"
              onClick={() => setMobileSidebarOpen(false)}
            ></div>
            <aside className="relative w-72 max-w-[80%] bg-white h-full shadow-2xl flex flex-col z-10 border-r border-sky-200">
              <div className="p-4 border-b border-sky-100 bg-sky-50/50 flex items-center justify-between">
                <WingLogo size={28} />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-sky-600 hover:text-sky-900 hover:bg-sky-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-medium">
                {navSections.map((section) => (
                  <div key={section.group} className="space-y-1">
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-600">
                      {section.group}
                    </div>
                    {section.items.map((item) => {
                      const isActive = currentPath === item.path;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => {
                            onNavigate(item.path);
                            setMobileSidebarOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                            isActive
                              ? 'bg-sky-100 text-sky-950 font-bold border-l-4 border-sky-500'
                              : 'text-slate-700 hover:bg-sky-50 hover:text-sky-900'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Icon
                              className={`w-4 h-4 ${
                                isActive ? 'text-sky-600' : 'text-slate-400'
                              }`}
                            />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-sky-200/80 text-sky-800">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t border-sky-100 bg-sky-50/40">
                <button
                  onClick={() => {
                    onOpenInspector();
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-semibold text-center transition-colors"
                >
                  Buka Panel Peran & Wilayah
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <motion.div
            key={`${currentPath}-${workspace?.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
