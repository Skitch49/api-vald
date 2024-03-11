const mongoose = require("mongoose");

const clipSchema = mongoose.Schema(
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
    media: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artiste",
      required: true,
    },
    categorie:{
        type: String,
    },
    fanMade:{
        type: Boolean,
    },
    likers: { type: [String] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clip", clipSchema);
