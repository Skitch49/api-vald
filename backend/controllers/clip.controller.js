const clipModel = require("../models/clip.model");

module.exports.getClips = async (req, res) => {
  const clips = await clipModel.find();
  res.status(200).json(clips);
};

module.exports.getClipByUrl = async(req, res) => {
  try {
    const { url } = req.params;
    const clip = await clipModel.findOne({ url });

    if (!clip) {
      return res.status(404).json({ message: "Clip not found" });
    }

    res.status(201).json(clip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.setClips = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.date ||
      !req.body.description ||
      !req.body.url
    ) {
      res.status(400).json({
        message:
          "Merci de fournir toutes les informations nécessaires pour créer un clip.",
      });
    }

    const clip = await clipModel.create({
      name: req.body.name,
      date: req.body.date,
      description: req.body.description,
      url: req.body.url,
      artiste: req.body.artiste,
      featuring: req.body.featuring || [], // Si aucun artiste n'est fourni, utilise un tableau vide
    });

    res.status(201).json({ message: "Clip créé avec succès", clip });
  } catch (error) {
    console.error("Erreur lors de la création du clip :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la création du clip.",
    });
  }
};

module.exports.editClips = async (req, res) => {
  const clip = await clipModel.findById(req.params.id);

  if (!clip) {
    res.status(400).json({ message: "ce clip n'existe pas !" });
  }

  const updateClip = await clipModel.findByIdAndUpdate(clip, req.body, {
    new: true,
  });

  res.status(200).json(updateClip);
};

module.exports.deleteClips = async (req, res) => {
  const clipId = await clipModel.findById(req.params.id);

  if (!clip) {
    res.status(400).json({ message: "ce clip n'existe pas !" });
  }
  await post.deleteOne({ _id: clipId });
  res.status(200).json("Clip supprimé id :" + clipId);
};

module.exports.getClipsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    // Convertissez les dates en objets Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Recherchez les clips dans l'intervalle de dates
    const clips = await clipModel.find({
      date: {
        $gte: start,
        $lte: end,
      },
    });

    res.status(201).json(clips);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des clips par intervalle de dates :",
      error
    );
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des clips par intervalle de dates.",
    });
  }
};

module.exports.getLastClip = async (req, res) => {
  try {
    const lastclip = await clipModel.findOne().sort({ date: -1 }).limit(1);
    res.status(201).json(lastclip);
  } catch (error) {
    console.error("Erreur lors de la récupération du dernier clip :" + error);

    res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération du dernier clip.",
    });
  }
};
