import React, { createContext, useContext, useState, useEffect } from 'react';
import { Account, Person, Workspace, UserRole } from '../types';
import { MOCK_ACCOUNTS, MOCK_PERSONS } from '../data/mockData';

interface AuthContextType {
  account: Account | null;
  person: Person | null;
  workspace: Workspace | null;
  allAccounts: Account[];
  loginAs: (accountId: string, workspaceId?: string) => void;
  switchWorkspace: (workspaceId: string) => void;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
  canAccessRoute: (pathname: string) => { allowed: boolean; reason?: string };
  checkUnitAccess: (targetUnitId: string) => { allowed: boolean; reason?: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_ACC = 'perindo_demo_account_id';
const STORAGE_KEY_WS = 'perindo_demo_workspace_id';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default demo user: Ahmad Fauzi (DPC Menteng)
  const [accountId, setAccountId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_ACC) || 'ACC-001';
  });

  const account = MOCK_ACCOUNTS.find((a) => a.id === accountId) || null;
  const person = account ? MOCK_PERSONS.find((p) => p.id === account.personId) || null : null;

  const [workspaceId, setWorkspaceId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_WS);
    if (account && saved && account.workspaces.some((w) => w.id === saved)) {
      return saved;
    }
    return account ? account.workspaces[0]?.id || '' : '';
  });

  const workspace = account ? account.workspaces.find((w) => w.id === workspaceId) || account.workspaces[0] || null : null;

  useEffect(() => {
    if (accountId) {
      localStorage.setItem(STORAGE_KEY_ACC, accountId);
    } else {
      localStorage.removeItem(STORAGE_KEY_ACC);
    }
  }, [accountId]);

  useEffect(() => {
    if (workspaceId) {
      localStorage.setItem(STORAGE_KEY_WS, workspaceId);
    } else {
      localStorage.removeItem(STORAGE_KEY_WS);
    }
  }, [workspaceId]);

  const loginAs = (targetAccountId: string, targetWsId?: string) => {
    const foundAcc = MOCK_ACCOUNTS.find((a) => a.id === targetAccountId);
    if (foundAcc) {
      setAccountId(targetAccountId);
      if (targetWsId && foundAcc.workspaces.some((w) => w.id === targetWsId)) {
        setWorkspaceId(targetWsId);
      } else {
        setWorkspaceId(foundAcc.workspaces[0]?.id || '');
      }
    }
  };

  const switchWorkspace = (targetWsId: string) => {
    if (account && account.workspaces.some((w) => w.id === targetWsId)) {
      setWorkspaceId(targetWsId);
    }
  };

  const logout = () => {
    setAccountId('');
    setWorkspaceId('');
    localStorage.removeItem(STORAGE_KEY_ACC);
    localStorage.removeItem(STORAGE_KEY_WS);
  };

  const hasRole = (roles: UserRole[]): boolean => {
    if (!workspace) return false;
    return roles.includes(workspace.role);
  };

  // Route permission evaluator
  const canAccessRoute = (pathname: string): { allowed: boolean; reason?: string } => {
    if (!workspace) {
      return { allowed: false, reason: 'Sesi belum terautentikasi. Silakan masuk akun demo.' };
    }

    const role = workspace.role;

    if (pathname.startsWith('/app/executive')) {
      if (role === 'EXECUTIVE' || role === 'DPP_ADMIN') {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: 'Modul Executive Command Center hanya dapat diakses oleh pimpinan tingkat Dewan Pimpinan Pusat (DPP) atau Administrator Nasional.',
      };
    }

    if (pathname.startsWith('/app/admin/health')) {
      if (role === 'TECH_OPERATOR' || role === 'DPP_ADMIN') {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: 'Modul Diagnostik Sistem & Audit Log hanya terbuka bagi peran Technical Operator dan DPP Admin demi integritas sistem.',
      };
    }

    if (pathname.startsWith('/app/candidates')) {
      if (['CANDIDATE_EVALUATOR', 'DPD_MANAGER', 'DPW_MANAGER', 'DPP_ADMIN', 'EXECUTIVE'].includes(role)) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: 'Penilaian rubrik seleksi bakal calon dibatasi untuk Evaluator Resmi dan Pimpinan Pengambil Kebijakan Wilayah.',
      };
    }

    if (pathname.startsWith('/app/elections')) {
      if (['TPS_WITNESS', 'TPS_VERIFIER', 'DPC_MANAGER', 'DPD_MANAGER', 'DPW_MANAGER', 'DPP_ADMIN', 'EXECUTIVE'].includes(role)) {
        return { allowed: true };
      }
      return {
        allowed: false,
        reason: 'Sistem Pelaporan TPS hanya dibuka untuk Saksi Mandat, Tim Verifikator, serta Struktur Pengurus Wilayah terkait.',
      };
    }

    if (pathname.startsWith('/app/members')) {
      // Tech Operator and Executive shouldn't access raw member PII
      if (role === 'TECH_OPERATOR') {
        return {
          allowed: false,
          reason: 'Prinsip Privacy by Design: Technical Operator dilarang mengakses data identitas perseorangan (PII) kader.',
        };
      }
      return { allowed: true };
    }

    // Default routes (/app/overview, /app/organizations, /app/programs, /app/activities, /app/services, /app/approvals, /app/profile)
    return { allowed: true };
  };

  // Check whether active workspace unit has permission to inspect another unit (e.g. cross-region isolation)
  const checkUnitAccess = (targetUnitId: string): { allowed: boolean; reason?: string } => {
    if (!workspace) return { allowed: false, reason: 'Tidak terotentikasi.' };

    const role = workspace.role;
    // DPP and Executive have national scope
    if (['DPP_ADMIN', 'EXECUTIVE', 'TECH_OPERATOR'].includes(role)) {
      return { allowed: true };
    }

    // Autonomous Sayap and Institution have their own tree
    if (role === 'WING_MANAGER' || role === 'INSTITUTION_MANAGER') {
      if (targetUnitId === workspace.unitId) return { allowed: true };
      return {
        allowed: false,
        reason: 'Otonomi Struktur: Akses dibatasi pada hierarki internal Sayap/Badan Anda, bukan struktur partai induk.',
      };
    }

    // DPC Menteng (DKI Jakarta) trying to read Jawa Barat (Bandung)
    if (targetUnitId.includes('JABAR') || targetUnitId.includes('BANDUNG')) {
      if (workspace.unitId.includes('MENTENG') || workspace.unitId.includes('JAKPUS') || workspace.unitId.includes('DKI')) {
        return {
          allowed: false,
          reason: 'Akses Wilayah Ditolak (Cross-Region Boundary Enforced). Struktur DPC Menteng (DKI Jakarta) tidak berwenang memeriksa unit administratif di wilayah Jawa Barat.',
        };
      }
    }

    return { allowed: true };
  };

  return (
    <AuthContext.Provider
      value={{
        account,
        person,
        workspace,
        allAccounts: MOCK_ACCOUNTS,
        loginAs,
        switchWorkspace,
        logout,
        hasRole,
        canAccessRoute,
        checkUnitAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
