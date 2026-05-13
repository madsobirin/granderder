# Admin Components

Komponen-komponen terpisah untuk halaman dashboard admin. Struktur ini dirancang untuk maintainability dan reusability.

## Struktur Komponen

### DashboardHeader

Header dengan logo, judul, dan tombol aksi (Lihat Website, Logout).

**Props:** Tidak ada (menggunakan `useRouter`)

### DashboardStats

Menampilkan statistik dashboard dalam bentuk kartu (Total Promo, Galeri Aktif, Terbit).

**Props:**

- `stats` - Array objek statistik dengan `label` dan `value`

### StatusMessage

Notifikasi pesan status operasi (sukses/gagal).

**Props:**

- `message` - String pesan, return null jika tidak ada pesan

### PromoForm

Form utama untuk menambah/edit promo lengkap dengan preview sidebar.

**Props:**

- `promoForm` - Object dengan semua field promo
- `editingPromoId` - ID promo yang sedang diedit (null jika menambah baru)
- `onPromoChange(key, value)` - Handler untuk mengubah field form
- `onImageUpload(file)` - Handler upload gambar
- `onDragOver()`, `onDragLeave()`, `onDrop()` - Drag & drop handlers
- `onImageChange()` - Handler input file change
- `uploadingImage` - Boolean status upload
- `fileName` - Nama file yang diupload
- `previewStats` - Array statistik untuk preview
- `onSubmit(event)` - Handler submit form
- `saving` - Boolean status saving
- `onCancelEdit()` - Handler batal edit

### PromoFormFields

Sub-komponen dari PromoForm berisi semua input field.

**Props:** Sama seperti PromoForm untuk fields

### PromoImageUpload

Sub-komponen dari PromoForm untuk drag & drop upload gambar.

**Props:**

- `promoForm` - Object form data
- `uploading` - Boolean status upload
- `fileName` - Nama file
- Semua drag & drop handlers

### PromoList

Menampilkan list promo yang sudah ada dengan opsi edit/delete.

**Props:**

- `promos` - Array promo dari API
- `loading` - Boolean loading state
- `onEdit(promo)` - Handler klik edit
- `onDelete(id)` - Handler klik delete

### PromoPreview

Preview card promo di sidebar form, update real-time saat editing.

**Props:**

- `promoForm` - Object form data
- `previewStats` - Array statistik spesifikasi rumah

### GalleryUploadForm

Form untuk upload gambar galeri.

**Props:**

- `galleryForm` - Object form data gallery
- `onGalleryChange(key, value)` - Handler ubah field
- `onImageSelect(image)` - Handler pilih file
- `uploading` - Boolean status upload
- `onSubmit(event)` - Handler submit form

### GalleryList

Menampilkan list gambar galeri dengan opsi delete.

**Props:**

- `galleryImages` - Array gambar dari API
- `loading` - Boolean loading state
- `onDelete(id)` - Handler klik delete

## Cara Menggunakan

```jsx
import {
  DashboardHeader,
  DashboardStats,
  PromoForm,
  PromoList,
  GalleryUploadForm,
  GalleryList,
} from "@/components/admin";
// atau
import * as AdminComponents from "@/components/admin";
```

## Tips Maintenance

- Setiap komponen fokus pada satu tanggung jawab
- State management tetap di parent (page.jsx)
- Gunakan callback props untuk komunikasi antar komponen
- Semua styling sudah included, tinggal pass data & handlers
