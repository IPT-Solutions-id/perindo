export type UserRole =
  | 'PUBLIC'
  | 'MEMBER'
  | 'DPRT_MANAGER'
  | 'DPC_MANAGER'
  | 'DPD_MANAGER'
  | 'DPW_MANAGER'
  | 'DPP_ADMIN'
  | 'WING_MANAGER'
  | 'INSTITUTION_MANAGER'
  | 'TPS_WITNESS'
  | 'TPS_VERIFIER'
  | 'CANDIDATE_EVALUATOR'
  | 'EXECUTIVE'
  | 'TECH_OPERATOR';

export type OrgType = 'PARTY' | 'WING' | 'INSTITUTION';
export type OrgLevel = 'DPP' | 'DPW' | 'DPD' | 'DPC' | 'DPRT' | 'SAYAP_PUSAT' | 'SAYAP_WILAYAH' | 'BADAN_PUSAT' | 'BADAN_WILAYAH';

export interface Person {
  id: string; // e.g. "DEMO-001"
  name: string;
  email: string;
  phone: string;
  nikDummy: string; // Fake NIK e.g. "317101******0001"
  city: string;
  province: string;
  avatarSeed: string;
  joinedDate: string;
  ktaNumber: string;
}

export interface Unit {
  id: string;
  orgId: string;
  name: string;
  code: string;
  level: OrgLevel;
  type: OrgType;
  regionScope: {
    province: string;
    regency?: string;
    district?: string;
    village?: string;
  };
  parentId?: string;
  totalMembers: number;
  skNumber: string;
  skStatus: 'AKTIF' | 'MENUNGGU_VERIFIKASI_DPP' | 'KADALUARSA';
}

export interface Organization {
  id: string;
  name: string;
  shortName: string;
  type: OrgType;
  description: string;
  parentOrgId?: string;
}

export interface Appointment {
  id: string;
  personId: string;
  unitId: string;
  role: UserRole;
  title: string;
  skNumber: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'PENDING_APPROVAL' | 'EXPIRED';
}

export interface Workspace {
  id: string;
  name: string;
  unitId: string;
  unitName: string;
  role: UserRole;
  roleTitle: string;
  level: OrgLevel;
  regionScopeLabel: string;
  badgeColor: string;
}

export interface Account {
  id: string;
  personId: string;
  username: string;
  workspaces: Workspace[];
}

export interface Program {
  id: string;
  code: string;
  title: string;
  description: string;
  unitId: string;
  targetParticipants: number;
  currentParticipants: number;
  budgetAllocated: number;
  budgetSpent: number;
  status: 'DRAF' | 'DIAJUKAN' | 'BERJALAN' | 'SELESAI';
  startDate: string;
  endDate: string;
  category: 'KADERISASI' | 'SOSIAL' | 'EKONOMI_UMKM' | 'PEMUDA';
}

export interface Activity {
  id: string;
  programId?: string;
  unitId: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendeesCount: number;
  status: 'TERJADWAL' | 'SELESAI' | 'DIBATALKAN';
  coordinator: string;
  notes: string;
}

export interface ServiceTicket {
  id: string;
  ticketNumber: string;
  creatorName: string;
  creatorKta: string;
  unitId: string;
  category: 'ASPIRASI' | 'KTA_BANTUAN' | 'HUKUM' | 'KESEHATAN_SOSIAL';
  subject: string;
  description: string;
  priority: 'RENDAH' | 'SEDANG' | 'TINGGI' | 'MENDESAK';
  status: 'BARU' | 'DIPROSES' | 'SELESAI' | 'DITOLAK';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
}

export interface PollingStation {
  id: string;
  code: string; // e.g. "TPS-012"
  province: string;
  regency: string;
  district: string;
  village: string;
  dptTotal: number;
  assignedWitnessName?: string;
  assignedWitnessPhone?: string;
  status: 'BELUM_LAPOR' | 'PROSES_VERIFIKASI' | 'TERVERIFIKASI' | 'ADA_CATATAN';
}

export interface TpsSubmission {
  id: string;
  tpsId: string;
  tpsCode: string;
  witnessName: string;
  submittedAt: string;
  totalVotersPresent: number;
  validVotes: number;
  invalidVotes: number;
  partyVotes: number;
  presidentialVoteA: number;
  presidentialVoteB: number;
  presidentialVoteC: number;
  c1DocumentUploaded: boolean;
  notes: string;
  status: 'MENUNGGU_VERIFIKASI' | 'DISETUJUI' | 'PERLU_PERBAIKAN';
  verifierNotes?: string;
}

export interface CandidateProfile {
  id: string;
  code: string;
  name: string;
  gender: 'L' | 'P';
  electoralDistrict: string; // Dapil
  targetOffice: 'DPR_RI' | 'DPRD_PROV' | 'DPRD_KAB_KOTA';
  education: string;
  occupation: string;
  evaluationStatus: 'BELUM_DINILAI' | 'SEDANG_DINILAI' | 'LULUS_SELEKSI' | 'CADANGAN';
  totalScore?: number;
}

export interface RubricScore {
  candidateId: string;
  evaluatorName: string;
  integrityScore: number; // 0-100
  partyLoyaltyScore: number; // 0-100
  publicCompetenceScore: number; // 0-100
  grassrootsNetworkScore: number; // 0-100
  recommendation: 'SANGAT_DIREKOMENDASIKAN' | 'DIREKOMENDASIKAN' | 'DIPERTIMBANGKAN' | 'TIDAK_DIREKOMENDASIKAN';
  evaluationNotes: string;
  evaluatedAt: string;
}

export interface ApprovalItem {
  id: string;
  docNumber: string;
  title: string;
  type: 'SK_PENGURUS' | 'PROPOSAL_ANGGARAN' | 'SURAT_TUGAS' | 'PERMOHONAN_KTA';
  applicantUnit: string;
  submittedDate: string;
  status: 'MENUNGGU_VERIFIKASI_DPP' | 'DISETUJUI_DPP' | 'DIKEMBALIKAN';
  notes: string;
  signatoryLevel: OrgLevel;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  targetResource: string;
  scopeUnit: string;
  ipAddress: string;
}
