const express = require("express");
const connectDB = require("./config/db");
const app = express();
const dotenv = require("dotenv").config();
const port = 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/clip", require("./routes/clip.routes"));

app.get("/", (req, res) => {
  res.json({ message: "Voici les clips de vald" });
});

app.listen(port, () => console.log("Le serveur a démarré au port  " + port));
