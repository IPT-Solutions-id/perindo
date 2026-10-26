import { Person } from '../types';

// Deterministic 17x17 QR Matrix Generator from KTA ID string (Matches Reference B&W QR)
export const generateQrMatrix = (seedString: string): boolean[][] => {
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
        grid[r][c] = Math.abs(hash) % 10 < 5;
      }
    }
  }

  return grid;
};

export interface NormalizedKtaData {
  name: string;
  ktaId16: string;
  birthPlaceDate: string;
  addressLine1: string;
  addressLine2: string;
  cityProvinceLine: string;
  phoneFormatted: string;
  photoSrc: string;
}

export const getNormalizedKtaData = (person: Person): NormalizedKtaData => {
  const ktaId16 =
    person.ktaId16 ||
    person.nikDummy?.replace(/\*/g, '1') ||
    '3202018710310001';

  const birthPlaceDate =
    person.birthPlaceDate ||
    `${person.city.replace(/^(KOTA|KABUPATEN)\s+/i, '')}/31-10-1987`;

  const addressLine1 = person.addressLine1 || 'Kp.sirnagalih RT. 04 RW. 29,';
  const addressLine2 = person.addressLine2 || 'Pelabuhanratu, Pelabuhanratu,';

  const cityFormatted =
    person.city.toUpperCase().startsWith('KOTA') ||
    person.city.toUpperCase().startsWith('KABUPATEN')
      ? person.city.toUpperCase()
      : `KOTA ${person.city.toUpperCase()}`;

  const cityProvinceLine = `${cityFormatted}, ${person.province}`;
  const phoneFormatted = person.phone.startsWith('+62')
    ? person.phone
    : `+62${person.phone.replace(/^0/, '').replace(/-/g, '')}`;

  const photoSrc = person.photoUrl || '/assets/kta/member_photo.png';

  return {
    name: person.name,
    ktaId16,
    birthPlaceDate,
    addressLine1,
    addressLine2,
    cityProvinceLine,
    phoneFormatted,
    photoSrc,
  };
};

/**
 * Formats filename strictly as: nama_nomor kta.<ext>
 * Example: Rizky_fuzi_berlina_3202018710310001.png
 */
export const formatKtaFilename = (person: Person, extension: 'png' | 'pdf'): string => {
  const { name, ktaId16 } = getNormalizedKtaData(person);
  const cleanName = name
    .trim()
    .replace(/[^a-zA-Z0-9\s_-]/g, '')
    .replace(/\s+/g, '_');
  const cleanKta = (ktaId16 || person.ktaNumber || '0000000000000000')
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '');
  return `${cleanName}_${cleanKta}.${extension}`;
};

const loadImageSafe = (src: string, fallbackSrc?: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      if (fallbackSrc && fallbackSrc !== src) {
        const fallbackImg = new Image();
        fallbackImg.crossOrigin = 'anonymous';
        fallbackImg.onload = () => resolve(fallbackImg);
        fallbackImg.onerror = (err) => reject(err);
        fallbackImg.src = fallbackSrc;
      } else {
        reject(new Error(`Failed to load image: ${src}`));
      }
    };
    img.src = src;
  });
};

const drawImageCoverTop = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dWidth: number,
  dHeight: number
) => {
  const imgRatio = img.width / img.height;
  const targetRatio = dWidth / dHeight;

  let sx = 0;
  let sy = 0;
  let sWidth = img.width;
  let sHeight = img.height;

  if (imgRatio > targetRatio) {
    // Image is wider than target: crop horizontally from center
    sWidth = img.height * targetRatio;
    sx = (img.width - sWidth) / 2;
  } else {
    // Image is taller than target: crop vertically aligned to top (object-top)
    sHeight = img.width / targetRatio;
    sy = 0;
  }

  ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};

