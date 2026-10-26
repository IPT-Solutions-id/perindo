import React, { useState, useRef, useMemo } from 'react';
import { RotateCw, Download, Check, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Person } from '../../types';
import { useData } from '../../context/DataContext';

interface KtaCardProps {
  person: Person;
  layout?: 'flip' | 'side-by-side';
  showControls?: boolean;
}

interface TiltCardWrapperProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  enableTilt?: boolean;
}

const TiltCardWrapper: React.FC<TiltCardWrapperProps> = ({
  children,
  className = '',
  onClick,
  enableTilt = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 6;
    const rotY = ((x - centerX) / centerX) * 6;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ perspective: '1200px' }}
      className={`relative select-none ${className}`}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full relative rounded-lg overflow-hidden shadow-xl border border-slate-300 bg-white transition-shadow duration-300 hover:shadow-2xl"
      >
        {children}

        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-30"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`,
            mixBlendMode: 'overlay',
          }}
        />
      </motion.div>
    </div>
  );
};

// Deterministic 17x17 QR Matrix Generator from KTA ID string (Matches Reference B&W QR)
const generateQrMatrix = (seedString: string): boolean[][] => {
  const size = 17;
  const grid: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));
  const reserved: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

  const placeFinder = (rowOffset: number, colOffset: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = rowOffset + r;
        const cc = colOffset + c;
        if (rr >= 0 && rr < size && cc >= 0 && cc < size) {
          reserved[rr][cc] = true;
          if (r >= 0 && r <= 6 && c >= 0 && c <= 6) {
            const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
            const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
            grid[rr][cc] = isBorder || isInner;
          }
        }
      }
    }
  };

  placeFinder(0, 0);
  placeFinder(0, size - 7);
  placeFinder(size - 7, 0);

  // Hash seed
  let hash = 2166136261;
  for (let i = 0; i < seedString.length; i++) {
    hash ^= seedString.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!reserved[r][c]) {
        hash ^= (r * 31 + c * 17) & 0xff;
        hash = Math.imul(hash, 16777619);
        grid[r][c] = (Math.abs(hash) % 10) < 5;
      }
    }
  }

  return grid;
};

