const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/comics/", async (req, res) => {
  try {
    // Appel à l'API externe
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apiKey}`
    );
    // Retour des données au frontend
    res.json(response.data);
  } catch (error) {
    console.error('Erreur API:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des comics' });
  }
});

router.get("/comics_character/:characterID", async (req, res) => {
  try {
    const characterID = req.params.characterID
    //console.log(characterID);
    
    // Appel à l'API externe
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterID}?apiKey=${apiKey}`
    );
    // Retour des données au frontend
    res.json(response.data);
  } catch (error) {
    console.error('Erreur API:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des comics' });
  }
});

module.exports = router;