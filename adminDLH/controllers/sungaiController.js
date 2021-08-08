// Membuat variabel Sungai dan mengimport/required dari model Sungai
const Sungai = require("../models/Sungai");

// Dibawah ini kita menggunakan metod export, maka semua metod yang ada di dalam object(module.exports) akan ter-export
module.exports = {
  // Membuat view untuk sungai
  viewSungai: async (req, res) => {
    try {
      // Membuat variabel sungai, dan menunda eksekusi hingga proses async selesai lalu mengambil model Sungai
      // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database Sungai
      const sungai = await Sungai.find();
      // Membuat variabel untuk alertMessage dan alertStatus
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      // membuat variabel yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variabel alertMessage dan alertStatus
      const alert = { message: alertMessage, status: alertStatus };
      /**
       * Lalu render viewnya yang ada di dalam file index
       * menampilkan datanya dan mendestracturkan nya, lalu memanggil variabel sungai diatas
       * Lalu merender alert yang sudah di deklar di atas
       */
      res.render("indeks", {
        sungai,
        alert,
        title: "Data Sungai", // Untuk title dari aplikasi kita, saya manamakannya dengan Data Sungai
      });
    } catch (error) {
      // Jika error maka akan meredirect ke route sungai(routenya akan kita buat setelah selesai dengan sungaiController)
      res.redirect("/sungai");
    }
  },

 // Membuat create data untuk sungai
  // Membuat fungsi untuk menambahkan data di form dan menggunakan async await
  addSungai: async (req, res) => {
    // memberi validasi untuk inputan yang kosong
    try {
      // Membuat contanta untuk yang diambil dari body/yang diketikan di form
      const { kodeSungai, namaSungai, wilSungai } = req.body;
      // lalu mengembalikan fungsi dan membuat data dari scheme/model Kecamatan
      await Sungai.create({ kodeSungai, namaSungai, wilSungai });
      // ketika create data berhasil memberikan notifikasi
      req.flash("alertMessage", "Success add data Sungai");
      req.flash("alertStatus", "success");
      res.redirect("/sungai"); // Setelah berhasil membuat data akan meredirect ke tujuan yang sudah ditentukan
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong, maka redirect kehalaman
      res.redirect("/sungai");
    }
  },

  // Membuat update data untuk kecamatan
  editSungai: async (req, res) => {
    try {
      // Membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang di inputkan di form input
      const { id, kodeSungai, namaSungai, wilSungai } = req.body;
      /*  mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim
   _id didapat database dan id isinya dari inputan user */
      const sungai = await Sungai.findOne({ _id: id });
      /* mahasiswa diambil dari fungsi diatas dan titik(.) nama diambil dari database = nama yang didapat dari req body
   yang tentu dikirimkan dari inputan user */
      sungai.kodeSungai = kodeSungai;
      sungai.namaSungai = namaSungai;
      sungai.wilSungai = wilSungai;
      // Menyimpan datanya ke database
      await sungai.save();
      // ketika edit data berhasill memberikan notifikasi/alert
      req.flash("alertMessage", "Success edit data sungai");
      req.flash("alertStatus", "success");
      // Setelah berhasil maka meredirect ke tujuan yang ditentukan (/mahasiswa)
      res.redirect("/sungai");
    } catch (error) {
      // ketika edit data error memberikan notifikasi erronya
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputan kosong maka redirect kehalaman (/sungai)
      res.redirect("/sungai");
    }
  },

  // Membuat delete data untuk kecamatan
  deleteSungai: async (req, res) => {
    try {
      /*
  Membuat variabel yang menerima id yang didapat dari params
  id didapat database dan id isinya dari params
  */
      const { id } = req.params;
      // cek data Sungai yang mau di delete berdasarkan id
      const sungai = await Sungai.findOne({ _id: id });
      // setelah datanya sudah didapat maka menghapusnya
      await sungai.remove();
      // ketika delete data memberikan notifikasi
      req.flash("alertMessage", "Success delete data sungai");
      req.flash("alertStatus", "warning");
      // setelah berhasil remove maka melakukan redirect
      res.redirect("/sungai");
    } catch (error) {
      // ketika create data error memberikan notifikasi
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      // ketika inputa kosong redirect kehalaman
      res.redirect("/sungai");
    }
  },
};