const express = require("express");
const { getArtistes, setArtistes, editArtistes, deleteArtistes, getArtisteByName } = require("../controllers/artiste.controller");


const router = express.Router();

router.get("/", getArtistes);
router.post("/", setArtistes);
router.put("/:id", editArtistes);
router.delete("/:id", deleteArtistes);
router.get("/:name", getArtisteByName);

module.exports = router;
