const express = require("express");
const router = express.Router();
router.use(express.json());
const isAuthenticated = require("../middlewares/isAuthenticated");
const {createFavoris, deleteFavoris, getFavoris} = require("../controllers/favoris/favoris.js")

/** Models **/
const Favoris = require("../models/Favoris")

// Ajouter un favori
router.post('/favoris/:characterID', isAuthenticated, createFavoris);

// Retirer un favori
router.delete('/favoris/:characterID', isAuthenticated, deleteFavoris);

// Récupérer les favoris
router.get('/favoris', isAuthenticated, getFavoris);

module.exports = router;