/** Models **/
const User = require("../../models/User")

const getFavoris = async (req, res) => {
  try {
    const userID = req.user._id;

    // Récupérer l'utilisateur complet depuis la DB
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
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
    const {marvelID, type} = req.params;
    const userID = req.user._id;
console.log('Params:', { marvelID, type, userID });
    // Récupérer l'utilisateur complet depuis la DB
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier les doublons (chercher si l'ID existe déjà)
    const favorisExiste = user.favoris.find(favoris => favoris.id_favoris === marvelID);
    
    if (!favorisExiste) {
      // Ajouter le nouveau favori
      user.favoris.push({
        id_favoris: marvelID,
        type_favoris: type
      });
      console.log('User favoris après ajout:', user.favoris);
      await user.save();
      
      // Le favori a été ajouté
      return res.status(201).json({
        favoris: user.favoris,
        owner: user._id,
        message: "Favori ajouté avec succès"
      });
    } else {
      // Le favori existe déjà
      return res.status(200).json({
        favoris: user.favoris,
        owner: user._id,
        message: "Ce favoris existe déjà"
      });
    }


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFavoris = async (req, res) => {
  try {
    const marvelID = req.params.marvelID;
    const userID = req.user._id;
    const user = await User.findById(userID);
console.log(marvelID);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier si le favori existe
    const favorisExiste = user.favoris.find(favoris => favoris.id_favoris === marvelID);
    
    if (!favorisExiste) {
      return res.status(404).json({ message: "Favoris non trouvé" });
    }

    // Supprimer le favori avec filter
    user.favoris = user.favoris.filter(favoris => favoris.id_favoris !== marvelID);
    await user.save();
console.log(user.favoris);

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