## Ringkasan Perubahan (Pull Request Summary)
Jelaskan secara singkat perubahan fitur, perbaikan bug, atau pembaruan konfigurasi pada PR ini:
- 

## Target Branch & Strategi Branching
- [ ] `feature/*` atau `fix/*` -> menuju `develop` (Development)
- [ ] `develop` -> menuju `staging` (UAT / Preview Pengurus DPP)
- [ ] `staging` atau `hotfix/*` -> menuju `main` (Production Vercel)

## Modul Terdampak
- [ ] Hierarki & RBAC (Ketum / DPP / DPW / DPD / DPC / DPRt)
- [ ] KTA Digital & Direktori Kader (`KtaCard.tsx` / `MembersPage.tsx`)
- [ ] Persetujuan SK & Alur Berjenjang (`ApprovalsPage.tsx`)
- [ ] Portal Publik / Pemetaan Pemilu
- [ ] Infrastruktur CI/CD & Konfigurasi Vercel

## Checklist Verifikasi Sebelum Merge
- [ ] `npm run lint` (`tsc --noEmit`) berjalan sukses tanpa error
- [ ] `npm run build` (`vite build`) berhasil memproduksi folder `dist/`
- [ ] Tampilan responsif & cetak KTA Digital sudah diuji
- [ ] Vercel Preview Deployment berhasil ter-generate tanpa kendala
