const express = require("express");
const {
  getVideos,
  getLastVideo,
  getVideoByUrl,
  setVideo,
  patchVideoLiked,
  getVideosLiked,
  patchVideoDisliked,
  getVideosByCategory,
  editVideo,
  deleteVideos,
  getAllContent,
} = require("../controllers/video.controller");
const router = express.Router();

router.get("/", getVideos);

router.get("/last-video", getLastVideo);

router.get("/all-videos-and-clips", getAllContent);

// router.get("/search/:query", searchClips);

router.get("/:url", getVideoByUrl);

router.post("/", setVideo);

router.put("/:id", editVideo);

router.delete("/:id", deleteVideos);

router.get("/categories/:categorie", getVideosByCategory);
// router.get("/date-range/:startDate/:endDate", getClipsByDateRange);

router.get("/video-liked/:userId", getVideosLiked);

router.patch("/like-video/:id", patchVideoLiked);

router.patch("/dislike-video/:id/", patchVideoDisliked);


module.exports = router;
