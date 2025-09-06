/** Models **/
const User = require("../../models/User")

const getFavoris = async (req, res) => {
  try {
    const user = req.user; // L'objet utilisateur est disponible via le middleware
    
    res.status(200).json({
      favoris: user.favoris,
      message: "Favoris de l'utilisateur récupérés avec succès"
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createFavoris = async (req, res) => {
  try {
    const characterID = req.params.characterID;
    const userID = req.user._id;

    // Récupérer l'utilisateur complet depuis la DB
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier les doublons
    if (!user.favoris.includes(characterID)) {
      user.favoris.push(characterID);
      await user.save();
      // Le favori a été ajouté
      return res.status(201).json({
        favoris: user.favoris, // La clé doit être 'favoris'
        owner: user._id,
        message: "Favori ajouté avec succès"
      });
    }

    // Le favori existe déjà, renvoyer une réponse 200 OK
    res.status(200).json({
      favoris: user.favoris, // La clé doit être 'favoris'
      owner: user._id,
      message: "Ce favori existe déjà"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFavoris = async (req, res) => {
  try {
    const characterID = req.params.characterID;
    const userID = req.user._id;

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si le favori existe
    if (!user.favoris.includes(characterID)) {
      return res.status(404).json({ message: "Favoris non trouvé" });
    }

    // Supprimer avec filter
    user.favoris = user.favoris.filter(favorisID => favorisID !== characterID);
    await user.save();

    res.status(200).json({
      favoris: user.favoris,
      owner: user._id,
      message: "Favori supprimé avec succès"
    });
    

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {getFavoris, createFavoris, deleteFavoris}