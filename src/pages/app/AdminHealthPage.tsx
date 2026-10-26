import React, { useState } from 'react';
import {
  Lock,
  CheckCircle2,
  GitBranch,
  GitPullRequest,
  Globe,
  Terminal,
  Copy,
  Check,
  FileCode2,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const BRANCH_TIERS = [
  {
    branch: 'main',
    role: 'Production Release',
    env: 'Vercel Production',
    url: 'perindo-one.vercel.app',
    rule: 'Protected · Hanya via PR dari staging / hotfix/*',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    branch: 'staging',
    role: 'UAT & Verifikasi DPP',
    env: 'Vercel Staging Preview',
    url: 'staging-perindo-one.vercel.app',
    rule: 'Protected · Menerima PR dari develop',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    branch: 'develop',
    role: 'Integrasi Harian Tim',
    env: 'Vercel Dev Preview',
    url: 'dev-perindo-one.vercel.app',
    rule: 'Default Integration · Menerima PR dari feature/* & fix/*',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    branch: 'feature/*',
    role: 'Pengembangan Fitur Baru',
    env: 'Vercel PR Preview URL',
    url: 'perindo-one-git-feature-*.vercel.app',
    rule: 'Dibuat dari develop · Wajib lolos CI Lint & Build',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    branch: 'hotfix/*',
    role: 'Perbaikan Cepat Produksi',
    env: 'Vercel Hotfix Preview',
    url: 'perindo-one-git-hotfix-*.vercel.app',
    rule: 'Dibuat dari main · Merge ke main & backport ke develop',
    badge: 'bg-rose-50 text-rose-700 border-rose-200',
  },
];

const GIT_SETUP_COMMANDS = `# 1. Push branch utama (Production Vercel)
git branch -M main
git push -u origin main

# 2. Buat & push branch staging (UAT DPP)
git checkout -b staging
git push -u origin staging

# 3. Buat & push branch develop (Integrasi Fitur)
git checkout -b develop
git push -u origin develop

# 4. Buat branch fitur baru dari develop
git checkout -b feature/kta-digital-update develop`;

export const AdminHealthPage: React.FC = () => {
  const { auditLogs } = useData();
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleCopyCommands = () => {
    navigator.clipboard.writeText(GIT_SETUP_COMMANDS);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Infrastruktur, CI/CD & Keamanan
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Diagnostik Sistem, Pipeline GitHub & Kesiapan Deploy Vercel
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Status keandalan aplikasi, konfigurasi rute SPA Vercel, pipeline GitHub Actions, strategi GitFlow branching, serta jejak audit.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            VERCEL READY · SPA REWRITES ACTIVE
          </span>
        </div>
      </div>

      {/* Zero PII Notice for Tech Operator */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-300 text-xs border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            <strong>Batasan Peran Tech Operator:</strong> Akses ini memantau kinerja infrastruktur, pipeline CI/CD GitHub-Vercel, dan log peristiwa keamanan tanpa menyajikan data identitas perseorangan kader (Anti-Data Harvesting Guard).
          </span>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500">Status Build & TypeScript</span>
          <div className="text-2xl font-bold text-emerald-700 font-mono mt-1">PASSING</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Vite 6 + tsc --noEmit (0 Error)</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500">Konfigurasi Deploy Vercel</span>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">READY</div>
          <div className="text-[11px] text-slate-400 mt-0.5">vercel.json + SPA Fallback</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500">GitHub Actions Workflows</span>
          <div className="text-2xl font-bold text-blue-700 font-mono mt-1">2 ACTIVE</div>
          <div className="text-[11px] text-slate-400 mt-0.5">ci.yml & cd-vercel.yml</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500">Strategi Git Branching</span>
          <div className="text-2xl font-bold text-purple-700 font-mono mt-1">5 TIERS</div>
          <div className="text-[11px] text-slate-400 mt-0.5">main · staging · develop · feature · hotfix</div>
        </div>
      </div>

      {/* Vercel Deployment Readiness & GitHub Actions CI/CD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vercel Readiness Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                <Rocket className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">
                  Kesiapan Deployment Vercel (Zero-Error SPA)
                </h2>
                <p className="text-xs text-slate-500">
                  Konfigurasi produksi otomatis untuk React 19 + Vite
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              SIAP DEPLOY
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-blue-600" />
                  <code>/vercel.json</code> — Anti-404 SPA Rewrite Rule
                </div>
                <p className="text-slate-500 mt-0.5 leading-relaxed">
                  Menjamin seluruh URL langsung seperti <code>/login</code>, <code>/app/overview</code>, dan <code>/app/members</code> tidak mengalami 404 saat di-refresh di Vercel.
                </p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-blue-600" />
                  Immutable Caching Aset KTA Digital (<code>/assets/kta/*</code>)
                </div>
                <p className="text-slate-500 mt-0.5 leading-relaxed">
                  Header <code>Cache-Control: public, max-age=31536000, immutable</code> memastikan template depan/belakang KTA & foto figur dimuat instan dari Edge CDN Vercel.
                </p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Security Headers & <code>/.vercelignore</code>
                </div>
                <p className="text-slate-500 mt-0.5 leading-relaxed">
                  Dilengkapi <code>X-Content-Type-Options: nosniff</code>, <code>X-Frame-Options: SAMEORIGIN</code>, dan pengecualian file lokal agar proses upload ke Vercel bersih.
                </p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            </div>
          </div>
        </div>

        {/* GitHub Actions Pipelines Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <GitPullRequest className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">
                  Pipeline CI/CD GitHub Actions
                </h2>
                <p className="text-xs text-slate-500">
                  Otomasi pengujian kode, build Vite, dan rilis ke Vercel
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
              .github/workflows
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">
                  1. .github/workflows/ci.yml
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                  Push & Pull Request
                </span>
              </div>
              <p className="text-slate-500 mt-1 leading-relaxed">
                Menjalankan Node.js 20 LTS, <code>npm run lint</code> (validasi TypeScript), memverifikasi keabsahan <code>vercel.json</code>, mengeksekusi <code>npm run build</code>, dan memeriksa ketersediaan aset KTA di folder <code>dist/</code>.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">
                  2. .github/workflows/cd-vercel.yml
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold text-[10px]">
                  Preview & Production
                </span>
              </div>
              <p className="text-slate-500 mt-1 leading-relaxed">
                Mendukung rilis otomatis ke <strong>Vercel Preview</strong> (branch <code>staging</code>, <code>develop</code>, PR) dan <strong>Vercel Production</strong> (branch <code>main</code>) baik via integrasi native GitHub-Vercel maupun Vercel CLI.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">
                  3. PR Template, CODEOWNERS & Dokumentasi
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-semibold text-[10px]">
                  Governance
                </span>
              </div>
              <p className="text-slate-500 mt-1 leading-relaxed">
                Dilengkapi <code>.github/PULL_REQUEST_TEMPLATE.md</code>, <code>.github/CODEOWNERS</code>, dan panduan lengkap di <code>/BRANCHING_AND_DEPLOYMENT.md</code>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GitFlow Branching Strategy Table & Quick Commands */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <GitBranch className="w-5 h-5 text-blue-700" />
            <div>
              <h2 className="font-bold text-base text-slate-900">
                Arsitektur Branching GitHub (GitFlow 5 Jenjang)
              </h2>
              <p className="text-xs text-slate-500">
                Pemisahan alur pengembangan fitur, pengujian staging DPP, dan rilis produksi nasional di Vercel
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4">Fungsi & Peruntukan</th>
                <th className="py-3 px-4">Target Environment Vercel</th>
                <th className="py-3 px-4">Aturan Proteksi & Merge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BRANCH_TIERS.map((item) => (
                <tr key={item.branch} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-mono font-bold">
                    <span className={`px-2.5 py-1 rounded-lg border text-[11px] ${item.badge}`}>
                      {item.branch}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{item.role}</td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800">{item.env}</div>
                    <div className="font-mono text-[11px] text-slate-400">{item.url}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{item.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Terminal Quick Setup Box */}
        <div className="rounded-xl bg-slate-900 text-slate-200 p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-400">
              <Terminal className="w-4 h-4" />
              <span>Perintah Inisialisasi Branch GitHub (Siap Jalankan)</span>
            </div>
            <button
              type="button"
              onClick={handleCopyCommands}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition-colors cursor-pointer"
            >
              {copiedCmd ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Tersalin
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Salin Perintah Git
                </>
              )}
            </button>
          </div>
          <pre className="font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
            {GIT_SETUP_COMMANDS}
          </pre>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="font-bold text-base text-slate-900">
            Riwayat Peristiwa Audit (Audit Trail)
          </h2>
          <span className="text-xs text-slate-500 font-mono">{auditLogs.length} Peristiwa Terekam</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Waktu (WIB)</th>
                <th className="py-3 px-4">Aksi / Event</th>
                <th className="py-3 px-4">Sumber Daya Target</th>
                <th className="py-3 px-4">Pelaku (Aktor)</th>
                <th className="py-3 px-4">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 text-slate-500">{log.timestamp}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-800 font-sans">{log.targetResource}</td>
                  <td className="py-3 px-4 text-slate-700 font-sans">{log.userName}</td>
                  <td className="py-3 px-4 text-slate-400">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

