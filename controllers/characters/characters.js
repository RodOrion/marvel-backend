const axios = require("axios"); // client pour les queries

const apiKey = process.env.API_KEY;

const readCharacters = async (req, res) => {
  try {
    // Récupération des query params avec des valeurs par défaut
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const name = req.query.name || "";   
    // Calcul du skip basé sur la page
    const skip = (page - 1) * limit;

    //console.log(`Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

    /** Construction de l'url */
    let urlAPI = `https://lereacteur-marvel-api.herokuapp.com/characters?&apiKey=${apiKey}&limit=${limit}&skip=${skip}`
    if(name) {
      urlAPI += "&name="+name
    }
    //console.log('URL API:', urlAPI);

    // Appel à l'API
    const response = await axios.get(urlAPI);

//console.log(`Total count: ${response.data.count}`);

    // Retour des données au frontend
    return res.status(200).json({
      ...response.data, // destructuration de la copie de l'objet data + pagination
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
    res.status(500).json({ error: 'Erreur lors de la récupération des characters', message:error.message });
  }
}

const getCharacters = async(req, res) => {
  try {
    const name = req.query.name || "";

    // Appel à l'API
    const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?&apiKey=${apiKey}&limit=10&name=${name}`);
    // Tableau des noms
    const characterName = response.data.results.map( (character) => {
        return {name:character.name, id:character._id}
    })
    //console.log(characterName)
    return res.status(200).json(characterName)

  } catch (error) {
    console.log("error API :", error.message);
    return res.status(500).json({ error: 'Erreur lors de la récupération des characters', message:error.message })
  }
}

const getCharacter = async (req, res) => {
    try {
        const characterID = req.params.characterId;        
        // Appel à l'API
        const responseCharacter = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/character/${characterID}?apiKey=${apiKey}`);
        //console.log(responseCharacter.data);
        const responseComics = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${characterID}?apiKey=${apiKey}`);
        //console.log(responseComics.data);

        return res.status(200).json({
            dataCharacter: responseCharacter.data,
            dataComics: responseComics.data.comics
        })

    } catch (error) {
        console.log("error API :", error.message);
        return res.status(500).json({ error: 'Erreur lors de la récupération du character', message:error.message })
    }
}
module.exports = {readCharacters, getCharacters, getCharacter}