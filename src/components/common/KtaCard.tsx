import React, { useState } from 'react';
import { RotateCw, Download, Check, QrCode, Shield, Share2 } from 'lucide-react';
import { Person } from '../../types';

interface KtaCardProps {
  person: Person;
  layout?: 'flip' | 'side-by-side';
  showControls?: boolean;
}

export const KtaCard: React.FC<KtaCardProps> = ({
  person,
  layout = 'flip',
  showControls = true,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'flip' | 'side-by-side'>(layout);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Derive realistic Indonesian administrative fields from person data
  const birthPlaceDate = person.city ? `${person.city}/15-05-1988` : 'Jakarta/15-05-1988';
  const fullAddress = `Jl. Pegangsaan Barat No. 12, RT. 04 RW. 02, Menteng, ${person.city.toUpperCase()}, ${person.province}`;
  const phoneFormatted = person.phone || '+6281210338821';
  const nikNumber = person.nikDummy.replace(/\*/g, '8');

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  // SISI DEPAN (FRONT CARD)
  const renderFrontCard = () => (
    <div className="w-full max-w-[500px] aspect-[85.6/53.98] bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-300 overflow-hidden flex flex-col justify-between relative select-none font-sans text-slate-900">
      {/* 1. Header Putih dengan Logo Sayap Perindo */}
      <div className="pt-2 sm:pt-3 pb-1 flex flex-col items-center justify-center bg-white">
        <img
          src="/assets/kta/perindo_logo.png"
          alt="Logo Partai Perindo"
          className="h-7 sm:h-9 object-contain"
          onError={(e) => {
            // Fallback SVG if image not found
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* 2. Banner Pita Gradasi Biru Tua & Merah Marun */}
      <div className="bg-gradient-to-r from-[#102C63] via-[#102C63] to-[#B21F35] text-white py-1.5 sm:py-2 text-center shadow-inner">
        <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase leading-none opacity-95">
          KARTU TANDA ANGGOTA
        </div>
        <div className="text-sm sm:text-base font-black tracking-wide uppercase leading-tight mt-0.5 sm:mt-1">
          PARTAI PERINDO
        </div>
      </div>

      {/* 3. Badan Kartu Putih (Foto + Identitas + QR Code) */}
      <div className="flex-1 bg-white px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-3 overflow-hidden">
        {/* Foto Anggota */}
        <div className="shrink-0">
          <div className="w-16 h-20 sm:w-20 sm:h-24 rounded-lg bg-slate-100 border border-slate-300 overflow-hidden flex items-end justify-center relative shadow-xs">
            <img
              src="/assets/kta/member_photo.png"
              alt={person.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Identitas Anggota */}
        <div className="flex-1 min-w-0 flex flex-col justify-center leading-tight">
          {/* NIK / Nomor KTA */}
          <div className="font-extrabold text-xs sm:text-sm text-slate-900 tracking-tight font-mono tabular-nums truncate">
            {nikNumber}
          </div>

          {/* Nama Anggota */}
          <div className="font-bold text-xs sm:text-sm text-slate-900 capitalize truncate mt-0.5">
            {person.name}
          </div>

          {/* Tempat & Tanggal Lahir */}
          <div className="text-[9px] sm:text-[10px] text-slate-600 mt-0.5 truncate">
            {birthPlaceDate}
          </div>

          {/* Alamat Domisili Lengkap */}
          <div className="text-[8px] sm:text-[9.5px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
            {fullAddress}
          </div>

          {/* Nomor Telepon */}
          <div className="text-[8.5px] sm:text-[10px] text-slate-600 font-mono mt-0.5">
            Telp : {phoneFormatted}
          </div>
        </div>

        {/* QR Code Verifikasi Resmi */}
        <div className="shrink-0 flex flex-col items-center justify-center pl-1">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white p-1 rounded-lg border border-slate-300 shadow-2xs flex items-center justify-center relative">
            {/* Real Perindo QR Replica */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              fill="#102C63"
            >
              {/* Corner 1 */}
              <rect x="0" y="0" width="28" height="28" rx="2" fill="#102C63" />
              <rect x="4" y="4" width="20" height="20" rx="1" fill="#FFFFFF" />
              <rect x="8" y="8" width="12" height="12" rx="1" fill="#102C63" />

              {/* Corner 2 */}
              <rect x="72" y="0" width="28" height="28" rx="2" fill="#102C63" />
              <rect x="76" y="4" width="20" height="20" rx="1" fill="#FFFFFF" />
              <rect x="80" y="8" width="12" height="12" rx="1" fill="#102C63" />

              {/* Corner 3 */}
              <rect x="0" y="72" width="28" height="28" rx="2" fill="#102C63" />
              <rect x="4" y="76" width="20" height="20" rx="1" fill="#FFFFFF" />
              <rect x="8" y="80" width="12" height="12" rx="1" fill="#102C63" />

              {/* Pattern modules */}
              <rect x="36" y="4" width="8" height="8" fill="#102C63" />
              <rect x="52" y="8" width="10" height="6" fill="#102C63" />
              <rect x="36" y="18" width="6" height="8" fill="#102C63" />
              <rect x="48" y="20" width="14" height="6" fill="#102C63" />

              <rect x="6" y="36" width="8" height="6" fill="#102C63" />
              <rect x="18" y="38" width="8" height="10" fill="#102C63" />
              <rect x="8" y="52" width="12" height="6" fill="#102C63" />

              {/* Center watermark box */}
              <rect x="38" y="38" width="24" height="24" rx="4" fill="#D7283F" />
              <circle cx="50" cy="50" r="7" fill="#FFFFFF" />
              <circle cx="50" cy="50" r="4" fill="#102C63" />

              {/* Bottom right modules */}
              <rect x="36" y="74" width="8" height="8" fill="#102C63" />
              <rect x="52" y="78" width="10" height="6" fill="#102C63" />
              <rect x="76" y="36" width="8" height="8" fill="#102C63" />
              <rect x="88" y="48" width="8" height="10" fill="#102C63" />
              <rect x="74" y="72" width="10" height="8" fill="#102C63" />
              <rect x="88" y="86" width="8" height="8" fill="#102C63" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  // SISI BELAKANG (BACK CARD)
  const renderBackCard = () => (
    <div className="w-full max-w-[500px] aspect-[85.6/53.98] bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-300 overflow-hidden flex flex-col justify-between relative select-none font-sans text-slate-900">
      {/* 1. Header Putih Logo Partai Perindo Persatuan Indonesia */}
      <div className="px-4 py-1.5 sm:py-2 flex items-center gap-2 bg-white border-b border-slate-100">
        <img
          src="/assets/kta/perindo_logo.png"
          alt="Sayap Perindo"
          className="h-5 sm:h-6 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="flex flex-col leading-none">
          <span className="font-extrabold text-[11px] sm:text-xs text-[#102C63] tracking-wide">
            PARTAI PERINDO
          </span>
          <span className="font-extrabold text-[9px] sm:text-[10px] text-[#D7283F] tracking-wider uppercase mt-0.5">
            PERSATUAN INDONESIA
          </span>
        </div>
      </div>

      {/* 2. Badan Tengah (Latar Biru Tua & Merah) berisi 3 Ketentuan + Foto Ketum */}
      <div className="flex-1 bg-gradient-to-r from-[#102C63] via-[#102C63] to-[#B21F35] text-white px-3 sm:px-4 py-2 sm:py-2.5 flex items-stretch justify-between relative overflow-hidden">
        {/* Kolom Kiri: 3 Ketentuan Resmi */}
        <div className="w-[62%] sm:w-[65%] flex flex-col justify-between text-[7.5px] sm:text-[9px] leading-tight text-white/95 pr-2 space-y-1.5">
          <div className="flex items-start gap-1">
            <span className="font-bold">1.</span>
            <span>Kartu ini merupakan Kartu Tanda Anggota Partai Perindo.</span>
          </div>

          <div className="flex items-start gap-1">
            <span className="font-bold">2.</span>
            <span>
              Penggunaan kartu ini diatur menurut ketentuan dan syarat-syarat sebagaimana tertera dalam peraturan organisasi Partai Perindo.
            </span>
          </div>

          <div className="flex items-start gap-1">
            <span className="font-bold">3.</span>
            <div>
              <span>Apabila menemukan kartu ini harap dikembalikan ke alamat pemilik kartu atau ke alamat kantor DPP Partai Perindo di :</span>
              <div className="mt-0.5 text-white/85 text-[7px] sm:text-[8px] leading-tight font-medium">
                Jl. Pangeran Diponegoro 29, Menteng, Jakarta Pusat 10310, Indonesia. <span className="underline">www.partaiperindo.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Foto Resmi Ketua Umum Angela H. Tanoesoedibjo */}
        <div className="w-[38%] sm:w-[35%] relative flex items-end justify-center pointer-events-none">
          <img
            src="/assets/kta/angela_ketum.png"
            alt="Angela H. Tanoesoedibjo - Ketua Umum"
            className="h-[125%] max-w-none object-contain drop-shadow-md transform translate-y-3"
          />
        </div>
      </div>

      {/* 3. Footer Putih dengan Nama Ketum & Media Sosial */}
      <div className="bg-white px-4 py-1 sm:py-1.5 flex items-center justify-between border-t border-slate-100">
        <div>
          <div className="text-[8px] sm:text-[9px] text-slate-500 font-medium leading-none">
            Ketua Umum
          </div>
          <div className="text-[10px] sm:text-xs font-black text-slate-900 leading-tight mt-0.5">
            Angela H. Tanoesoedibjo
          </div>
        </div>

        {/* Social Media Handles */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[9px] font-semibold text-slate-600">
          <span className="w-3.5 h-3.5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[7px] font-bold">X</span>
          <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[7px] font-bold">f</span>
          <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center text-[7px] font-bold">ig</span>
          <span className="w-3.5 h-3.5 rounded-full bg-black text-white flex items-center justify-center text-[7px] font-bold">tik</span>
          <span className="font-mono text-[8px] sm:text-[9px] text-slate-700 ml-0.5">@PartaiPerindo</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* View Mode & Flip Controls Bar */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
          {/* Segmented Mode Button */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200">
            <button
              onClick={() => {
                setViewMode('flip');
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'flip' && !isFlipped
                  ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sisi Depan
            </button>
            <button
              onClick={() => {
                setViewMode('flip');
                setIsFlipped(true);
              }}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'flip' && isFlipped
                  ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sisi Belakang
            </button>
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'side-by-side'
                  ? 'bg-slate-900 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Berdampingan (Depan & Belakang)
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {viewMode === 'flip' && (
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-100 transition-colors shadow-2xs"
              >
                <RotateCw className="w-3.5 h-3.5 text-blue-600" />
                <span>Putar Kartu (3D)</span>
              </button>
            )}

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#102C63] text-white rounded-lg font-semibold hover:bg-[#0c224d] transition-colors shadow-2xs"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>KTA Terunduh</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Cetak / Unduh KTA</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Render Cards Container */}
      {viewMode === 'side-by-side' ? (
        /* Side by Side Display */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
          <div className="space-y-2 w-full max-w-[500px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block text-center">
              Tampak Depan (Front View)
            </span>
            {renderFrontCard()}
          </div>

          <div className="space-y-2 w-full max-w-[500px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block text-center">
              Tampak Belakang (Back View)
            </span>
            {renderBackCard()}
          </div>
        </div>
      ) : (
        /* Flip Display with 3D Perspective */
        <div className="flex justify-center py-2">
          <div
            className="w-full max-w-[500px] cursor-pointer transition-transform duration-500 transform-gpu hover:scale-[1.01]"
            onClick={() => setIsFlipped(!isFlipped)}
            title="Klik untuk membalik kartu (Depan / Belakang)"
          >
            {isFlipped ? renderBackCard() : renderFrontCard()}
          </div>
        </div>
      )}

      {/* Helpful Hint */}
      <div className="text-center text-[11px] text-slate-400">
        Klik kartu untuk memutar antara <strong>Tampak Depan</strong> dan <strong>Tampak Belakang</strong> sesuai standar format fisik Partai Perindo.
      </div>
    </div>
  );
};
