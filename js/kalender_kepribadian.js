// js/kalender_kepribadian.js

/**
 * Fungsi untuk mendapatkan Hari, Pasaran, dan detail Weton dari tanggal Masehi,
 * dengan mempertimbangkan waktu lahir (sebelum/sesudah Maghrib).
 */
function getJavaneseDetails(tanggalMasehiString, waktuLahir) { // Tambah parameter waktuLahir
    try {
        let tanggalTarget = new Date(tanggalMasehiString);

        // Validasi tanggal sederhana
        if (isNaN(tanggalTarget.getTime())) {
            throw new Error("Format tanggal tidak valid.");
        }

        // Penyesuaian tanggal jika lahir SESUDAH MAGHRIB
        // Pergantian hari dalam kalender Jawa/Islam adalah saat Maghrib.
        // Jika lahir sesudah Maghrib pada tanggal Masehi X,
        // maka hari Jawa-nya sudah masuk ke tanggal Masehi X+1.
        if (waktuLahir === "sesudah_maghrib") {
            tanggalTarget.setDate(tanggalTarget.getDate() + 1);
        }

        // Tanggal referensi: 1 Januari 1900 (Senin Pahing)
        const tanggalRef = new Date(1900, 0, 1);
        const refDayIndex = 1; // Senin
        const refPasaranIndex = 1; // Pahing

        const selisihMiliDetik = tanggalTarget.getTime() - tanggalRef.getTime();
        const selisihHari = Math.floor(selisihMiliDetik / (1000 * 60 * 60 * 24));

        const indexHari = ((refDayIndex + selisihHari) % 7 + 7) % 7;
        const indexPasaran = ((refPasaranIndex + selisihHari) % 5 + 5) % 5;

        const namaHari = NAMA_HARI[indexHari];
        const namaPasaran = NAMA_PASARAN[indexPasaran];
        const weton = `${namaHari} ${namaPasaran}`;

        const tahunMasehi = tanggalTarget.getFullYear(); // Tahun Masehi yang sudah disesuaikan
        const tahunSaka = tahunMasehi - 78;

        // Mendapatkan detail watak dari config_kepribadian.js
        const watakDetail = getWatakDetail(weton); // Memanggil fungsi baru dari config

        if (!watakDetail) {
            // Jika weton ada tapi detailnya tidak ada di config (seharusnya tidak terjadi jika config lengkap)
            return {
                namaHari,
                namaPasaran,
                weton,
                neptuHari: NEPTU_HARI[namaHari],
                neptuPasaran: NEPTU_PASARAN[namaPasaran],
                neptuWeton: NEPTU_HARI[namaHari] + NEPTU_PASARAN[namaPasaran],
                tahunSaka,
                watakDetail: { deskripsi_umum: "Deskripsi detail untuk weton ini belum tersedia." } // Pesan default
            };
        }

        return {
            namaHari,
            namaPasaran,
            weton,
            neptuHari: NEPTU_HARI[namaHari],
            neptuPasaran: NEPTU_PASARAN[namaPasaran],
            neptuWeton: NEPTU_HARI[namaHari] + NEPTU_PASARAN[namaPasaran],
            tahunSaka,
            watakDetail // Ini objek detail dari config
        };

    } catch (error) {
        console.error("Error di getJavaneseDetails:", error);
        return null;
    }
}