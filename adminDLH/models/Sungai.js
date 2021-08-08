const mongoose = require("mongoose");

// Membuat variabel baru dengan nama kecamatanScheme
const sungaiScheme = new mongoose.Schema({
  kodeSungai: {
    // Membuat type dari field nama yang berada di tabel kecamatan bersifat string
    type: String,
    // maksud dari required adalah ketika data disimpan kedalam database, data tidak boleh kosong
    required: true,
  },
  namaSungai: {
    // Membuat type dari field nama yang berada di tabel kecamatan bersifat number
    type: String,
    required: true,
  },
  wilSungai: {
    type: String,
    required: true
  },

});

// lalu mengekspor model dari mahasiswa, tujuan mengekspor ini supaya model dari mahasiswa ini bisa digunakan dimana saja atau reusable
module.exports = mongoose.model("Sungai", sungaiScheme);