const axios = require("axios"); // client pour les queries
const apiKey = process.env.API_KEY;

const readComics = async (req, res) => {
  try {
    // Récupération des query params avec des valeurs par défaut
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const title = req.query.title || "";   
    // Calcul du skip basé sur la page
    const skip = (page - 1) * limit;

    console.log(`Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

    /** Construction de l'url */
    let urlAPI = `https://lereacteur-marvel-api.herokuapp.com/comics?&apiKey=${apiKey}&limit=${limit}&skip=${skip}`
    if(title) {
      urlAPI += "&title="+title
    }
    // Appel à l'API externe
    const response = await axios.get(urlAPI);
    // Retour des données au frontend
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
    res.status(500).json({ error: 'Erreur lors de la récupération des comics' });
  }
}

const getComic = async (req, res) => {
    try {
        const comicID = req.params.comicId;        
        // Appel à l'API
        const responseComic = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comic/${comicID}?apiKey=${apiKey}`);
        console.log(responseComic.data);
        return res.status(200).json(responseComic.data)

    } catch (error) {
        console.log("error API :", error.message);
        return res.status(500).json({ error: 'Erreur lors de la récupération du character', message:error.message })
    }
}

module.exports = {readComics, getComic}