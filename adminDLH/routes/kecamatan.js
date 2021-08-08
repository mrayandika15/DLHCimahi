// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const kecamatanController = require("../controllers/kecamatanController");

// endpoint kecamatan
router.get("/", kecamatanController.viewKecamatan); // Untuk view
router.post("/", kecamatanController.addKecamatan); //untuk menambahkan kecamatan
router.put("/", kecamatanController.editKecamatan); // Untuk edit data kecamatan
router.delete("/:id", kecamatanController.deleteKecamatan); // Untuk hapus data kecamatan berdasarkan id

// Lalu export routernya
module.exports = router;