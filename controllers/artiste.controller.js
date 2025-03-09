const artisteModel = require("../models/artiste.model");

module.exports.getArtistes = async (req, res) => {
  const artistes = await artisteModel.find();
  res.status(201).json(artistes);
};

module.exports.setArtistes = async (req, res) => {
  try {
    // Ajoutez ici une vérification des champs requis
    const artiste = new artisteModel(req.body);
    await artiste.save();
    res.status(201).json({ message: "Artiste créé avec succès", artiste });
  } catch (error) {
    console.error("Erreur lors de la création de l'artiste :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'artiste" });
  }
};

module.exports.editArtistes = async (req, res) => {
  try {
    const update = req.body;
    const artiste = await artisteModel.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!artiste) {
      res.status(404).json({ message: "Artiste non trouvé" });
    } else {
      res.status(201).json(artiste);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'artiste" });
  }
};

module.exports.deleteArtistes = async (req, res) => {
  try {
    const artiste = await artisteModel.findByIdAndDelete(req.params.id);
    if (!artiste) {
      res.status(404).json({ message: "Artiste non trouvé" });
    } else {
      res.status(201).json({ message: "Artiste supprimé" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'artiste" });
  }
};

module.exports.getArtisteByName = async (req, res) => {
  try {
    const artiste = await artisteModel.findOne({ nameArtiste: req.params.nameArtiste });
    if (!artiste) {
      res.status(404).json({ message: "Artiste non trouvé" });
    } else {
      res.status(201).json(artiste);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
