const mongoose = require("mongoose");

const artisteSchema = mongoose.Schema({
  nameArtiste: {
    type: String,
    required: true,
  },
  socialMedia: {
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    snap: {
      type: String,
    },
    tiktok: {
      type: String,
    },
    facebook: {
      type: String,
    },
    youtube: {
      type: String,
    },
    twitch: {
      type: String,
    },
  },
});

module.exports = mongoose.model("artiste", artisteSchema);
