import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const { createTicket } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subject || !message) return;

    createTicket({
      creatorName: name,
      creatorKta: 'DEMO-PUBLIC-GUEST',
      unitId: 'UNIT-DPP-PUSAT',
      category: 'ASPIRASI',
      subject: `[Formulir Kontak Publik] ${subject}`,
      description: `Pengirim: ${name} (${email || 'Tanpa email'}). Pesan: ${message}`,
      priority: 'SEDANG',
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="bg-[#F5F7FB] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-semibold text-blue-800 uppercase tracking-wider">
            Layanan & Kontak
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Sekretariat & Dukungan Operasional
          </h1>
          <p className="text-sm text-slate-600">
            Hubungi sekretariat administrasi untuk koordinasi kepengurusan, usulan kegiatan daerah, atau bantuan teknis portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Office Details */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 text-xs text-slate-600">
              <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
                Sekretariat DPP Perindo (Simulasi)
              </h2>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Alamat Kantor Pusat:</div>
                  <div>Jl. Pangeran Diponegoro No. 29, Menteng, Kota Jakarta Pusat, DKI Jakarta 10310</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Layanan Call Center Simulasi:</div>
                  <div>(021) 3190-8800 / 0812-9988-7766</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Surel Resmi Sekretariat:</div>
                  <div>sekretariat@demo.perindo.local</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Jam Operasional Layanan:</div>
                  <div>Senin – Jumat: 08.30 – 17.00 WIB</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-1.5">
              <div className="font-semibold text-sky-400">Pusat Bantuan Saksi Pemilu:</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Khusus saksi TPS resmi dengan SK mandat, pelaporan cepat dapat diakses langsung dari dashboard peran <strong>TPS_WITNESS</strong> setelah masuk portal.
              </p>
            </div>
          </div>

          {/* Right Column: Working Contact / Aspirations Form */}
          <div className="md:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <h2 className="font-bold text-base text-slate-900 mb-1">
                Kirimkan Pesan atau Aspirasi
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                Pesan ini akan otomatis tercatat ke dalam sistem tiket layanan aspirasi organisasi (Data Simulasi).
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <div className="font-semibold">Pesan Berhasil Terkirim ke Tiket Layanan!</div>
                    <div className="text-[11px] text-emerald-700">Nomor tiket aspirasi baru telah dibuat di database simulasi.</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label htmlFor="contact-name" className="block font-semibold text-slate-700 mb-1">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block font-semibold text-slate-700 mb-1">
                    Alamat Email (Opsional)
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block font-semibold text-slate-700 mb-1">
                    Subjek / Topik <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Contoh: Permohonan informasi konsolidasi pengurus ranting"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-semibold text-slate-700 mb-1">
                    Pesan Aspirasi <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tuliskan uraian kebutuhan atau aspirasi Anda secara lengkap..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#102C63] hover:bg-[#0b1f47] text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Aspirasi ke Sistem</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