const truncateText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string => {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let truncated = text;
  while (truncated.length > 0 && ctx.measureText(`${truncated}...`).width > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  return `${truncated}...`;
};

/**
 * Renders the Front KTA Card onto a 1244x726 high-res canvas (2x retina of 622x363)
 */
export const renderFrontCardCanvas = async (person: Person): Promise<HTMLCanvasElement> => {
  const width = 1244;
  const height = 726;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  const data = getNormalizedKtaData(person);
  const qrMatrix = generateQrMatrix(`${data.ktaId16}-${data.name}`);

  // 1. White Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  // 2. Top 49.2% Header Image (/assets/kta/kta_front_header.png)
  const headerHeight = Math.round(height * 0.492);
  const headerImg = await loadImageSafe('/assets/kta/kta_front_header.png');
  ctx.drawImage(headerImg, 0, 0, width, headerHeight);

  // 3. Bottom 50.8% Body Area
  const bodyY = headerHeight;
  const bodyHeight = height - headerHeight;
  const padX = Math.round(width * 0.055); // 5.5%
  const padY = Math.round(bodyHeight * 0.055);
  const innerX = padX;
  const innerY = bodyY + padY;
  const innerW = width - padX * 2;
  const innerH = bodyHeight - padY * 2;
  const gapX = Math.round(innerW * 0.035);

  // 3a. Left Column: Member Portrait Photo (18.5% width of innerW, 96% height of innerH)
  const photoW = Math.round(innerW * 0.185);
  const photoH = Math.round(innerH * 0.96);
  const photoX = innerX;
  const photoY = innerY + (innerH - photoH);

  try {
    const memberImg = await loadImageSafe(data.photoSrc, '/assets/kta/member_photo.png');
    drawImageCoverTop(ctx, memberImg, photoX, photoY, photoW, photoH);
  } catch {
    ctx.fillStyle = '#F1F5F9';
    ctx.fillRect(photoX, photoY, photoW, photoH);
  }

  // 3b. Right Column: Crisp B&W QR Code (22% width of innerW, square)
  const qrSize = Math.round(innerW * 0.22);
  const qrX = innerX + innerW - qrSize;
  const qrY = innerY + Math.round((innerH - qrSize) / 2);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(qrX, qrY, qrSize, qrSize);

  const cellSize = qrSize / 17;
  ctx.fillStyle = '#000000';
  for (let r = 0; r < 17; r++) {
    for (let c = 0; c < 17; c++) {
      if (qrMatrix[r][c]) {
        const cx = Math.floor(qrX + c * cellSize);
        const cy = Math.floor(qrY + r * cellSize);
        const cw = Math.ceil(qrX + (c + 1) * cellSize) - cx;
        const ch = Math.ceil(qrY + (r + 1) * cellSize) - cy;
        ctx.fillRect(cx, cy, cw, ch);
      }
    }
  }

  // 3c. Center Column: 7 Crisp Text Lines matching Reference KTA
  const textX = photoX + photoW + gapX;
  const textMaxW = qrX - gapX - textX;

  ctx.textBaseline = 'top';
  let curY = innerY + 18;

  // Line 1: 16-Digit KTA / NIK ID
  ctx.font = '700 32px Inter, Arial, sans-serif';
  ctx.fillStyle = '#222222';
  ctx.fillText(truncateText(ctx, data.ktaId16, textMaxW), textX, curY);
  curY += 38;

  // Line 2: Member Full Name
  ctx.font = '700 31px Inter, Arial, sans-serif';
  ctx.fillStyle = '#222222';
  ctx.fillText(truncateText(ctx, data.name, textMaxW), textX, curY);
  curY += 42;

  // Lines 3 - 7: Secondary Details
  ctx.font = '400 21px Inter, Arial, sans-serif';
  ctx.fillStyle = '#666666';
  const detailLineHeight = 27;

  // Line 3: Birthplace / Date
  ctx.fillText(truncateText(ctx, data.birthPlaceDate, textMaxW), textX, curY);
  curY += detailLineHeight;

  // Line 4: Address Line 1
  ctx.fillText(truncateText(ctx, data.addressLine1, textMaxW), textX, curY);
  curY += detailLineHeight;

  // Line 5: Address Line 2
  ctx.fillText(truncateText(ctx, data.addressLine2, textMaxW), textX, curY);
  curY += detailLineHeight;

  // Line 6: City & Province
  ctx.fillText(truncateText(ctx, data.cityProvinceLine, textMaxW), textX, curY);
  curY += detailLineHeight + 4;

  // Line 7: Telp
  ctx.fillText(truncateText(ctx, `Telp : ${data.phoneFormatted}`, textMaxW), textX, curY);

  return canvas;
};

/**
 * Renders the Back KTA Card onto a 1244x726 high-res canvas
 */
export const renderBackCardCanvas = async (): Promise<HTMLCanvasElement> => {
  const width = 1244;
  const height = 726;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);

  const backImg = await loadImageSafe('/assets/kta/kta_back_official.png');
  ctx.drawImage(backImg, 0, 0, width, height);

  return canvas;
};

/**
 * Renders a combined high-res sheet containing both Front (top) and Back (bottom) KTA cards
 * Exactly like the official KTA reference image.
 */
