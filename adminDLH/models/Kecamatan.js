const mongoose = require("mongoose");

// Membuat variabel baru dengan nama kecamatanScheme
const kecamatanScheme = new mongoose.Schema({
  kodeKec: {
    // Membuat type dari field nama yang berada di tabel kecamatan bersifat string
    type: String,
    // maksud dari required adalah ketika data disimpan kedalam database, data tidak boleh kosong
    required: true,
  },
  namaKec: {
    // Membuat type dari field nama yang berada di tabel kecamatan bersifat number
    type: String,
    required: true,
  },
  luasKec: {
    type: Number,
    required: true,
  },

});

// lalu mengekspor model dari mahasiswa, tujuan mengekspor ini supaya model dari mahasiswa ini bisa digunakan dimana saja atau reusable
module.exports = mongoose.model("Kecamatan", kecamatanScheme);