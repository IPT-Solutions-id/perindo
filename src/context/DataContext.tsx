import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Person,
  Program,
  Activity,
  ServiceTicket,
  PollingStation,
  TpsSubmission,
  CandidateProfile,
  RubricScore,
  ApprovalItem,
  DirectiveItem,
  AuditEvent,
} from '../types';
import {
  MOCK_PERSONS,
  MOCK_PROGRAMS,
  MOCK_ACTIVITIES,
  MOCK_TICKETS,
  MOCK_POLLING_STATIONS,
  MOCK_TPS_SUBMISSIONS,
  MOCK_CANDIDATES,
  MOCK_RUBRICS,
  MOCK_APPROVALS,
  MOCK_DIRECTIVES,
  MOCK_AUDIT_LOGS,
} from '../data/mockData';

interface DataContextType {
  members: Person[];
  programs: Program[];
  activities: Activity[];
  tickets: ServiceTicket[];
  pollingStations: PollingStation[];
  tpsSubmissions: TpsSubmission[];
  candidates: CandidateProfile[];
  rubricScores: Record<string, RubricScore>;
  approvals: ApprovalItem[];
  directives: DirectiveItem[];
  auditLogs: AuditEvent[];
  addMember: (member: Omit<Person, 'id' | 'ktaNumber' | 'joinedDate'>) => void;
  updateMember: (memberId: string, updates: Partial<Person>) => void;
  addProgram: (program: Omit<Program, 'id' | 'code' | 'budgetSpent' | 'currentParticipants'>) => void;
  updateProgramProgress: (programId: string, participantsDelta: number, budgetDelta: number) => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  updateActivityStatus: (activityId: string, status: Activity['status'], attendeesCount?: number) => void;
  createTicket: (ticket: Omit<ServiceTicket, 'id' | 'ticketNumber' | 'status' | 'createdAt' | 'updatedAt'>) => void;
  updateTicketStatus: (ticketId: string, status: ServiceTicket['status']) => void;
  submitTpsReport: (submission: Omit<TpsSubmission, 'id' | 'submittedAt' | 'status'>) => void;
  verifyTpsSubmission: (submissionId: string, status: 'DISETUJUI' | 'PERLU_PERBAIKAN', notes: string) => void;
  saveRubricScore: (score: RubricScore) => void;
  createApprovalRequest: (req: Omit<ApprovalItem, 'id' | 'docNumber' | 'submittedDate' | 'status'>) => void;
  updateApprovalStatus: (approvalId: string, status: ApprovalItem['status'], notes?: string, actorName?: string) => void;
  addDirective: (d: Omit<DirectiveItem, 'id' | 'code' | 'status' | 'progressNote' | 'createdAt'>) => void;
  updateDirectiveStatus: (directiveId: string, status: DirectiveItem['status'], progressNote: string, actorName?: string) => void;
  recordAudit: (action: string, targetResource: string, scopeUnit: string, userName: string) => void;
  resetAllData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Person[]>(() => {
    const saved = localStorage.getItem('perindo_members_v3');
    return saved ? JSON.parse(saved) : MOCK_PERSONS;
  });

