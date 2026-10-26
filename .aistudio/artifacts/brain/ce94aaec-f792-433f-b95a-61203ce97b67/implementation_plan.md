# Sistem Hierarki Peran & Operasional Harian Berjenjang (Ketua Umum, DPP, DPW, DPD, DPC, DPRt)

Transformasi sistem manajemen **PERINDO ONE** untuk menghadirkan struktur komando dan operasional kerja harian yang utuh dari tingkat **Ketua Umum**, **DPP (Pusat)**, **DPW (Provinsi)**, **DPD (Kabupaten/Kota)**, **DPC (Kecamatan)**, hingga **DPRt (Kelurahan/Desa)** dengan wewenang berjenjang sesuai wilayah Surat Keputusan (SK).

---

## User Review & Keputusan Utama

> [!IMPORTANT]
> Rencana ini disusun berdasarkan jawaban konfirmasi Anda pada tahap klarifikasi sebelumnya dan siap dieksekusi begitu Anda menekan tombol persetujuan.

- **Keputusan Terkonfirmasi 1 — Struktur Jabatan Lengkap**: Menghadirkan profil akun dan *workspace* lengkap untuk **Ketua Umum (Angela H. Tanoesoedibjo)**, **Pimpinan & Admin DPP**, **Ketua DPW (Provinsi)**, **Ketua DPD (Kab/Kota)**, **Ketua DPC (Kecamatan)**, dan **Ketua DPRt (Kelurahan/Ranting)**, berdampingan dengan struktur Sayap, Badan, Saksi TPS, dan Kader.
- **Keputusan Terkonfirmasi 2 — Wewenang Berjenjang Sesuai Wilayah (Tiered Territorial RBAC)**:
  - **Ketua Umum & DPP**: Wewenang penuh berskala **Nasional** (38 Provinsi, seluruh unit induk, sayap, dan badan) termasuk hak otorisasi puncak dan penerbitan Instruksi Khusus.
  - **DPW (Provinsi)**: Mengelola dan mengawasi seluruh DPD, DPC, dan DPRt di dalam provinsinya (contoh: DPW DKI Jakarta atau DPW Jawa Barat).
  - **DPD (Kabupaten/Kota)**: Mengelola dan mengawasi seluruh DPC dan DPRt di wilayah kota/kabupatennya (contoh: DPD Kota Jakarta Pusat atau DPD Kota Bandung).
  - **DPC (Kecamatan)**: Mengelola operasional kecamatan dan membina seluruh DPRt kelurahan di bawahnya (contoh: DPC Kecamatan Menteng).
  - **DPRt (Kelurahan/Desa)**: Ujung tombak operasional harian di tingkat akar rumput (pendataan warga, rekrutmen kader, giat ranting, dan pemetaan saksi TPS).
- **Keputusan Terkonfirmasi 3 — Cakupan Pekerjaan Harian Menyeluruh (End-to-End Daily Operations)**: Mengaktifkan siklus kerja harian terintegrasi di semua modul yang menghubungkan instruksi dari atas ke bawah (*Top-Down Directive*) dan pelaporan/pengajuan dari bawah ke atas (*Bottom-Up Reporting & Approval*).

---

## 1. Gambaran Umum & Konsep Inti

