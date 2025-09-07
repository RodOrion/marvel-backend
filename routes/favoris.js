const express = require("express");
const router = express.Router();
router.use(express.json());
const isAuthenticated = require("../middlewares/isAuthenticated");
const {createFavoris, deleteFavoris, getFavoris} = require("../controllers/favoris/favoris.js")

/** Models **/
const Favoris = require("../models/Favoris")

// Ajouter un favoris
router.post('/favoris/:type/:marvelID', isAuthenticated, createFavoris);

// Retirer un favoris
router.delete('/favoris/:marvelID', isAuthenticated, deleteFavoris);

// Récupérer les favoris
router.get('/favoris', isAuthenticated, getFavoris);

module.exports = router;