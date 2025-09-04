const express = require("express");
const router = express.Router();
router.use(express.json());
const fileUpload = require("express-fileupload");
const uid = require("uid2"); // chaine de caractères aléatoire
const SHA256 = require("crypto-js/sha256"); // servira pour l'encryptage
const encodeB64 = require("crypto-js/enc-base64"); // servira pour l'encodage en base 64 (imprimable)

/** models **/
const User = require("../models/User");

// import de cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** lib */
const convertToBase64 = require("../utils/convertToBase64");

/*** API ***/
router.post("/user/signup", fileUpload(), async (req, res) => {
  try {
    const { username, email, password, newsletter } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        message: "Veuillez renseigner un username, un email et un password",
      });
    }

    //Test si email renseigné existe déjà dans la base de données
      const verifMail = await User.findOne({ email });
      if (verifMail) {
        return res.status(400).json({
          message: "Email déjà utilisé",
        });
      }

      /** encodage password */
      const salt = uid(16);
      const saltedPass = password + salt;
      const saltedPassCrypted = SHA256(saltedPass);
      const hash = encodeB64.stringify(saltedPassCrypted);
      // const hash = SHA256(saltedPass).toString(encodeB64)
      const token = uid(16);


  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
