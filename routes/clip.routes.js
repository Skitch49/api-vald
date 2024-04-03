const express = require("express");
const {
  setClips,
  getClips,
  getClipByUrl,
  getClipsByDateRange,
  editClips,
  deleteClips,
  getLastClip,
  searchClips,
  getClipsLiked,
  patchClipLiked,
  patchClipDisliked,
  getAllVideosLiked,
  getAllVideosByCategory,
} = require("../controllers/clip.controller");

const router = express.Router();

router.get("/", getClips);

router.get("/last-clip", getLastClip);

router.get("/search/:query", searchClips);

router.get("/:url", getClipByUrl);

router.post("/", setClips);

router.put("/:id", editClips);

router.delete("/:id", deleteClips);

router.get("/date-range/:startDate/:endDate", getClipsByDateRange);

router.get("/clip-liked/:userId", getClipsLiked);

router.patch("/like-clip/:id", patchClipLiked);

router.patch("/dislike-clip/:id/", patchClipDisliked);

router.get("/all-video-liked/:userId", getAllVideosLiked);

router.get("/categories/:categorie", getAllVideosByCategory);

module.exports = router;