export const renderCombinedKtaCanvas = async (person: Person): Promise<HTMLCanvasElement> => {
  const [frontCanvas, backCanvas] = await Promise.all([
    renderFrontCardCanvas(person),
    renderBackCardCanvas(),
  ]);

  const cardW = 1244;
  const cardH = 726;
  const gapY = 36;
  const pad = 28;

  const totalW = cardW + pad * 2;
  const totalH = cardH * 2 + gapY + pad * 2;

  const combined = document.createElement('canvas');
  combined.width = totalW;
  combined.height = totalH;
  const ctx = combined.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not available');

  // Clean light neutral background with subtle card borders
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, totalW, totalH);

  // Draw Front Card + Border
  ctx.drawImage(frontCanvas, pad, pad, cardW, cardH);
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, pad, cardW, cardH);

  // Draw Back Card + Border
  const backY = pad + cardH + gapY;
  ctx.drawImage(backCanvas, pad, backY, cardW, cardH);
  ctx.strokeRect(pad, backY, cardW, cardH);

  return combined;
};

/**
 * Builds a standards-compliant PDF 1.4 file containing the high-res JPEG image stream
 * without requiring any external third-party PDF library.
 */
const createPdfBlobFromCanvas = (canvas: HTMLCanvasElement): Blob => {
  const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.96);
  const base64Data = jpegDataUrl.split(',')[1];
  const binaryString = atob(base64Data);
  const imgBytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    imgBytes[i] = binaryString.charCodeAt(i);
  }

  const imgW = canvas.width;
  const imgH = canvas.height;

  // Standard A4 Portrait in PDF points (595.28 x 841.89 pt)
  const pageW = 595.28;
  const pageH = 841.89;
  const margin = 36;
  const availW = pageW - margin * 2;
  const availH = pageH - margin * 2;

  const scale = Math.min(availW / imgW, availH / imgH);
  const drawW = +(imgW * scale).toFixed(2);
  const drawH = +(imgH * scale).toFixed(2);
  const drawX = +((pageW - drawW) / 2).toFixed(2);
  const drawY = +((pageH - drawH) / 2).toFixed(2);

  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  const offsets: number[] = [];
  let currentLength = 0;

  const pushStr = (str: string) => {
    const bytes = encoder.encode(str);
    chunks.push(bytes);
    currentLength += bytes.length;
  };

  const pushBytes = (bytes: Uint8Array) => {
    chunks.push(bytes);
    currentLength += bytes.length;
  };

  const startObj = (id: number) => {
    offsets[id] = currentLength;
    pushStr(`${id} 0 obj\n`);
  };

  const endObj = () => {
    pushStr('\nendobj\n');
  };

  // PDF Header
  pushStr('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n');

  // 1: Catalog
  startObj(1);
  pushStr('<< /Type /Catalog /Pages 2 0 R >>');
  endObj();

  // 2: Pages
  startObj(2);
  pushStr('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  endObj();

  // 3: Page
  startObj(3);
  pushStr(
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`
  );
  endObj();

  // 4: Image XObject (JPEG DCTDecode)
  startObj(4);
  pushStr(
    `<< /Type /XObject /Subtype /Image /Width ${imgW} /Height ${imgH} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgBytes.length} >>\nstream\n`
  );
  pushBytes(imgBytes);
  pushStr('\nendstream');
  endObj();

  // 5: Page Content Stream
  const contentStream = `q\n${drawW} 0 0 ${drawH} ${drawX} ${drawY} cm\n/Im0 Do\nQ\n`;
  const contentBytes = encoder.encode(contentStream);
  startObj(5);
  pushStr(`<< /Length ${contentBytes.length} >>\nstream\n`);
  pushBytes(contentBytes);
  pushStr('endstream');
  endObj();

  // XRef Table
  const xrefOffset = currentLength;
  pushStr('xref\n0 6\n0000000000 65535 f \n');
  for (let i = 1; i <= 5; i++) {
    const paddedOffset = String(offsets[i]).padStart(10, '0');
    pushStr(`${paddedOffset} 00000 n \n`);
  }

  // Trailer
  pushStr(
    `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`
  );

  return new Blob(chunks as BlobPart[], { type: 'application/pdf' });
};

const triggerBlobDownload = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
};

/**
 * Downloads KTA as PNG with filename: nama_nomor kta.png
 */
export const downloadKtaAsPng = async (person: Person): Promise<string> => {
  const filename = formatKtaFilename(person, 'png');
  const canvas = await renderCombinedKtaCanvas(person);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Gagal membuat file PNG KTA'));
          return;
        }
        triggerBlobDownload(blob, filename);
        resolve(filename);
      },
      'image/png',
      1.0
    );
  });
};

/**
 * Downloads KTA as PDF with filename: nama_nomor kta.pdf
 */
export const downloadKtaAsPdf = async (person: Person): Promise<string> => {
  const filename = formatKtaFilename(person, 'pdf');
  const canvas = await renderCombinedKtaCanvas(person);
  const pdfBlob = createPdfBlobFromCanvas(canvas);
  triggerBlobDownload(pdfBlob, filename);
  return filename;
};
