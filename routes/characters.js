const express = require("express");
const router = express.Router();
router.use(express.json());
const { readCharacters, getCharacters, getCharacter } = require( "../controllers/characters/characters.js");

// All characters with query params
router.get("/characters", readCharacters);
/// Autocomplétion
router.get("/characters/completion", getCharacters);
/// Character only
router.get("/character/:characterId", getCharacter)

module.exports = router;