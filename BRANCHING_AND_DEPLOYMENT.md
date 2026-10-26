# Panduan Strategi Branching GitHub & Deployment Vercel — PERINDO ONE

Dokumen ini menjelaskan arsitektur **Git Branching**, **CI/CD GitHub Actions**, dan **Konfigurasi Deployment Vercel** yang telah disiapkan di dalam repositori **PERINDO ONE**.

---

## 1. Kesiapan Deployment Vercel (`vercel.json`)

Aplikasi ini menggunakan **React 19 + Vite + TypeScript** dengan sistem *Client-Side Routing* (`window.history.pushState`). Agar seluruh URL halaman (seperti `/login`, `/pilih-workspace`, `/app/overview`, `/app/members`, `/app/approvals`, dll.) tidak mengalami **404 Not Found** saat pengguna menekan tombol *Refresh* di browser setelah di-deploy ke Vercel, file `/vercel.json` telah dikonfigurasi secara otomatis:

- **Framework Preset**: `vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Rewrite Rule**: Seluruh rute non-file statis (`/((?!assets/.*|.*\\..*).*)`) diarahkan langsung ke `/index.html`.
- **Static Asset Cache Headers**: Seluruh aset di `/assets/*` (termasuk template resmi KTA Digital `/assets/kta/*`) dilengkapi header cache `max-age=31536000, immutable` agar pemuatan kartu KTA sangat cepat.

### Cara Deploy ke Vercel (Tanpa Kendala)

#### Opsi A: Integrasi Langsung GitHub ke Vercel (Direkomendasikan — Zero Config)
1. Push kode repositori ini ke GitHub.
2. Buka [Vercel Dashboard](https://vercel.com/new) lalu klik **Add New Project** -> **Import Git Repository**.
3. Pilih repositori GitHub proyek ini.
4. Vercel akan otomatis membaca file `vercel.json` (`Framework: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
5. Klik **Deploy** — aplikasi langsung online tanpa konfigurasi tambahan.

#### Opsi B: Deploy Melalui GitHub Actions CLI (`cd-vercel.yml`)
Jika Anda ingin GitHub Actions yang mengeksekusi deployment melalui Vercel CLI, tambahkan 3 *Repository Secrets* di GitHub (`Settings -> Secrets and variables -> Actions`):
- `VERCEL_TOKEN`: Token dari akun Vercel Anda (`Account Settings -> Tokens`)
- `VERCEL_ORG_ID`: ID organisasi/tim Vercel Anda
- `VERCEL_PROJECT_ID`: ID proyek Vercel Anda

*(Catatan: Apabila ketiga secret tersebut belum diisi, workflow `.github/workflows/cd-vercel.yml` memiliki pengecekan pintar sehingga tidak akan gagal/merah dan tetap meloloskan validasi build).*

---

## 2. Struktur & Strategi Branching (GitFlow)

Repositori ini menerapkan alur kerja 5 jenjang branch:

| Nama Branch | Peruntukan | Environment Vercel | Aturan Merge |
| :--- | :--- | :--- | :--- |
| **`main`** | Kode rilis utama yang stabil dan digunakan secara nasional oleh seluruh jenjang (Ketum s/d DPRt). | **Production** (`perindo-one.vercel.app`) | Hanya menerima PR dari `staging` atau `hotfix/*` setelah lolos CI. |
| **`staging`** | Cabang pra-rilis untuk pengujian UAT oleh tim IT & Sekretariat Jenderal DPP. | **Staging Preview** (`staging-perindo-one.vercel.app`) | Menerima PR dari `develop`. |
| **`develop`** | Cabang integrasi utama tempat seluruh fitur harian digabungkan. | **Dev Preview** | Menerima PR dari `feature/*` dan `fix/*`. |
| **`feature/*`** | Cabang pengembangan fitur baru (contoh: `feature/kta-qr-verification`, `feature/dprt-tps-import`). | **PR Preview URL** | Dibuat dari `develop`, di-merge kembali ke `develop` lewat Pull Request. |
| **`hotfix/*`** | Perbaikan mendesak pada produksi (contoh: `hotfix/kta-print-margin`). | **PR Preview URL** | Dibuat dari `main`, di-merge ke `main` dan di-backport ke `develop`. |

---

## 3. Perintah Git untuk Inisialisasi Branch di GitHub

Jalankan perintah berikut saat pertama kali menghubungkan repositori ke GitHub:

```bash
# 1. Pastikan berada di branch utama (main)
git branch -M main
git push -u origin main

# 2. Buat dan publikasikan branch staging
git checkout -b staging
git push -u origin staging

# 3. Buat dan publikasikan branch develop
git checkout -b develop
git push -u origin develop

# 4. Contoh memulai fitur baru dari develop
git checkout -b feature/update-kta-digital develop
```

---

## 4. Pipeline GitHub Actions yang Aktif

1. **`.github/workflows/ci.yml` (Continuous Integration)**
   - Berjalan otomatis pada setiap `push` dan `pull_request` di branch `main`, `staging`, `develop`, `feature/**`, `fix/**`, dan `hotfix/**`.
   - Menjalankan instalasi dependensi, `npm run lint` (pengecekan tipe TypeScript menyeluruh), validasi sintaks `vercel.json`, `npm run build` (Vite production bundle), serta memastikan seluruh aset KTA Digital berada di dalam folder `dist/`.
2. **`.github/workflows/cd-vercel.yml` (Continuous Deployment)**
   - Mengotomasi build dan rilis ke **Vercel Preview** (untuk branch `staging`, `develop`, dan Pull Request) serta **Vercel Production** (khusus push ke branch `main`).
