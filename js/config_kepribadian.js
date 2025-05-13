// js/config_kepribadian.js

// Konstanta Dasar Kalender Jawa
const NAMA_HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const NAMA_PASARAN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

// Neptu Hari (Dino)
const NEPTU_HARI = {
    "Minggu": 5,
    "Senin": 4,
    "Selasa": 3,
    "Rabu": 7,
    "Kamis": 8,
    "Jumat": 6,
    "Sabtu": 9
};

// Neptu Pasaran
const NEPTU_PASARAN = {
    "Legi": 5,
    "Pahing": 9,
    "Pon": 7,
    "Wage": 4,
    "Kliwon": 8
};

// Menggabungkan semua objek detail Weton dari file-file terpisah.
// Penting: Pastikan file-file data (misal: js/data/weton_minggu.js)
// sudah di-load SEBELUM file config_kepribadian.js ini di dalam HTML Anda.
// Jika tidak, objek seperti MINGGU_WETON_DETAIL akan 'undefined'.

const WATAK_WETON_DETAIL = {
    // Spread operator (...) digunakan untuk menggabungkan objek.
    // Pengecekan `typeof ... !== 'undefined'` adalah untuk menghindari error jika salah satu file data belum ada atau gagal dimuat.
    ...(typeof MINGGU_WETON_DETAIL !== 'undefined' ? MINGGU_WETON_DETAIL : {}),
    ...(typeof SENIN_WETON_DETAIL !== 'undefined' ? SENIN_WETON_DETAIL : {}),
    ...(typeof SELASA_WETON_DETAIL !== 'undefined' ? SELASA_WETON_DETAIL : {}),
    ...(typeof RABU_WETON_DETAIL !== 'undefined' ? RABU_WETON_DETAIL : {}),
    ...(typeof KAMIS_WETON_DETAIL !== 'undefined' ? KAMIS_WETON_DETAIL : {}),
    ...(typeof JUMAT_WETON_DETAIL !== 'undefined' ? JUMAT_WETON_DETAIL : {}),
    ...(typeof SABTU_WETON_DETAIL !== 'undefined' ? SABTU_WETON_DETAIL : {})
};

// Fungsi untuk mendapatkan detail Weton berdasarkan nama Weton (misal: "Minggu Legi")
function getWatakDetail(weton) {
    const detail = WATAK_WETON_DETAIL[weton];

    if (detail) {
        return detail; // Kembalikan objek detail jika ditemukan
    } else {
        // Jika data untuk Weton spesifik tidak ditemukan dalam objek gabungan.
        // Ini bisa terjadi jika file data Weton terkait belum lengkap atau ada kesalahan penamaan.
        console.warn(
            `Data detail untuk Weton "${weton}" tidak ditemukan dalam WATAK_WETON_DETAIL. ` +
            `Pastikan file data yang sesuai (misal: js/data/weton_minggu.js untuk Weton hari Minggu) ` +
            `sudah ada, benar, lengkap, dan dimuat dengan benar sebelum config_kepribadian.js.`
        );

        // Mengembalikan struktur objek default agar aplikasi tidak error saat mencoba mengakses properti.
        // Pengguna akan melihat pesan "Data tidak tersedia" di UI.
        return {
            lakuning: "Tidak Diketahui",
            neptu: 0,
            deskripsi_umum: "Informasi detail untuk weton ini belum tersedia atau tidak ditemukan. Mohon periksa kembali konfigurasi data dan pastikan semua file data Weton telah dimuat dengan benar.",
            pria: {
                sifat_khas: "Data tidak tersedia.",
                potensi_karir: [],
                saran_jodoh_umum: "Data tidak tersedia."
            },
            wanita: {
                sifat_khas: "Data tidak tersedia.",
                potensi_karir: [],
                saran_jodoh_umum: "Data tidak tersedia."
            },
            kelebihan: ["Data tidak tersedia."],
            kekurangan: ["Data tidak tersedia."],
            saran_pengembangan_diri: "Data tidak tersedia.",
            batu_keberuntungan: "Data tidak tersedia.",
            warna_aura_dominan: "Data tidak tersedia."
        };
    }
}

// Catatan: Fungsi getWatakDetail ini akan dipanggil oleh kalender_kepribadian.js
// untuk mengambil data watak yang sudah digabungkan.