import React, { createContext, useContext, useState, useEffect } from 'react';
import { Account, Person, Workspace, UserRole } from '../types';
import { MOCK_ACCOUNTS, MOCK_PERSONS, MOCK_UNITS } from '../data/mockData';

interface AuthContextType {
  account: Account | null;
  person: Person | null;
  workspace: Workspace | null;
  allAccounts: Account[];
  isNationalRole: boolean;
  getManagedUnitIds: () => string[];
  loginAs: (accountId: string, workspaceId?: string) => void;
  switchWorkspace: (workspaceId: string) => void;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
  canAccessRoute: (pathname: string) => { allowed: boolean; reason?: string };
  checkUnitAccess: (targetUnitId: string) => { allowed: boolean; reason?: string };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY_ACC = 'perindo_demo_account_id_v2';
const STORAGE_KEY_WS = 'perindo_demo_workspace_id_v2';

// Helper to recursively collect a unit ID and all of its subordinate children in the territorial tree
const collectSubordinateUnitIds = (rootUnitId: string): string[] => {
  const result = new Set<string>([rootUnitId]);
  let added = true;
  while (added) {
    added = false;
    for (const u of MOCK_UNITS) {
      if (u.parentId && result.has(u.parentId) && !result.has(u.id)) {
        result.add(u.id);
        added = true;
      }
    }
  }
  return Array.from(result);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default user: Ketua Umum (Full National Access across all tiers)
  const [accountId, setAccountId] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY_ACC) || 'ACC-KETUM';
  });

  const account = MOCK_ACCOUNTS.find((a) => a.id === accountId) || MOCK_ACCOUNTS[0];
  const person = account ? MOCK_PERSONS.find((p) => p.id === account.personId) || null : null;

  const [workspaceId, setWorkspaceId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_WS);
    if (account && saved && account.workspaces.some((w) => w.id === saved)) {
      return saved;
    }
    return account ? account.workspaces[0]?.id || '' : '';
  });

  const workspace = account
    ? account.workspaces.find((w) => w.id === workspaceId) || account.workspaces[0] || null
    : null;

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

  const isNationalRole = Boolean(
    workspace &&
      ['KETUA_UMUM', 'DPP_ADMIN', 'EXECUTIVE', 'TECH_OPERATOR'].includes(workspace.role)
  );

  const getManagedUnitIds = (): string[] => {
    if (!workspace) return [];
    if (isNationalRole) {
      return MOCK_UNITS.map((u) => u.id);
    }
    return collectSubordinateUnitIds(workspace.unitId);
  };

  // Route permission evaluator - All menus active with role-aware context
  const canAccessRoute = (_pathname: string): { allowed: boolean; reason?: string } => {
    if (!account) {
      return { allowed: false, reason: 'Sesi belum terautentikasi. Silakan masuk ke akun Anda.' };
    }
    return { allowed: true };
  };

  // Tiered Territorial Unit Access Evaluator
  const checkUnitAccess = (targetUnitId: string): { allowed: boolean; reason?: string } => {
    if (!workspace) {
      return { allowed: false, reason: 'Tidak ada ruang kerja aktif.' };
    }

    // Ketua Umum & DPP have unrestricted national authority across all party levels, wings, and institutions
    if (isNationalRole) {
      return { allowed: true };
    }

    const targetUnit = MOCK_UNITS.find((u) => u.id === targetUnitId);
    if (!targetUnit) {
      return { allowed: false, reason: 'Unit organisasi tidak ditemukan.' };
    }

    // Wing & Institution autonomy check
    if (workspace.role === 'WING_MANAGER' && targetUnit.type !== 'WING') {
      return {
        allowed: false,
        reason: `Pengurus Sayap Otonom (${workspace.unitName}) memiliki pohon struktur mandiri dan tidak berwenang mengelola struktur partai induk (${targetUnit.name}).`,
      };
    }

    if (workspace.role === 'INSTITUTION_MANAGER' && targetUnit.type !== 'INSTITUTION') {
      return {
        allowed: false,
        reason: `Badan Fungsional (${workspace.unitName}) hanya mengelola unit advokasi/fungsional, bukan struktur teritorial (${targetUnit.name}).`,
      };
    }

    const managedIds = getManagedUnitIds();
    if (managedIds.includes(targetUnitId)) {
      return { allowed: true };
    }

    return {
      allowed: false,
      reason: `Wewenang berjenjang Anda pada ${workspace.unitName} (${workspace.regionScopeLabel}) hanya mencakup unit di bawah pohon teritorial Anda. Unit "${targetUnit.name}" (${targetUnit.regionScope.province}) berada di luar yurisdiksi SK Anda.`,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        account,
        person,
        workspace,
        allAccounts: MOCK_ACCOUNTS,
        isNationalRole,
        getManagedUnitIds,
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
