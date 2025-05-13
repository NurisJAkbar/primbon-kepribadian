// js/main_kepribadian.js

document.getElementById('lihatRamalanButton').addEventListener('click', function() {
    const namaInput = document.getElementById('nama').value.trim();
    const tanggalLahirInput = document.getElementById('tanggalLahir').value;
    const jenisKelaminInput = document.querySelector('input[name="jenisKelamin"]:checked').value;
    const waktuLahirInput = document.querySelector('input[name="waktuLahir"]:checked').value;

    const hasilDiv = document.getElementById('hasil');
    const hasilJudulDiv = document.getElementById('hasilJudul');
    const dataWetonDiv = document.getElementById('dataWeton');
    const analisisDetailDiv = document.getElementById('analisisDetail');
    const errorDiv = document.getElementById('error');

    // Reset tampilan
    hasilDiv.style.display = 'none';
    errorDiv.style.display = 'none';
    hasilJudulDiv.innerHTML = '';
    dataWetonDiv.innerHTML = '';
    analisisDetailDiv.innerHTML = '';

    // Validasi input
    if (!namaInput) {
        errorDiv.textContent = 'Harap masukkan nama Anda.';
        errorDiv.style.display = 'block';
        return;
    }
    if (!tanggalLahirInput) {
        errorDiv.textContent = 'Harap masukkan tanggal lahir Anda.';
        errorDiv.style.display = 'block';
        return;
    }

    // Dapatkan detail weton dengan memperhitungkan waktu lahir
    const dataOrang = getJavaneseDetails(tanggalLahirInput, waktuLahirInput);

    if (!dataOrang || !dataOrang.watakDetail) {
         errorDiv.textContent = 'Terjadi kesalahan saat mengolah data atau data Weton tidak ditemukan. Pastikan tanggal benar dan konfigurasi Weton lengkap.';
         errorDiv.style.display = 'block';
         return;
    }

    // Tampilkan Judul Hasil dengan Nama
    hasilJudulDiv.innerHTML = `Analisis Kepribadian untuk <span class="highlight">${namaInput}</span>`;

    // Tampilkan Data Weton Dasar
    dataWetonDiv.innerHTML = `
        Weton Anda: <strong class="highlight">${dataOrang.weton} (${dataOrang.watakDetail.lakuning || 'Data Lakuning Tidak Ada'})</strong> <br>
        Tanggal Lahir (Masehi): ${new Date(tanggalLahirInput).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} <br>
        Perkiraan Tahun Saka Kelahiran: ${dataOrang.tahunSaka} <br>
        Jenis Kelamin: ${jenisKelaminInput === 'pria' ? 'Pria' : 'Wanita'}
    `;

    // Bangun HTML untuk Analisis Detail
    let analisisHTML = `<h3>Deskripsi Umum Kepribadian (${dataOrang.weton})</h3>`;
    analisisHTML += `<p>${dataOrang.watakDetail.deskripsi_umum || 'Tidak ada deskripsi umum.'}</p>`;

    // Sifat Khas berdasarkan Jenis Kelamin
    const sifatKhasJK = jenisKelaminInput === 'pria' ? dataOrang.watakDetail.pria : dataOrang.watakDetail.wanita;
    if (sifatKhasJK && sifatKhasJK.sifat_khas) {
        analisisHTML += `<h3>Sifat Khas sebagai Seorang ${jenisKelaminInput === 'pria' ? 'Pria' : 'Wanita'}</h3>`;
        analisisHTML += `<p>${sifatKhasJK.sifat_khas}</p>`;
    }

    // Kelebihan
    if (dataOrang.watakDetail.kelebihan && dataOrang.watakDetail.kelebihan.length > 0) {
        analisisHTML += `<h3>Kelebihan Utama:</h3><ul>`;
        dataOrang.watakDetail.kelebihan.forEach(item => {
            analisisHTML += `<li>${item}</li>`;
        });
        analisisHTML += `</ul>`;
    }

    // Kekurangan / Tantangan
    if (dataOrang.watakDetail.kekurangan && dataOrang.watakDetail.kekurangan.length > 0) {
        analisisHTML += `<h3>Potensi Tantangan / Kekurangan:</h3><ul>`;
        dataOrang.watakDetail.kekurangan.forEach(item => {
            analisisHTML += `<li>${item}</li>`;
        });
        analisisHTML += `</ul>`;
    }

    // Potensi Karir
    if (sifatKhasJK && sifatKhasJK.potensi_karir && sifatKhasJK.potensi_karir.length > 0) {
        analisisHTML += `<h3>Potensi Jalur Karir yang Cocok:</h3><ul>`;
        sifatKhasJK.potensi_karir.forEach(item => {
            analisisHTML += `<li>${item}</li>`;
        });
        analisisHTML += `</ul>`;
    }

    // Saran Jodoh Umum
    if (sifatKhasJK && sifatKhasJK.saran_jodoh_umum) {
        analisisHTML += `<h3>Saran Kecocokan Jodoh (Umum):</h3>`;
        analisisHTML += `<p>${sifatKhasJK.saran_jodoh_umum}</p>`;
    }

    // Saran Pengembangan Diri
    if (dataOrang.watakDetail.saran_pengembangan_diri) {
        analisisHTML += `<h3>Saran Pengembangan Diri:</h3>`;
        analisisHTML += `<p>${dataOrang.watakDetail.saran_pengembangan_diri}</p>`;
    }

    // Batu Keberuntungan
    if (dataOrang.watakDetail.batu_keberuntungan) {
        analisisHTML += `<h3>Elemen Pendukung (Contoh: Batu Keberuntungan):</h3>`;
        analisisHTML += `<p>${dataOrang.watakDetail.batu_keberuntungan}</p>`;
    }

    // Warna Aura
     if (dataOrang.watakDetail.warna_aura_dominan) {
        analisisHTML += `<h3>Warna Aura Dominan (Interpretasi Umum):</h3>`;
        analisisHTML += `<p>${dataOrang.watakDetail.warna_aura_dominan}</p>`;
    }

    analisisHTML += `<hr><p><em><strong>Penting:</strong> Analisis ini adalah interpretasi berdasarkan Primbon Jawa dan bersifat sebagai panduan atau wawasan. Kepribadian sejati seseorang adalah unik dan dipengaruhi oleh banyak faktor. Gunakan informasi ini untuk refleksi diri dan pengembangan potensi positif Anda.</em></p>`;

    analisisDetailDiv.innerHTML = analisisHTML;

    // Tampilkan bagian hasil
    hasilDiv.style.display = 'block';
    hasilDiv.scrollIntoView({ behavior: 'smooth' }); // Scroll ke hasil
});