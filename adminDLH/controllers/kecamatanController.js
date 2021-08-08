// Membuat variabel Kecamatan dan mengimport/required dari model Kecamatan
const Kecamatan = require("../models/Kecamatan");

// Dibawah ini kita menggunakan metod export, maka semua metod yang ada di dalam object(module.exports) akan ter-export
module.exports = {
  // Membuat view untuk kecamatan
  viewKecamatan: async (req, res) => {
    try {
      // Membuat variabel kecamatan, dan menunda eksekusi hingga proses async selesai lalu mengambil model Kecamatan
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database Kecamatan
      const kecamatan = await Kecamatan.find();
      // Membuat variabel untuk alertMessage dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel mahasiswa diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("index", {
        kecamatan,
        alert,
        title: "Data Kecamatan", // Untuk title dari aplikasi kita, saya manamakannya dengan Data Kecamatan
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route kecamatan(routenya akan kita buat setelah selesai dengan kecamatanController)
      res.redirect("/kecamatan");
    }
  },

 // Membuat create data untuk kecamatan
  // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
  addKecamatan: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      // Membuat contanta untuk yang diambil dari body/yang diketikan di form
      const { namaKec, kodeKec, luasKec } = req.body;
      // lalu mengembalikan fungsi dan membuat data dari scheme/model Kecamatan
      await Kecamatan.create({ namaKec, kodeKec, luasKec });
      // ketika create data berhasil memberikan notifikasi
      req.flash("alertMessage", "Success add data Kecamatan");
      req.flash("alertStatus", "success");
      res.redirect("/kecamatan"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong, maka redirect kehalaman
      res.redirect("/kecamatan");
    }
  },

  // Membuat update data untuk kecamatan
  editKecamatan: async (req, res) => {
    try {
      // Membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang di inputkan di form input
      const { id, namaKec, kodeKec, luasKec } = req.body;
      /*  mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim
   _id didapat database dan id isinya dari inputan user */
      const kecamatan = await Kecamatan.findOne({ _id: id });
      /* mahasiswa diambil dari fungsi diatas dan titik(.) nama diambil dari database = nama yang didapat dari req body
   yang tentu dikirimkan dari inputan user */
      kecamatan.namaKec = namaKec;
      kecamatan.kodeKec = kodeKec;
      kecamatan.luasKec = luasKec;
      // Menyimpan datanya ke database
      await kecamatan.save();
      // ketika edit data berhasill memberikan notifikasi/alert
      req.flash("alertMessage", "Success edit data kecamatan");
      req.flash("alertStatus", "success");
      // Setelah berhasil maka meredirect ke tujuan yang ditentukan (/mahasiswa)
      res.redirect("/kecamatan");
    } catch (error) {
      // ketika edit data error memberikan notifikasi erronya
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong maka redirect kehalaman (/kecamatan)
      res.redirect("/kecamatan");
    }
  },

  // Membuat delete data untuk kecamatan
  deleteKecamatan: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { id } = req.params;
      // cek data Kecamatan yang mau di delete berdasarkan id
      const kecamatan = await Kecamatan.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await kecamatan.remove();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete data kecamatan");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/kecamatan");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/kecamatan");
    }
  },
};