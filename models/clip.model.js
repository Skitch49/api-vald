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
    produced: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "artiste" }],
    },
    mix: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "artiste" }],
    },
    mastering: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artiste",
    },
    production: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "artiste" }],
    },
    real: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artiste",
    },
    artiste: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "artiste",
      required: true,
    },
    featuring: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "artiste" }],
    },
    likers: { type: [String] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Clip", clipSchema);
