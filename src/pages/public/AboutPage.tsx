import React from 'react';
import { WingLogo } from '../../components/common/WingLogo';
import { ShieldCheck, Target, Heart, Award, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F5F7FB] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
            <WingLogo size={42} />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-slate-900">
              Tentang Platform PERINDO ONE
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              PERINDO ONE adalah sistem prototipe tata kelola organisasi internal yang dirancang untuk
              memodernisasi operasional kepartaian: mulai dari registrasi anggota, verifikasi SK kepengurusan
              berjenjang (DPP hingga DPRt), monitoring program kerja kerakyatan (UMKM, kesehatan, sosial),
              hingga simulasi koordinasi saksi TPS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-xs text-slate-900">Visi Persatuan</h2>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Membangun ekosistem organisasi yang transparan, profesional, dan berorientasi pada kesejahteraan rakyat.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-xs text-slate-900">Ekonomi Kerakyatan</h2>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Fokus nyata pada program pendampingan gerobak usaha, baksos kesehatan, dan peningkatan kapasitas kader.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <h2 className="font-bold text-xs text-slate-900">Meritokrasi Kader</h2>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Penilaian bakal calon dan penugasan pengurus berbasis rubrik kompetensi terstruktur dan integritas.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Catatan Tata Kelola Prototipe:
            </div>
            <p className="text-[11px] leading-relaxed">
              Aturan persetujuan AD/ART dan penamaan jenjang kepengurusan dalam prototipe ini berstatus usulan teknis
              (<span className="font-mono font-semibold">SIMULASI • MENUNGGU VERIFIKASI DPP</span>) dan akan diselaraskan
              dengan keputusan rapat kerja nasional DPP Partai Perindo yang sah.
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onNavigate('/fitur')}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#102C63] hover:bg-[#D7283F] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              <span>Pelajari Fitur Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
