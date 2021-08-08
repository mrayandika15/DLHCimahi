// membuat variable router dengan require atau export variabel express
// Dan menggunakan metode Router
const router = require("express").Router();
// export controller yang ingin dipakai
const sungaiController = require("../controllers/sungaiController");

// endpoint kecamatan
router.get("/", sungaiController.viewSungai); // Untuk view
router.post("/", sungaiController.addSungai); //untuk menambahkan kecamatan
router.put("/", sungaiController.editSungai); // Untuk edit data kecamatan
router.delete("/:id", sungaiController.deleteSungai); // Untuk hapus data kecamatan berdasarkan id

// Lalu export routernya
module.exports = router;