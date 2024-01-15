const express = require("express");
const {
  setClips,
  getClips,
  editClips,
  deleteClips,
} = require("../controllers/clip.controller");
const router = express.Router();

router.get("/", getClips);

router.post("/", setClips);

router.put("/:id", editClips);

router.delete("/:id", deleteClips);

module.exports = router;
