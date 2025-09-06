const mongoose = require("mongoose");

const Favoris = mongoose.model("Favoris", {
  id: String,
  type:String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favoris;