const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");
const port = 3000;
const job = require("./cron");

const app = express();

connectDB();

console.log("MONGO_URI ", process.env.MONGO_URI);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/clip", require("./routes/clip.routes"));

app.use("/artiste", require("./routes/artiste.routes"));

app.use("/video", require("./routes/video.routes"));

// Configuration du transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/mail", (req, res) => {
  const { firstName, name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: "Veuillez fournir un nom, email, et message." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `👋 Nouveau message de ${firstName} ${name} | VALD FC`,
    text: `${message}\n\n Nom :${firstName} ${name}\n\n Email:${email} `,
  };

  // Envoi de l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erreur:", error.message);
      return res
        .status(500)
        .json({ error: "Erreur lors de l'envoi de l'email." });
    } else {
      console.log("Email envoyé:", info.response);
      res.status(201).json({ success: "Email envoyé avec succès!" });
    }
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Voici les clips de vald" });
});

app.listen(port, () => console.log("Le serveur a démarré au port  " + port));