- **Apa yang Dilakukan Sistem Ini**: Menyediakan ruang kerja (*workspace*) yang secara cerdas menyesuaikan **data wilayah**, **indikator kinerja (KPI)**, **daftar tugas harian**, dan **hak persetujuan dokumen** berdasarkan jabatan pengguna yang sedang aktif.
- **Target Pengguna / Persona**:
  1. **Ketua Umum (`KETUA_UMUM`)**: Memantau kesehatan organisasi nasional, menerbitkan Instruksi Ketua Umum ke seluruh jenjang, mengesahkan SK strategis DPW/DPD/Caleg, dan memantau rapor kinerja ketua wilayah.
  2. **Pengurus DPP (`DPP_ADMIN` / `EXECUTIVE`)**: Memverifikasi pengajuan SK dan proposal anggaran dari DPW/DPD, mengelola program nasional, serta mengoordinasikan kesiapan pemilu & seleksi caleg.
  3. **Ketua DPW Provinsi (`DPW_MANAGER`)**: Mengoordinasikan DPD se-provinsi, mereview pengajuan SK DPD/DPC sebelum diteruskan ke DPP, menindaklanjuti disposisi pusat, dan memantau serapan program UMKM tingkat provinsi.
  4. **Ketua DPD Kab/Kota (`DPD_MANAGER`)**: Membina DPC se-kota/kabupaten, memverifikasi laporan kegiatan kecamatan, mengelola penugasan verifikator TPS dan penilaian bakal caleg DPRD Kab/Kota.
  5. **Ketua DPC Kecamatan (`DPC_MANAGER`)**: Menggerakkan DPRt kelurahan, mendistribusikan program bantuan/UMKM ke warga, memvalidasi pendaftaran kader baru, dan memetakan koordinator saksi kecamatan.
  6. **Ketua DPRt Kelurahan (`DPRT_MANAGER`)**: Melaksanakan kegiatan tatap muka warga, mendaftarkan anggota baru di kelurahan, menindaklanjuti tiket aspirasi warga sekitar, dan menginput kesiapan saksi per TPS.
- **Nilai Utama**: Menghilangkan sekat informasi antar-jenjang partai melalui satu alur kerja harian yang transparan, terukur, dan patuh pada hierarki organisasi.

---

## 2. Pengalaman Pengguna & Desain Visual

- **Alur Kerja Harian (*Key User Flows*)**:
  1. **Pemilihan & Pergantian Peran Cepat (*Role & Hierarchy Switcher*)**: Melalui halaman Login maupun pemilih *Workspace* di bilah atas aplikasi, pengguna dapat masuk atau berpindah ke peran **Ketua Umum**, **DPP**, **DPW**, **DPD**, **DPC**, atau **DPRt** untuk menjalankan simulasi maupun operasional nyata.
  2. **Meja Kerja Harian (*Daily Operational Desk* pada Ringkasan Kerja)**: Setiap peran memiliki daftar tugas harian spesifik (*Daily Action Queue*), contohnya:
     - *Ketua Umum*: Mengeluarkan Disposisi/Instruksi Nasional, Mengesahkan SK Pengurus DPW/DPD, Meninjau Rapor Kinerja Provinsi.
     - *DPW / DPD*: Memverifikasi Pengajuan SK dari DPC/DPRt di bawahnya, Melaporkan Progres Disposisi Pusat, Memantau Serapan Anggaran Wilayah.
     - *DPC / DPRt*: Verifikasi Kader Baru Harian, Input Laporan Kegiatan Lapangan, Tindak Lanjut Tiket Aspirasi Warga.
  3. **Alur Persetujuan Berjenjang (*Multi-Tier Approval Pipeline*)**: Dokumen SK dan proposal anggaran menampilkan tahapan posisi dokumen secara jelas (`Diajukan DPRt/DPC` $\rightarrow$ `Verifikasi DPD/DPW` $\rightarrow$ `Pengesahan DPP / Ketua Umum`) dengan tombol aksi sesuai wewenang peran aktif.
  4. **Instruksi & Disposisi Berjenjang (*Command & Directive Flow*)**: Ketua Umum dan DPP dapat menerbitkan instruksi kerja harian (lengkap dengan batas waktu dan target wilayah) yang langsung muncul di layar kerja DPW, DPD, DPC, dan DPRt terkait untuk diperbarui status pengerjaannya (`Diterima` $\rightarrow$ `Sedang Dikerjakan` $\rightarrow$ `Selesai Dilaporkan`).
