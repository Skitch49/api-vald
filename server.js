const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv").config();
const port = 3000;

const app = express();

connectDB();

console.log('MONGO_URI ',process.env.MONGO_URI);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/clip", require("./routes/clip.routes"));

app.use("/artiste", require("./routes/artiste.routes"));

app.use("/video", require("./routes/video.routes"));

app.get("/", (req, res) => {
  res.json({ message: "Voici les clips de vald" });
});

app.listen(port, () => console.log("Le serveur a démarré au port  " + port));
