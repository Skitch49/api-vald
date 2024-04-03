const express = require("express");
const { getVideos, getLastVideo, getVideoByUrl, setVideo, patchVideoLiked, getVideosLiked, patchVideoDisliked,getVideosByCategory } = require("../controllers/video.controller");
const router = express.Router();

router.get("/", getVideos);

router.get("/last-video", getLastVideo);

// router.get("/search/:query", searchClips);

router.get("/:url", getVideoByUrl);

router.post("/", setVideo);

// router.put("/:id", editClips);

// router.delete("/:id", deleteClips);

router.get("/categories/:categorie",getVideosByCategory)
// router.get("/date-range/:startDate/:endDate", getClipsByDateRange);

router.get("/video-liked/:userId", getVideosLiked);

router.patch("/like-video/:id",patchVideoLiked);

router.patch("/dislike-video/:id/",patchVideoDisliked);



module.exports = router;