- **Identitas Visual & Tema**:
  - *Aesthetic Direction*: *High-Trust Institutional Governance* — bersih, berwibawa, terstruktur rapi dengan kepadatan informasi yang nyaman dipindai (*scannable*).
  - *Color Palette & Mood*: Kanvas netral terang (`#F5F7FB`) dan permukaan kartu putih bersih (`#FFFFFF`) dengan garis batas halus (`#E2E8F0`), dipadukan warna identitas resmi Perindo Navy (`#102C63`), Biru Safir (`#1667C7`), dan aksen Merah Marun (`#D7283F`) serta indikator status semantik Hijau (`#16A34A`) dan Amber (`#D97706`).
  - *Typography & Hierarchy*: Menggunakan `Plus Jakarta Sans` untuk judul dan navigasi yang tegas, dipadukan angka tabular (`tabular-nums` / `JetBrains Mono`) pada seluruh tabel statistik kader, anggaran, nomor SK, dan rekapitulasi suara agar sejajar presisi.
  - *Component Styling & Layout*: Mengikuti kontrak *Workspace Canvas* (Sidebar kiri 256px + Header kontekstual dengan *Role/Unit Switcher* + Area kerja utama berlebar penuh 1440px) dengan kedalaman satu level (*single-elevation depth*) tanpa penumpukan kartu di dalam kartu.
- **Umpan Balik Interaktif**: Setiap aksi harian (menyetujui SK, mengirim disposisi, menambah kader, memperbarui status kegiatan, atau berpindah tingkatan jabatan) langsung memperbarui metrik dan mencatat riwayat ke dalam *Jejak Audit (Audit Trail)* secara instan.

---

## 3. Keputusan Produk & Pertimbangan Arsitektur

- **Keputusan 1: Hierarki Pohon Teritorial Otomatis (*Hierarchical Tree Scoping*)**
  - *Pendekatan yang Dipilih*: Setiap unit organisasi memiliki relasi induk-anak (`DPP` $\rightarrow$ `DPW` $\rightarrow$ `DPD` $\rightarrow$ `DPC` $\rightarrow$ `DPRt`). Saat pengguna masuk sebagai Ketua DPW DKI Jakarta, sistem otomatis menghitung dan menampilkan seluruh data milik DPW DKI Jakarta beserta seluruh DPD, DPC, dan DPRt di bawahnya, namun membatasi pengeditan pada wilayah provinsi lain (seperti DPW Jawa Barat). Saat masuk sebagai **Ketua Umum**, seluruh pohon nasional terbuka penuh.
  - *Alasan*: Mencerminkan tata kelola partai sesungguhnya di mana pimpinan tingkat atas membina struktur di bawahnya dalam satu garis wilayah, sementara Ketua Umum memiliki visibilitas menyeluruh.
- **Keputusan 2: Penyatuan Pekerjaan Harian dalam Modul Terpadu**
  - *Pendekatan yang Dipilih*: Memperkaya modul yang sudah ada (*Ringkasan Kerja*, *Struktur Organisasi*, *Database Kader*, *Program & UMKM*, *Agenda & Kegiatan*, *Layanan & Aspirasi*, *Verifikasi & SK*, *Saksi TPS*, *Seleksi Caleg*, dan *Command Center*) dengan konteks peran aktif serta menambahkan kemampuan **Instruksi & Disposisi Pimpinan** agar alur kerja harian dari Ketua Umum hingga DPRt tersambung tanpa putus.
  - *Alasan*: Memastikan navigasi tetap ringkas dan familier bagi pengguna sambil memberikan kedalaman fungsi operasional di setiap menu.

---

## 4. Arsitektur Teknis & Strategi Data

### Diagram Arsitektur Hierarki Peran & Alur Kerja Harian

