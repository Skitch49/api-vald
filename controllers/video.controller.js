const videoModel = require("../models/video.model");
const artisteModel = require("../models/artiste.model");
const clipModel = require("../models/clip.model");
module.exports.getVideos = async (req, res) => {
  try {
    const videos = await videoModel.find().populate({
      path: "author",
      model: artisteModel,
      select: "nameArtiste socialMedia",
    });

    res.status(201).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getVideoByUrl = async (req, res) => {
  try {
    const { url } = req.params;
    const video = await videoModel.findOne({ url }).populate({
      path: "author",
      model: artisteModel,
      select: "nameArtiste socialMedia",
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(201).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.setVideo = async (req, res) => {
  try {
    const { name, date, description, url, author, categorie } = req.body;

    if (!name || !date || !description || !url || !author) {
      return res.status(400).json({
        message:
          "Merci de fournir toutes les informations nécessaires pour créer un clip.",
      });
    }

    const video = await videoModel.create({
      name,
      date,
      description,
      url,
      author,
      categorie,
    });

    res.status(201).json({ message: "Vidéo créé avec succès", video });
  } catch (error) {
    console.error("Erreur lors de la création de la video :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de la vidéo.",
    });
  }
};

module.exports.getVideosByCategory = async (req, res) => {
  try {
    const { categorie } = req.params;

    const videos = await videoModel.find({ categorie }).populate({
      path: "author",
      model: artisteModel,
      select: "nameArtiste socialMedia",
    });

    res.status(201).json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.editVideo = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.id);

    if (!video) {
      return res.status(400).json({ message: "Cette video n'existe pas !" });
    }

    const updatedVideo = await videoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(201).json(updatedVideo);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la video :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour de la video.",
    });
  }
};

module.exports.deleteVideos = async (req, res) => {
  try {
    const video = await videoModel.findById(req.params.id);

    if (!video) {
      return res.status(400).json({ message: "Cette vidéo n'existe pas !" });
    }
    await videoModel.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "Vidéo supprimé id :" + req.params.id });
  } catch (error) {
    console.error("Erreur lors de la suppression de la vidéo :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression de la vidéo.",
    });
  }
};

// module.exports.getClipsByDateRange = async (req, res) => {
//   try {
//     const { startDate, endDate } = req.params;
//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     const clips = await clipModel
//       .find({
//         date: {
//           $gte: start,
//           $lte: end,
//         },
//       })
//       .populate({
//         path: "produced",
//         model: artisteModel,
//         select: "nameArtiste socialMedia",
//       })
//       .populate({
//         path: "mix",
//         model: artisteModel,
//         select: "nameArtiste socialMedia",
//       })
//       .populate({
//         path: "mastering",
//         model: artisteModel,
//         select: "nameArtiste socialMedia",
//       })
//       .populate({
//         path: "production",
//         model: artisteModel,
//         select: "nameArtiste socialMedia",
//       })
//       .populate({
//         path: "real",
//         model: artisteModel,
//         select: "nameArtiste socialMedia",
//       })
//       .populate({
//         path: "artiste",
//         model: artisteModel,
//         select: "nameArtiste socialMedia",
//       })
//       .populate({
//         path: "featuring",
//         model: artisteModel,
//         select: "nameArtiste socialMedia",
//       });

//     res.status(201).json(clips);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message:
//         "Une erreur est survenue lors de la récupération des clips par intervalle de dates.",
//     });
//   }
// };

module.exports.getLastVideo = async (req, res) => {
  try {
    const lastvideo = await videoModel
      .findOne()
      .sort({ date: -1 })
      .limit(1)
      .populate({
        path: "author",
        model: artisteModel,
        select: "nameArtiste socialMedia",
      });

    res.status(201).json(lastvideo);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la derniere vidéo :" + error
    );
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération de la derniere vidéo.",
    });
  }
};

module.exports.patchVideoLiked = async (req, res) => {
  try {
    await videoModel
      .findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likers: req.body.userId } },
        { new: true }
      )
      .then((data) => res.status(201).send(data));
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.patchVideoDisliked = async (req, res) => {
  try {
    await videoModel
      .findByIdAndUpdate(
        req.params.id,
        { $pull: { likers: req.body.userId } },
        { new: true }
      )
      .then((data) => res.status(201).send(data));
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getVideosLiked = async (req, res) => {
  try {
    const { userId } = req.params;
    const videosLiked = await videoModel.find({ likers: userId }).populate({
      path: "author",
      model: artisteModel,
      select: "nameArtiste socialMedia",
    });

    if (!videosLiked.length) {
      return res.status(201).json();
    }

    res.status(201).json(videosLiked);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error in getVideosLiked" + error.message,
    });
  }
};

module.exports.getAllContent = async (req, res) => {
  try {
    const videos = await videoModel.find().populate({
      path: "author",
      model: artisteModel,
      select: "nameArtiste socialMedia",
    });

    const clips = await clipModel
      .find()
      .populate({
        path: "produced",
        model: artisteModel,
        select: "nameArtiste socialMedia",
      })
      .populate({
        path: "mix",
        model: artisteModel,
        select: "nameArtiste socialMedia",
      })
      .populate({
        path: "mastering",
        model: artisteModel,
        select: "nameArtiste socialMedia",
      })
      .populate({
        path: "production",
        model: artisteModel,
        select: "nameArtiste socialMedia",
      })
      .populate({
        path: "real",
        model: artisteModel,
        select: "nameArtiste socialMedia",
      })
      .populate({
        path: "artiste",
        model: artisteModel,
        select: "nameArtiste socialMedia",
      })
      .populate({
        path: "featuring",
        model: artisteModel,
        select: "nameArtiste socialMedia",
      });

    if (videos && clips) {
      const result = [...videos, ...clips];
      res.status(201).json(result);
    } else {
      console.error("Aucun clip ou aucune video trouvé");
      res.status(500).json({
        message: "Aucun clip ou aucune video trouvé ",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error in getAllContent" + error.message,
    });
  }
};
