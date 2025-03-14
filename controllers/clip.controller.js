const clipModel = require("../models/clip.model");
const artisteModel = require("../models/artiste.model");
const videoModel = require("../models/video.model");

module.exports.getClips = async (req, res) => {
  try {
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

    res.status(201).json(clips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.getClipByUrl = async (req, res) => {
  try {
    const { url } = req.params;
    const clip = await clipModel
      .findOne({ url })
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

    if (!clip) {
      return res.status(404).json({ message: "Clip not found" });
    }

    res.status(201).json(clip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.searchClips = async (req, res) => {
  try {
    const { query } = req.params;
    const keywords = query.split(" ").map((keyword) => {
      const searchQuery = { $regex: keyword, $options: "i" };
      return {
        $or: [
          { name: searchQuery },
          { categorie: searchQuery },
          { description: searchQuery },
          { dateString: searchQuery },
          { "artisteDetails.nameArtiste": searchQuery },
          { "featuringDetails.nameArtiste": searchQuery },
          { "realDetails.nameArtiste": searchQuery },
          { "productionDetails.nameArtiste": searchQuery },
          { "masteringDetails.nameArtiste": searchQuery },
          { "mixDetails.nameArtiste": searchQuery },
          { "producedDetails.nameArtiste": searchQuery },
          { "authorDetails.nameArtiste": searchQuery },
        ],
      };
    });

    const clips = await clipModel.aggregate([
      {
        $addFields: {
          dateString: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        },
      },
      {
        $lookup: {
          from: "artistes",
          localField: "artiste",
          foreignField: "_id",
          as: "artisteDetails",
        },
      },
      {
        $lookup: {
          from: "artistes",
          localField: "featuring",
          foreignField: "_id",
          as: "featuringDetails",
        },
      },
      {
        $lookup: {
          from: "artistes",
          localField: "real",
          foreignField: "_id",
          as: "realDetails",
        },
      },
      {
        $lookup: {
          from: "artistes",
          localField: "production",
          foreignField: "_id",
          as: "productionDetails",
        },
      },
      {
        $lookup: {
          from: "artistes",
          localField: "mastering",
          foreignField: "_id",
          as: "masteringDetails",
        },
      },
      {
        $lookup: {
          from: "artistes",
          localField: "mix",
          foreignField: "_id",
          as: "mixDetails",
        },
      },
      {
        $lookup: {
          from: "artistes",
          localField: "produced",
          foreignField: "_id",
          as: "producedDetails",
        },
      },
      { $match: { $and: keywords } },
      {
        $unwind: { path: "$artisteDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $unwind: {
          path: "$featuringDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $unwind: { path: "$realDetails", preserveNullAndEmptyArrays: true } },
      {
        $unwind: {
          path: "$productionDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$masteringDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $unwind: { path: "$mixDetails", preserveNullAndEmptyArrays: true } },
      {
        $unwind: { path: "$producedDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          date: { $first: "$date" },
          description: { $first: "$description" },
          url: { $first: "$url" },
          categorie: { $first: "$categorie" },
          artiste: { $first: "$artisteDetails.nameArtiste" },
          featuring: { $push: "$featuringDetails.nameArtiste" },
          real: { $first: "$realDetails.nameArtiste" },
          production: { $push: "$productionDetails.nameArtiste" },
          mastering: { $first: "$masteringDetails.nameArtiste" },
          mix: { $first: "$mixDetails.nameArtiste" },
          produced: { $push: "$producedDetails.nameArtiste" },
          likers: { $first: "$likers" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          date: 1,
          description: 1,
          url: 1,
          categorie: 1,
          artiste: 1,
          featuring: 1,
          real: 1,
          production: 1,
          mastering: 1,
          mix: 1,
          produced: 1,
          likers: 1,
        },
      },
    ]);
    const videos = await videoModel.aggregate([
      {
        $addFields: {
          dateString: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
        },
      },
      {
        $lookup: {
          from: "artistes",
          localField: "author",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
      { $match: { $and: keywords } },
      {
        $unwind: { path: "$authorDetails", preserveNullAndEmptyArrays: true },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          date: { $first: "$date" },
          description: { $first: "$description" },
          url: { $first: "$url" },
          author: { $first: "$authorDetails.nameArtiste" },
          categorie: { $first: "$categorie" },
          likers: { $first: "$likers" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          date: 1,
          description: 1,
          url: 1,
          author: 1,
          categorie: 1,
          likers: 1,
        },
      },
    ]);
    const allMedia = [...clips, ...videos]; // Combine clips and videos

    res.status(201).json(allMedia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error: "+error });
  }
};

module.exports.setClips = async (req, res) => {
  try {
    const {
      name,
      date,
      description,
      url,
      categorie,
      produced,
      mix,
      mastering,
      production,
      real,
      artiste,
      featuring,
    } = req.body;

    if (!name || !date || !description || !url || !categorie || !artiste) {
      return res.status(400).json({
        message:
          "Merci de fournir toutes les informations nécessaires pour créer un clip.",
      });
    }

    const clip = await clipModel.create({
      name,
      date,
      description,
      url,
      categorie,
      artiste,
    });

    // Ajouter les champs optionnels uniquement s'ils contiennent des valeurs
    if (Array.isArray(produced) && produced.length > 0) {
      clip.produced = produced;
    }
    if (Array.isArray(mix) && mix.length > 0) {
      clip.mix = mix;
    }
    if (mastering) {
      clip.mastering = mastering;
    }
    if (Array.isArray(production) && production.length > 0) {
      clip.production = production;
    }
    if (real) {
      clip.real = real;
    }
    if (Array.isArray(featuring) && featuring.length > 0) {
      clip.featuring = featuring;
    }

    res.status(201).json({ message: "Clip créé avec succès", clip });
  } catch (error) {
    console.error("Erreur lors de la création du clip :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la création du clip. ",error
    });
  }
};

module.exports.editClips = async (req, res) => {
  try {
    const {
      name,
      date,
      description,
      url,
      categorie,
      produced,
      mix,
      mastering,
      production,
      real,
      artiste,
      featuring,
    } = req.body;

    if (!name || !date || !description || !url || !categorie || !artiste) {
      return res.status(400).json({
        message:
          "Merci de fournir toutes les informations nécessaires pour mettre à jour le clip.",
      });
    }

    const clip = await clipModel.findById(req.params.id);
    if (!clip) {
      return res.status(400).json({ message: "Ce clip n'existe pas !" });
    }

    const updateData = {
      name,
      date,
      description,
      url,
      categorie,
      artiste,
    };

    if (Array.isArray(produced) && produced.length > 0) {
      updateData.produced = produced;
    }
    if (Array.isArray(mix) && mix.length > 0) {
      updateData.mix = mix;
    }
    if (mastering) {
      updateData.mastering = mastering;
    }
    if (Array.isArray(production) && production.length > 0) {
      updateData.production = production;
    }
    if (real) {
      updateData.real = real;
    }
    if (Array.isArray(featuring) && featuring.length > 0) {
      updateData.featuring = featuring;
    }

    console.log("Données pour la mise à jour :", updateData);

    // Mettre à jour le clip
    const updatedClip = await clipModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedClip) {
      return res.status(500).json({ message: "Erreur lors de la mise à jour du clip." });
    }

    res.status(200).json({ message: "Clip mis à jour avec succès", updatedClip });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du clip :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour du clip.",
      error,
    });
  }
};


module.exports.deleteClips = async (req, res) => {
  try {
    const clip = await clipModel.findById(req.params.id);

    if (!clip) {
      return res.status(400).json({ message: "Ce clip n'existe pas !" });
    }
    await clipModel.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "Clip supprimé id :" + req.params.id });
  } catch (error) {
    console.error("Erreur lors de la suppression du clip :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression du clip.",
    });
  }
};

module.exports.getClipsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const clips = await clipModel
      .find({
        date: {
          $gte: start,
          $lte: end,
        },
      })
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

    res.status(201).json(clips);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des clips par intervalle de dates.",
    });
  }
};

module.exports.getLastClip = async (req, res) => {
  try {
    const lastclip = await clipModel
      .findOne()
      .sort({ date: -1 })
      .limit(1)
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

    res.status(201).json(lastclip);
  } catch (error) {
    console.error("Erreur lors de la récupération du dernier clip :" + error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération du dernier clip.",
    });
  }
};

module.exports.patchClipLiked = async (req, res) => {
  try {
    await clipModel
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

module.exports.patchClipDisliked = async (req, res) => {
  try {
    await clipModel
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

module.exports.getClipsLiked = async (req, res) => {
  try {
    const { userId } = req.params;
    const clipsLiked = await clipModel
      .find({ likers: userId })
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

    if (!clipsLiked.length) {
      return res.status(201).json();
    }

    res.status(201).json(clipsLiked);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" + error.message });
  }
};

module.exports.getAllVideosLiked = async (req, res) => {
  try {
    const { userId } = req.params;
    const videosLiked = await videoModel.find({ likers: userId }).populate({
      path: "author",
      model: artisteModel,
      select: "nameArtiste socialMedia", 
    });

    const clipsLiked = await clipModel
      .find({ likers: userId })
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

    const AllVideosLiked = [...clipsLiked, ...videosLiked];

    res.status(201).json(AllVideosLiked);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" + error.message });
  }
};

module.exports.getAllVideosByCategory = async (req, res) => {
  try {
    const { categorie } = req.params;

    const clips = await clipModel
      .find({ categorie })
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

    const videos = await videoModel.find({ categorie }).populate({
      path: "author",
      model: artisteModel,
      select: "nameArtiste socialMedia",
    });

    const AllVideosByCat = [...clips, ...videos];

    res.status(201).json(AllVideosByCat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
