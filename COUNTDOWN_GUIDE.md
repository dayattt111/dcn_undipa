# Fitur Countdown Pendaftaran Program

## 📌 Cara Menambahkan Countdown pada Program

### 1. Tambahkan `registrationDeadline` di data program

Edit file: `src/constants/community.ts`

```typescript
{
  id: 1,
  title: 'Bootcamp Full-Stack Web Development',
  slug: 'bootcamp-fullstack-web',
  description: 'Deskripsi program...',
  image: '/icons/content-strategy.png',
  status: 'active',
  participants: 35,
  category: 'bootcamp',
  startDate: '2025-01-15',
  registrationDeadline: '2025-01-08', // 7 hari sebelum mulai
}
```

### 2. Format Tanggal

Gunakan format ISO 8601: `YYYY-MM-DD` atau `YYYY-MM-DDTHH:mm:ss`

Contoh:
- `'2025-12-31'` - Tanpa waktu (midnight)
- `'2025-12-31T23:59:59'` - Dengan waktu spesifik

### 3. Menghitung Deadline Otomatis

Gunakan helper function:

```typescript
import { calculateRegistrationDeadline } from '@/utils/date-helpers'

// 7 hari sebelum startDate
const deadline = calculateRegistrationDeadline('2025-01-15', 7)

// 3 hari sebelum startDate
const deadline = calculateRegistrationDeadline('2025-01-15', 3)
```

## ⏰ Fitur yang Diterapkan

### 1. **Countdown Timer Real-time**
- Hitung mundur dalam format: Hari, Jam, Menit, Detik
- Update setiap detik
- Menggunakan timezone WIB (GMT+7)

### 2. **Disable Link Otomatis**
- Card program tidak bisa diklik setelah deadline
- Tampilan card menjadi transparan (opacity 0.6)
- Cursor berubah menjadi `not-allowed`

### 3. **Status Visual**
- Chip "Pendaftaran Ditutup" muncul saat expired
- Countdown timer hilang setelah deadline
- Tombol "Daftar Sekarang" disabled

### 4. **Lokasi Countdown**
- ✅ Homepage (home-services.tsx)
- ✅ Halaman Programs List (programs-page-content.tsx)
- ✅ Halaman Program Detail (program-detail-content.tsx)

## 🎨 Ukuran Countdown

```typescript
<CountdownTimer 
  deadline="2025-12-31T23:59:59" 
  onExpired={() => setIsExpired(true)}
  size="small"   // Homepage & List
  size="medium"  // Default
  size="large"   // Detail Page
/>
```

## 📝 Contoh Penggunaan

### Program dengan Countdown (7 hari)

```typescript
{
  id: 1,
  title: 'Bootcamp Full-Stack',
  slug: 'bootcamp-fullstack',
  startDate: '2025-01-15',
  registrationDeadline: '2025-01-08', // 7 hari sebelum mulai
}
```

### Program Tanpa Countdown (Selalu Buka)

```typescript
{
  id: 2,
  title: 'Study Group',
  slug: 'study-group-android',
  // Tidak ada registrationDeadline = selalu buka
}
```

### Program dengan Deadline Jauh (1 tahun)

```typescript
{
  id: 3,
  title: 'Program Regular',
  slug: 'program-regular',
  registrationDeadline: '2026-12-31', // Buka sampai akhir tahun
}
```

## 🔧 Modifikasi

### Mengubah Timezone

Edit file: `src/components/core/countdown-timer.tsx`

```typescript
// Ganti WIB (GMT+7) ke timezone lain
const wibOffset = 7 * 60 * 60 * 1000 // WIB
const witaOffset = 8 * 60 * 60 * 1000 // WITA
const witOffset = 9 * 60 * 60 * 1000 // WIT
```

### Mengubah Warna Countdown

Edit styling di `CountdownTimer` component:

```typescript
color: 'primary.main',  // Magenta
color: 'error.main',    // Red (untuk urgency)
color: 'warning.main',  // Orange
```

## ✅ Validasi

Program akan otomatis:
1. ✅ Menampilkan countdown jika ada `registrationDeadline`
2. ✅ Disable link jika deadline sudah lewat
3. ✅ Update UI setiap detik
4. ✅ Trigger `onExpired` callback saat waktu habis
5. ✅ Menampilkan "Pendaftaran Ditutup" setelah expired

## 🚀 Testing

Untuk testing, set deadline beberapa menit dari sekarang:

```typescript
registrationDeadline: new Date(Date.now() + 5 * 60 * 1000).toISOString() // 5 menit dari sekarang
```