```
┌───────────────────────────────────────────────────────────────────────────────┐
│                   HIERARKI KOMANDO & WEWENANG TERITORIAL                      │
├───────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│   [ KETUA UMUM (KETUA_UMUM) ] ──► Akses Penuh Nasional, Otorisasi Puncak SK,  │
│               │                   Instruksi Nasional & Rapor Kinerja Wilayah  │
│               ▼                                                               │
│   [ DEWAN PIMPINAN PUSAT (DPP) ] ► Tata Kelola Nasional, Verifikasi SK Pusat, │
│               │                    Evaluasi Caleg DPR RI & Command Center     │
│               ▼                                                               │
│   [ DPW PROVINSI (DPW_MANAGER) ] ► Koordinasi Provinsi, Rekomendasi SK DPD,   │
│               │                    Monitoring Program & Kader Lintas Kab/Kota │
│               ▼                                                               │
│   [ DPD KAB/KOTA (DPD_MANAGER) ] ► Pembinaan DPC Kecamatan, Verifikasi C1     │
│               │                    Tingkat Kota & Seleksi Caleg DPRD          │
│               ▼                                                               │
│   [ DPC KECAMATAN (DPC_MANAGER)] ► Eksekusi Program UMKM Kecamatan, Validasi  │
│               │                    Kader Baru & Koordinasi Saksi Kelurahan    │
│               ▼                                                               │
│   [ DPRt KELURAHAN (DPRT_MANAGER)]► Giat Warga Harian, Input Kader Akar       │
│                                     Rumput, Aspirasi Warga & Saksi TPS        │
│                                                                               │
└───────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                SIKLUS OPERASIONAL HARIAN LINTAS MODUL (2 ARAH)                │
├───────────────────────────────────┬───────────────────────────────────────────┤
│   ALUR INSTRUKSI (TOP-DOWN)       │   ALUR PELAPORAN & SK (BOTTOM-UP)         │
│   1. Ketum/DPP buat Disposisi     │   1. DPRt/DPC ajukan SK / Program / Kader │
│   2. Turun ke meja kerja DPW/DPD  │   2. Direview & disetujui berjenjang oleh │
│   3. Diteruskan & dieksekusi DPC  │      DPD -> DPW -> DPP -> Ketua Umum      │
│   4. Progres otomatis teragregasi │   3. Tercatat real-time di Audit Trail    │
└───────────────────────────────────┴───────────────────────────────────────────┘
```

### Pemetaan Komponen Interaktif & Status Data

1. **Mesin Otorisasi & Cakupan Wilayah (`AuthContext` & `Hierarchy Helper`)**:
   - Menambahkan peran resmi `KETUA_UMUM` beserta kelengkapan akun untuk seluruh jenjang (`KETUA_UMUM`, `DPP_ADMIN`, `EXECUTIVE`, `DPW_MANAGER`, `DPD_MANAGER`, `DPC_MANAGER`, `DPRT_MANAGER`, `WING_MANAGER`, `INSTITUTION_MANAGER`, `TPS_WITNESS`, `TPS_VERIFIER`, `CANDIDATE_EVALUATOR`, `MEMBER`).
   - Fungsi resolusi hierarki unit (`getSubordinateUnitIds`) yang secara otomatis mendeteksi seluruh unit bawahan dari unit pengguna yang sedang aktif.
2. **Manajemen Instruksi & Disposisi Harian (`DataContext` & `OverviewPage`)**:
   - Menyediakan daftar **Instruksi & Disposisi Kerja Harian** di mana Ketua Umum/DPP/DPW dapat menambahkan instruksi baru ke unit bawahan, dan unit penerima (DPW/DPD/DPC/DPRt) dapat mengubah status pelaksanaannya secara langsung.
3. **Alur Persetujuan Berjenjang (`ApprovalsPage`)**:
   - Mendukung tahapan verifikasi bertingkat mulai dari pengajuan tingkat bawah (`MENUNGGU_REKOMENDASI_DPW_DPD`), verifikasi pusat (`MENUNGGU_VERIFIKASI_DPP`), hingga pengesahan akhir (`DISETUJUI_DPP` / `DISAHKAN_KETUA_UMUM`), lengkap dengan tombol pengajuan permohonan SK/anggaran baru bagi pengurus wilayah.
4. **Filter Kontekstual Otomatis di Seluruh Halaman Operasional**:
   - Pada *Database Kader*, *Struktur Organisasi*, *Program & UMKM*, *Agenda & Kegiatan*, serta *Layanan & Aspirasi*, terdapat indikator cakupan wilayah aktif serta filter instan antara **"Wilayah Kewenangan Saya (Termasuk Unit Bawahan)"** dan **"Seluruh Struktur"** (khusus Ketua Umum & DPP).
