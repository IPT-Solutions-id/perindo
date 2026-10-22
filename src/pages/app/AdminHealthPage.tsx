import React from 'react';
import {
  ActivitySquare,
  Server,
  Shield,
  Database,
  Cpu,
  RefreshCw,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export const AdminHealthPage: React.FC = () => {
  const { auditLogs } = useData();
  const { workspace } = useAuth();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Infrastruktur & Keamanan
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            Diagnostik Sistem & Jejak Audit (Audit Logs)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Status keandalan server, latensi mock router, dan pencatatan riwayat perubahan data (immutable log).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            NORMAL · LATENSI 18ms
          </span>
        </div>
      </div>

      {/* Zero PII Notice for Tech Operator */}
      <div className="p-4 rounded-xl bg-slate-900 text-slate-300 text-xs border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-sky-400 shrink-0" />
          <span>
            <strong>Batasan Peran Tech Operator:</strong> Akses ini memantau kinerja infrastruktur dan log peristiwa keamanan tanpa menyajikan data identitas perseorangan kader (Anti-Data Harvesting Guard).
          </span>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500">Ketersediaan Sistem (Uptime)</span>
          <div className="text-2xl font-bold text-emerald-700 font-mono mt-1">99.98%</div>
          <div className="text-[11px] text-slate-400 mt-0.5">30 Hari Terakhir</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500">Kecepatan Respon Rerata</span>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">18.4 ms</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Lokal Memory Router</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500">Integritas Hash Audit</span>
          <div className="text-2xl font-bold text-blue-700 font-mono mt-1">VALID</div>
          <div className="text-[11px] text-slate-400 mt-0.5">HMAC-SHA256 Signatures</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-xs text-slate-500">Penyimpanan Mock State</span>
          <div className="text-2xl font-bold text-purple-700 font-mono mt-1">PERSISTED</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Survives Refresh</div>
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