  const [programs, setPrograms] = useState<Program[]>(() => {
    const saved = localStorage.getItem('perindo_programs_v2');
    return saved ? JSON.parse(saved) : MOCK_PROGRAMS;
  });

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem('perindo_activities_v2');
    return saved ? JSON.parse(saved) : MOCK_ACTIVITIES;
  });

  const [tickets, setTickets] = useState<ServiceTicket[]>(() => {
    const saved = localStorage.getItem('perindo_tickets_v2');
    return saved ? JSON.parse(saved) : MOCK_TICKETS;
  });

  const [pollingStations, setPollingStations] = useState<PollingStation[]>(() => {
    const saved = localStorage.getItem('perindo_tps_v2');
    return saved ? JSON.parse(saved) : MOCK_POLLING_STATIONS;
  });

  const [tpsSubmissions, setTpsSubmissions] = useState<TpsSubmission[]>(() => {
    const saved = localStorage.getItem('perindo_submissions_v2');
    return saved ? JSON.parse(saved) : MOCK_TPS_SUBMISSIONS;
  });

  const [candidates, setCandidates] = useState<CandidateProfile[]>(() => {
    const saved = localStorage.getItem('perindo_candidates_v2');
    return saved ? JSON.parse(saved) : MOCK_CANDIDATES;
  });

  const [rubricScores, setRubricScores] = useState<Record<string, RubricScore>>(() => {
    const saved = localStorage.getItem('perindo_rubrics_v2');
    return saved ? JSON.parse(saved) : MOCK_RUBRICS;
  });

  const [approvals, setApprovals] = useState<ApprovalItem[]>(() => {
    const saved = localStorage.getItem('perindo_approvals_v2');
    return saved ? JSON.parse(saved) : MOCK_APPROVALS;
  });

  const [directives, setDirectives] = useState<DirectiveItem[]>(() => {
    const saved = localStorage.getItem('perindo_directives_v2');
    return saved ? JSON.parse(saved) : MOCK_DIRECTIVES;
  });

  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(() => {
    const saved = localStorage.getItem('perindo_audits_v2');
    return saved ? JSON.parse(saved) : MOCK_AUDIT_LOGS;
  });

  useEffect(() => {
    localStorage.setItem('perindo_members_v3', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('perindo_programs_v2', JSON.stringify(programs));
  }, [programs]);

  useEffect(() => {
    localStorage.setItem('perindo_activities_v2', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('perindo_tickets_v2', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('perindo_tps_v2', JSON.stringify(pollingStations));
  }, [pollingStations]);

  useEffect(() => {
    localStorage.setItem('perindo_submissions_v2', JSON.stringify(tpsSubmissions));
  }, [tpsSubmissions]);

  useEffect(() => {
    localStorage.setItem('perindo_candidates_v2', JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem('perindo_rubrics_v2', JSON.stringify(rubricScores));
  }, [rubricScores]);

  useEffect(() => {
    localStorage.setItem('perindo_approvals_v2', JSON.stringify(approvals));
  }, [approvals]);

  useEffect(() => {
    localStorage.setItem('perindo_directives_v2', JSON.stringify(directives));
  }, [directives]);

  useEffect(() => {
    localStorage.setItem('perindo_audits_v2', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const recordAudit = (action: string, targetResource: string, scopeUnit: string, userName: string) => {
    const newLog: AuditEvent = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: 'ACTIVE_USER',
      userName,
      action,
      targetResource,
      scopeUnit,
      ipAddress: '10.24.110.82',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addMember = (m: Omit<Person, 'id' | 'ktaNumber' | 'joinedDate'>) => {
    const count = members.length + 1;
    const generated16 = m.ktaId16 || `3171018810${String(count).padStart(6, '0')}`;
    const newMember: Person = {
      ...m,
      id: `KDR-${String(count).padStart(3, '0')}`,
      ktaId16: generated16,
      ktaNumber: generated16,
      joinedDate: 'Hari Ini',
    };
    setMembers((prev) => [newMember, ...prev]);
    recordAudit('CREATE_MEMBER_KTA', newMember.name, 'Unit Terdaftar', 'Pengguna Aktif');
  };

  const updateMember = (memberId: string, updates: Partial<Person>) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, ...updates } : m))
    );
    recordAudit('UPDATE_MEMBER_KTA', memberId, 'Pembaruan Data/Foto KTA', 'Pengguna Aktif');
  };

  const addProgram = (p: Omit<Program, 'id' | 'code' | 'budgetSpent' | 'currentParticipants'>) => {
    const newProg: Program = {
      ...p,
      id: `PROG-${Date.now().toString().slice(-4)}`,
      code: `PRG-2025-${String(programs.length + 1).padStart(2, '0')}`,
      currentParticipants: 0,
      budgetSpent: 0,
    };
    setPrograms((prev) => [newProg, ...prev]);
    recordAudit('CREATE_PROGRAM', newProg.title, p.unitId, 'Pengguna Aktif');
  };

  const updateProgramProgress = (programId: string, participantsDelta: number, budgetDelta: number) => {
    setPrograms((prev) =>
      prev.map((p) => {
        if (p.id !== programId) return p;
        const nextParticipants = Math.min(p.targetParticipants, p.currentParticipants + participantsDelta);
        const nextBudget = Math.min(p.budgetAllocated, p.budgetSpent + budgetDelta);
        const nextStatus = nextParticipants >= p.targetParticipants ? 'SELESAI' : 'BERJALAN';
        return {
          ...p,
          currentParticipants: nextParticipants,
          budgetSpent: nextBudget,
          status: nextStatus,
        };
      })
    );
    recordAudit('UPDATE_PROGRAM_REALIZATION', `Program ID ${programId}`, 'Operasional Wilayah', 'Pengurus Wilayah');
  };

  const addActivity = (a: Omit<Activity, 'id'>) => {
    const newAct: Activity = {
      ...a,
      id: `ACT-${Date.now().toString().slice(-4)}`,
    };
    setActivities((prev) => [newAct, ...prev]);
    recordAudit('CREATE_ACTIVITY', newAct.title, a.unitId, a.coordinator);
  };

  const updateActivityStatus = (activityId: string, status: Activity['status'], attendeesCount?: number) => {
    setActivities((prev) =>
      prev.map((a) =>
        a.id === activityId
          ? {
              ...a,
              status,
              attendeesCount: attendeesCount !== undefined ? attendeesCount : a.attendeesCount,
            }
          : a
      )
    );
    recordAudit('UPDATE_ACTIVITY_STATUS', `${activityId} -> ${status}`, 'Operasional Lapangan', 'Pengurus Unit');
  };

  const createTicket = (t: Omit<ServiceTicket, 'id' | 'ticketNumber' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: ServiceTicket = {
      ...t,
      id: `TCK-${Date.now().toString().slice(-4)}`,
      ticketNumber: `ASP-2025-${String(tickets.length + 1).padStart(4, '0')}`,
      status: 'BARU',
      createdAt: 'Baru saja',
      updatedAt: 'Baru saja',
    };
    setTickets((prev) => [newTicket, ...prev]);
    recordAudit('CREATE_SERVICE_TICKET', newTicket.subject, t.unitId, t.creatorName);
  };

  const updateTicketStatus = (ticketId: string, status: ServiceTicket['status']) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status, updatedAt: 'Baru saja diperbarui' } : t))
    );
    recordAudit('UPDATE_TICKET_STATUS', `Status -> ${status}`, 'Layanan Kader', 'Pengguna Aktif');
  };

  const submitTpsReport = (sub: Omit<TpsSubmission, 'id' | 'submittedAt' | 'status'>) => {
    const newSub: TpsSubmission = {
      ...sub,
      id: `SUB-${sub.tpsId}`,
      submittedAt: 'Baru saja',
      status: 'MENUNGGU_VERIFIKASI',
    };
    setTpsSubmissions((prev) => {
      const filtered = prev.filter((s) => s.tpsId !== sub.tpsId);
      return [newSub, ...filtered];
    });
    setPollingStations((prev) =>
      prev.map((tps) => (tps.id === sub.tpsId ? { ...tps, status: 'PROSES_VERIFIKASI' } : tps))
    );
    recordAudit('SUBMIT_TPS_REPORT', `Laporan C1 ${sub.tpsCode}`, sub.tpsId, sub.witnessName);
  };

  const verifyTpsSubmission = (submissionId: string, status: 'DISETUJUI' | 'PERLU_PERBAIKAN', notes: string) => {
    setTpsSubmissions((prev) =>
      prev.map((s) => (s.id === submissionId ? { ...s, status, verifierNotes: notes } : s))
    );
    const sub = tpsSubmissions.find((s) => s.id === submissionId);
    if (sub) {
      setPollingStations((prev) =>
        prev.map((tps) =>
          tps.id === sub.tpsId
            ? { ...tps, status: status === 'DISETUJUI' ? 'TERVERIFIKASI' : 'ADA_CATATAN' }
            : tps
        )
      );
    }
    recordAudit('VERIFY_TPS_DATA', `Verifikasi C1 -> ${status}`, submissionId, 'Tim Verifikator');
  };

  const saveRubricScore = (score: RubricScore) => {
    setRubricScores((prev) => ({
      ...prev,
      [score.candidateId]: score,
    }));
    const total = Math.round(
      (score.integrityScore +
        score.partyLoyaltyScore +
        score.publicCompetenceScore +
        score.grassrootsNetworkScore) /
        4
    );
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === score.candidateId
          ? {
              ...c,
              totalScore: total,
              evaluationStatus: total >= 80 ? 'LULUS_SELEKSI' : 'CADANGAN',
            }
          : c
      )
    );
    recordAudit('SUBMIT_CANDIDATE_RUBRIC', `Nilai ${total}`, score.candidateId, score.evaluatorName);
  };

  const createApprovalRequest = (req: Omit<ApprovalItem, 'id' | 'docNumber' | 'submittedDate' | 'status'>) => {
    const prefix = req.type === 'SK_PENGURUS' ? 'SK-USUL' : req.type === 'PROPOSAL_ANGGARAN' ? 'PRP-BGT' : 'ST-MANDAT';
    const newApp: ApprovalItem = {
      ...req,
      id: `APP-${Date.now().toString().slice(-4)}`,
      docNumber: `${prefix}/2025/${String(approvals.length + 11).padStart(2, '0')}`,
      submittedDate: 'Hari Ini',
      status: 'MENUNGGU_REKOMENDASI_WILAYAH',
    };
    setApprovals((prev) => [newApp, ...prev]);
    recordAudit('SUBMIT_APPROVAL_DOC', newApp.docNumber, req.applicantUnit, 'Pengurus Wilayah');
  };

  const updateApprovalStatus = (
    approvalId: string,
    status: ApprovalItem['status'],
    notes?: string,
    actorName?: string
  ) => {
    setApprovals((prev) =>
      prev.map((a) => (a.id === approvalId ? { ...a, status, notes: notes || a.notes } : a))
    );
    recordAudit('APPROVAL_STATUS_CHANGE', `SK/Proposal -> ${status}`, approvalId, actorName || 'Pejabat Berwenang');
  };

  const addDirective = (d: Omit<DirectiveItem, 'id' | 'code' | 'status' | 'progressNote' | 'createdAt'>) => {
    const newDir: DirectiveItem = {
      ...d,
      id: `DIR-${Date.now().toString().slice(-4)}`,
      code: `${d.priority === 'INSTRUKSI_KHUSUS_KETUM' ? 'INST-KETUM' : 'DISP-PIMPINAN'}/2025/${String(
        directives.length + 10
      ).padStart(3, '0')}`,
      status: 'BARU_DITERBITKAN',
      progressNote: 'Instruksi baru diterbitkan. Menunggu tindak lanjut struktur.',
      createdAt: 'Hari Ini',
    };
    setDirectives((prev) => [newDir, ...prev]);
    recordAudit('ISSUE_DIRECTIVE', newDir.code, d.targetLevel, d.issuerName);
  };

  const updateDirectiveStatus = (
    directiveId: string,
    status: DirectiveItem['status'],
    progressNote: string,
    actorName?: string
  ) => {
    setDirectives((prev) =>
      prev.map((d) =>
        d.id === directiveId ? { ...d, status, progressNote: progressNote || d.progressNote } : d
      )
    );
    recordAudit('UPDATE_DIRECTIVE_PROGRESS', `${directiveId} -> ${status}`, 'Tindak Lanjut Harian', actorName || 'Pengurus Wilayah');
  };

  const resetAllData = () => {
    setMembers(MOCK_PERSONS);
    setPrograms(MOCK_PROGRAMS);
    setActivities(MOCK_ACTIVITIES);
    setTickets(MOCK_TICKETS);
    setPollingStations(MOCK_POLLING_STATIONS);
    setTpsSubmissions(MOCK_TPS_SUBMISSIONS);
    setCandidates(MOCK_CANDIDATES);
    setRubricScores(MOCK_RUBRICS);
    setApprovals(MOCK_APPROVALS);
    setDirectives(MOCK_DIRECTIVES);
    setAuditLogs(MOCK_AUDIT_LOGS);
    localStorage.removeItem('perindo_members_v3');
    localStorage.removeItem('perindo_programs_v2');
    localStorage.removeItem('perindo_activities_v2');
    localStorage.removeItem('perindo_tickets_v2');
    localStorage.removeItem('perindo_tps_v2');
    localStorage.removeItem('perindo_submissions_v2');
    localStorage.removeItem('perindo_candidates_v2');
    localStorage.removeItem('perindo_rubrics_v2');
    localStorage.removeItem('perindo_approvals_v2');
    localStorage.removeItem('perindo_directives_v2');
    localStorage.removeItem('perindo_audits_v2');
  };

  return (
    <DataContext.Provider
      value={{
        members,
        programs,
        activities,
        tickets,
        pollingStations,
        tpsSubmissions,
        candidates,
        rubricScores,
        approvals,
        directives,
        auditLogs,
        addMember,
        updateMember,
        addProgram,
        updateProgramProgress,
        addActivity,
        updateActivityStatus,
        createTicket,
        updateTicketStatus,
        submitTpsReport,
        verifyTpsSubmission,
        saveRubricScore,
        createApprovalRequest,
        updateApprovalStatus,
        addDirective,
        updateDirectiveStatus,
        recordAudit,
        resetAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

