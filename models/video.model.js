const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artiste",
      required:true
    },
    categorie:{
        type: String,
    },
    likers: { type: [String] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", videoSchema);
