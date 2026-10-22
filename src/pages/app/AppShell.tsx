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
  User,
  LogOut,
  ChevronDown,
  Layers,
  Sliders,
  Menu,
  X,
  Lock,
  ChevronRight,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { WingLogo } from '../../components/common/WingLogo';
import { useAuth } from '../../context/AuthContext';

interface AppShellProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenInspector: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentPath,
  onNavigate,
  onOpenInspector,
  children,
}) => {
  const { account, person, workspace, switchWorkspace, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [workspaceDropdownOpen, setWorkspaceDropdownOpen] = useState(false);

  // Grouped Navigation structure (3 core groups)
  const navSections = [
    {
      group: 'Utama',
      items: [
        { path: '/app/overview', label: 'Ringkasan Kerja', icon: LayoutDashboard },
        { path: '/app/members', label: 'Database Kader', icon: Users, reqRoles: ['MEMBER', 'DPRT_MANAGER', 'DPC_MANAGER', 'DPD_MANAGER', 'DPW_MANAGER', 'DPP_ADMIN', 'WING_MANAGER', 'INSTITUTION_MANAGER', 'EXECUTIVE'] },
        { path: '/app/organizations', label: 'Struktur Organisasi', icon: Building2 },
      ],
    },
    {
      group: 'Program & Layanan',
      items: [
        { path: '/app/programs', label: 'Program & UMKM', icon: TrendingUp },
        { path: '/app/activities', label: 'Agenda & Kegiatan', icon: CalendarCheck },
        { path: '/app/services', label: 'Layanan & Aspirasi', icon: HeartHandshake },
        { path: '/app/approvals', label: 'Verifikasi & SK', icon: FileCheck2 },
      ],
    },
    {
      group: 'Pemilu & Evaluasi',
      items: [
        { path: '/app/elections', label: 'Saksi TPS (Simulasi)', icon: Vote, reqRoles: ['TPS_WITNESS', 'TPS_VERIFIER', 'DPC_MANAGER', 'DPD_MANAGER', 'DPW_MANAGER', 'DPP_ADMIN', 'EXECUTIVE'] },
        { path: '/app/candidates', label: 'Rubrik Seleksi Caleg', icon: Award, reqRoles: ['CANDIDATE_EVALUATOR', 'DPD_MANAGER', 'DPW_MANAGER', 'DPP_ADMIN', 'EXECUTIVE'] },
        { path: '/app/executive', label: 'Command Center', icon: BarChart3, reqRoles: ['EXECUTIVE', 'DPP_ADMIN'] },
        { path: '/app/admin/health', label: 'Diagnostik Sistem', icon: ActivitySquare, reqRoles: ['TECH_OPERATOR', 'DPP_ADMIN'] },
      ],
    },
  ];

  const currentRole = workspace?.role || 'PUBLIC';

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col">
      {/* 64px Institutional Topbar */}
      <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Brand & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            aria-label="Toggle Menu Sidebar"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button onClick={() => onNavigate('/app/overview')} className="focus:outline-hidden text-left">
            <WingLogo size={32} />
          </button>

          {/* Breadcrumb divider */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 pl-4 border-l border-slate-200">
            <span>Portal Organisasi</span>
            <span>/</span>
            <span className="font-semibold text-slate-800 capitalize">
              {currentPath.replace('/app/', '').replace('-', ' ') || 'Overview'}
            </span>
          </div>
        </div>

        {/* Right: Workspace Switcher + Role Inspector + User Profile */}
        <div className="flex items-center gap-3">
          {/* Workspace Switcher Pill Dropdown */}
          {account && (
            <div className="relative">
              <button
                onClick={() => setWorkspaceDropdownOpen(!workspaceDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs text-slate-700 transition-colors"
                title="Ganti Penugasan / SK"
              >
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold max-w-[140px] sm:max-w-[180px] truncate">
                  {workspace?.roleTitle || 'Pilih Workspace'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {workspaceDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Penugasan SK Aktif
                  </div>
                  {account.workspaces.map((ws) => (
                    <button
                      key={ws.id}
                      onClick={() => {
                        switchWorkspace(ws.id);
                        setWorkspaceDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        workspace?.id === ws.id ? 'bg-blue-50/70 font-semibold text-blue-800' : 'text-slate-700'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="truncate">{ws.name}</div>
                        <div className="text-[10px] text-slate-500 font-normal">
                          {ws.roleTitle} · {ws.regionScopeLabel}
                        </div>
                      </div>
                      {workspace?.id === ws.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                      )}
                    </button>
                  ))}
                  <div className="pt-2 mt-1 border-t border-slate-100 px-3">
                    <button
                      onClick={() => {
                        setWorkspaceDropdownOpen(false);
                        onNavigate('/pilih-workspace');
                      }}
                      className="text-blue-700 hover:underline text-[11px] font-medium"
                    >
                      Kelola Semua Penugasan &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Inspector Trigger */}
          <button
            onClick={onOpenInspector}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-2xs"
            title="Buka panel tester untuk mengganti peran secara instan"
          >
            <Sliders className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Role Inspector</span>
          </button>

          {/* User Profile and Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <button
              onClick={() => onNavigate('/app/profile')}
              className="flex items-center gap-2 text-left hover:opacity-80 transition-opacity"
              title="Buka Profil Pengguna"
            >
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                {person ? person.name.substring(0, 1) : 'U'}
              </div>
              <div className="hidden xl:block">
                <div className="text-xs font-semibold text-slate-900 leading-tight truncate max-w-[110px]">
                  {person?.name || 'User'}
                </div>
                <div className="text-[10px] text-slate-500 font-mono truncate">
                  {person?.id || ''}
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                logout();
                onNavigate('/login');
              }}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="Keluar dari Akun Demo"
              aria-label="Keluar"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar (250px) */}
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 select-none">
          {/* Active Unit Badge Card */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/70">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Wilayah Kewenangan SK
            </div>
            <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
              {workspace?.unitName || 'DPP Pusat'}
            </div>
            <div className="text-[11px] text-blue-700 font-medium truncate mt-0.5">
              {workspace?.regionScopeLabel || 'Nasional'}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-medium">
            {navSections.map((section) => (
              <div key={section.group} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {section.group}
                </div>
                {section.items.map((item) => {
                  const isActive = currentPath === item.path;
                  const Icon = item.icon;
                  const hasRestrictedRole = item.reqRoles && !item.reqRoles.includes(currentRole);

                  return (
                    <button
                      key={item.path}
                      onClick={() => onNavigate(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#102C63] text-white font-semibold shadow-2xs'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {hasRestrictedRole && (
                        <span title="Akses dibatasi untuk peran ini">
                          <Lock className="w-3 h-3 text-slate-400" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Bottom Sidebar Notice */}
          <div className="p-3 border-t border-slate-200 bg-white">
            <button
              onClick={onOpenInspector}
              className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-700" />
              <span>Buka Demo Inspector</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-2xs"
              onClick={() => setMobileSidebarOpen(false)}
            ></div>
            <aside className="relative w-72 max-w-[80%] bg-white h-full shadow-2xl flex flex-col z-10">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <WingLogo size={28} />
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-medium">
                {navSections.map((section) => (
                  <div key={section.group} className="space-y-1">
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
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
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-[#102C63] text-white font-semibold'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t border-slate-200">
                <button
                  onClick={() => {
                    onOpenInspector();
                    setMobileSidebarOpen(false);
                  }}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold text-center"
                >
                  Buka Demo Inspector
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
