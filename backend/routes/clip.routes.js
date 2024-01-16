const express = require("express");
const {
  setClips,
  getClips,
  getClipsByDateRange,
  editClips,
  deleteClips,
} = require("../controllers/clip.controller");
const router = express.Router();

router.get("/", getClips);

router.post("/", setClips);

router.put("/:id", editClips);

router.delete("/:id", deleteClips);

router.get("/date-range/:startDate/:endDate", getClipsByDateRange);


module.exports = router;
