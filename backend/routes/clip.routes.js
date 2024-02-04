const express = require("express");
const {
  setClips,
  getClips,
  getClipByUrl,
  getClipsByDateRange,
  editClips,
  deleteClips,
  getLastClip,
} = require("../controllers/clip.controller");
const router = express.Router();

router.get("/", getClips);

router.get("/last-clip", getLastClip);

router.get("/:url", getClipByUrl);

router.post("/", setClips);

router.put("/:id", editClips);

router.delete("/:id", deleteClips);

router.get("/date-range/:startDate/:endDate", getClipsByDateRange);


module.exports = router;