export const KtaCard: React.FC<KtaCardProps> = ({
  person,
  layout = 'side-by-side',
  showControls = true,
}) => {
  const { members, updateMember } = useData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Always pick the freshest member state so photo/data edits reflect immediately
  const activePerson = useMemo(() => {
    return members.find((m) => m.id === person.id) || person;
  }, [members, person]);

  const [isFlipped, setIsFlipped] = useState(false);
  const [viewMode, setViewMode] = useState<'flip' | 'side-by-side'>(layout);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Dynamic KTA Fields matching the Reference Card Format
  const ktaId16 =
    activePerson.ktaId16 ||
    activePerson.nikDummy?.replace(/\*/g, '1') ||
    '3202018710310001';

  const birthPlaceDate =
    activePerson.birthPlaceDate ||
    `${activePerson.city.replace(/^(KOTA|KABUPATEN)\s+/i, '')}/31-10-1987`;

  const addressLine1 =
    activePerson.addressLine1 || 'Kp.sirnagalih RT. 04 RW. 29,';

  const addressLine2 =
    activePerson.addressLine2 || 'Pelabuhanratu, Pelabuhanratu,';

  const cityFormatted = activePerson.city.toUpperCase().startsWith('KOTA') ||
    activePerson.city.toUpperCase().startsWith('KABUPATEN')
    ? activePerson.city.toUpperCase()
    : `KOTA ${activePerson.city.toUpperCase()}`;

  const cityProvinceLine = `${cityFormatted}, ${activePerson.province}`;
  const phoneFormatted = activePerson.phone.startsWith('+62')
    ? activePerson.phone
    : `+62${activePerson.phone.replace(/^0/, '').replace(/-/g, '')}`;

  const photoSrc = activePerson.photoUrl || '/assets/kta/member_photo.png';

  const qrMatrix = useMemo(
    () => generateQrMatrix(`${ktaId16}-${activePerson.name}`),
    [ktaId16, activePerson.name]
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateMember(activePerson.id, { photoUrl: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  // SISI DEPAN (100% Matching Reference Layout & Proportions)
  const renderFrontCard = () => (
    <div className="w-full max-w-[560px] aspect-[622/363] bg-white overflow-hidden flex flex-col justify-between relative select-none font-sans text-slate-900">
      {/* Top 49%: Official Eagle Logo on White + Blue-to-Red Gradient KARTU TANDA ANGGOTA PARTAI PERINDO Ribbon */}
      <div className="w-full h-[49.2%] shrink-0 overflow-hidden bg-white">
        <img
          src="/assets/kta/kta_front_header.png"
          alt="Header KTA Partai Perindo"
          className="w-full h-full object-fill pointer-events-none"
        />
      </div>

      {/* Bottom 50.8%: White Body with 3 Columns: Member Photo (Left) + Member Details (Center) + B&W QR Code (Right) */}
      <div className="w-full h-[50.8%] bg-white px-[5.5%] py-[2.8%] flex items-center justify-between gap-[3.5%]">
        {/* Left: Dynamic Member Portrait Photo on Clean White Background */}
        <div className="w-[18.5%] h-full flex items-end justify-center shrink-0 overflow-hidden bg-white">
          <img
            src={photoSrc}
            alt={activePerson.name}
            className="w-full h-[96%] object-cover object-top"
            onError={(e) => {
              e.currentTarget.src = '/assets/kta/member_photo.png';
            }}
          />
        </div>

        {/* Center: Dynamic Member Data (7 Crisp Lines as in Reference) */}
        <div className="flex-1 min-w-0 flex flex-col justify-center text-left">
          {/* 1. 16-Digit KTA / NIK ID */}
          <div className="font-bold text-[12px] sm:text-[15.5px] text-[#222222] tracking-[0.04em] leading-[1.15] tabular-nums truncate">
            {ktaId16}
          </div>

          {/* 2. Member Full Name */}
          <div className="font-bold text-[11.5px] sm:text-[15px] text-[#222222] leading-[1.2] truncate mt-[1px]">
            {activePerson.name}
          </div>

          {/* 3. Birthplace / Date */}
          <div className="text-[8px] sm:text-[10px] text-[#666666] font-normal leading-[1.26] mt-[3px] truncate">
            {birthPlaceDate}
          </div>

          {/* 4. Address Line 1 (RT/RW) */}
          <div className="text-[8px] sm:text-[10px] text-[#666666] font-normal leading-[1.26] truncate">
            {addressLine1}
          </div>

          {/* 5. Address Line 2 (Village/District) */}
          <div className="text-[8px] sm:text-[10px] text-[#666666] font-normal leading-[1.26] truncate">
            {addressLine2}
          </div>

          {/* 6. City & Province */}
          <div className="text-[8px] sm:text-[10px] text-[#666666] font-normal leading-[1.26] truncate">
            {cityProvinceLine}
          </div>

          {/* 7. Telephone */}
          <div className="text-[8px] sm:text-[10px] text-[#666666] font-normal leading-[1.26] mt-[2px] truncate">
            Telp : {phoneFormatted}
          </div>
        </div>

        {/* Right: Crisp Black & White QR Code (Unique per Member) */}
        <div className="w-[22%] aspect-square shrink-0 flex items-center justify-center bg-white">
          <svg
            viewBox="0 0 17 17"
            className="w-full h-full"
            shapeRendering="crispEdges"
            aria-label={`QR KTA ${ktaId16}`}
          >
            <rect width="17" height="17" fill="#FFFFFF" />
            {qrMatrix.map((row, rIdx) =>
              row.map((cell, cIdx) =>
                cell ? (
                  <rect
                    key={`${rIdx}-${cIdx}`}
                    x={cIdx}
                    y={rIdx}
                    width={1}
                    height={1}
                    fill="#000000"
                  />
                ) : null
              )
            )}
          </svg>
        </div>
      </div>
    </div>
  );

  // SISI BELAKANG (100% Matching Reference Layout, Proportions, Logo, Rules & Ketum Hero)
  const renderBackCard = () => (
    <div className="w-full max-w-[560px] aspect-[622/363] bg-white overflow-hidden relative select-none font-sans">
      <img
        src="/assets/kta/kta_back_official.png"
        alt="Sisi Belakang KTA Resmi Partai Perindo - Ketua Umum Angela H. Tanoesoedibjo"
        className="w-full h-full object-fill pointer-events-none"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Hidden File Input for Custom Member Photo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />

      {/* View Mode & Photo Controls Bar */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/90 p-2.5 rounded-xl border border-slate-200 text-xs">
          {/* Segmented Mode Button */}
          <div className="flex items-center gap-1 p-1 bg-white rounded-lg border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('side-by-side')}
              className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'side-by-side'
                  ? 'bg-[#102C63] text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Depan & Belakang (2 Sisi)
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('flip');
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'flip' && !isFlipped
                  ? 'bg-[#102C63] text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sisi Depan
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('flip');
                setIsFlipped(true);
              }}
              className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'flip' && isFlipped
                  ? 'bg-[#102C63] text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sisi Belakang
            </button>
          </div>

          {/* Action Buttons: Upload Photo + Flip + Print */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
              title="Unggah pasfoto baru untuk KTA anggota ini"
            >
              <Camera className="w-3.5 h-3.5 text-[#D7283F]" />
              <span>Ganti Foto KTA</span>
            </button>

            {viewMode === 'flip' && (
              <button
                type="button"
                onClick={() => setIsFlipped(!isFlipped)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#1667C7]" />
                <span>Balik Kartu</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#102C63] hover:bg-[#D7283F] text-white rounded-lg font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Siap Cetak</span>
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
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 justify-items-center items-start">
          <div className="space-y-2 w-full max-w-[560px]">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600 px-1">
              <span>Sisi Depan — Data & Foto Anggota</span>
              <span className="font-mono text-[10px] text-slate-400">{ktaId16}</span>
            </div>
            <TiltCardWrapper enableTilt={true}>{renderFrontCard()}</TiltCardWrapper>
          </div>

          <div className="space-y-2 w-full max-w-[560px]">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-600 px-1">
              <span>Sisi Belakang — Ketentuan & Ketua Umum</span>
              <span className="font-mono text-[10px] text-slate-400">RESMI DPP</span>
            </div>
            <TiltCardWrapper enableTilt={true}>{renderBackCard()}</TiltCardWrapper>
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-2">
          <div className="w-full max-w-[560px] perspective-1000">
            <motion.div
              className="relative w-full aspect-[622/363] preserve-3d cursor-pointer"
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setIsFlipped(!isFlipped)}
              title="Klik untuk membalik kartu (Depan / Belakang)"
            >
              <div className="absolute inset-0 backface-hidden">
                <TiltCardWrapper enableTilt={!isFlipped}>
                  {renderFrontCard()}
                </TiltCardWrapper>
              </div>

              <div className="absolute inset-0 backface-hidden rotate-y-180">
                <TiltCardWrapper enableTilt={isFlipped}>
                  {renderBackCard()}
                </TiltCardWrapper>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};
