const express = require("express");
const router = express.Router();
router.use(express.json());

const axios = require("axios"); // client pour les queries

const apiKey = process.env.API_KEY;

router.get("/characters", async (req, res) => {
  try {
    // Récupération des query params avec des valeurs par défaut
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const name = req.query.name || "";   
    // Calcul du skip basé sur la page
    const skip = (page - 1) * limit;

    console.log(`Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

    /** Construction de l'url */
    let urlAPI = `https://lereacteur-marvel-api.herokuapp.com/characters?&apiKey=${apiKey}&limit=${limit}&skip=${skip}`
    if(name) {
      urlAPI += "&name="+name
    }

    console.log('URL API:', urlAPI);

    // Appel à l'API externe
    const response = await axios.get(urlAPI);

console.log(`Total count: ${response.data.count}`);

    // Retour des données au frontend
    res.json({
      ...response.data,
      pagination: {
        currentPage: page,
        limit: limit,
        totalPages: Math.ceil(response.data.count / limit),
        hasNextPage: skip + limit < response.data.count,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Erreur API:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des comics', message:error.message });
  }
});

module.exports = router;