require("dotenv").config();

const express = require("express"); // import du package express
const app = express(); // création du serveur
app.use(express.json()); // req.body

const axios = require("axios"); // client pour les queries

const cors = require("cors");
app.use(cors());

const apiKey = process.env.API_KEY;

/** BDD **/
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

/** routes **/
const userRoutes = require("./routes/user");
app.use(userRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const favorisRoutes = require("./routes/favoris");
app.use(favorisRoutes);

app.get("/", (req, res) => {
  // route en GET dont le chemion est /
  res.json({ message: "Hi welcome on Marvel's API" }); // réponse du serveur : {message : "Hi"}
});

app.all(/.*/, function (req, res) {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port", process.env.PORT || 3000);
});
