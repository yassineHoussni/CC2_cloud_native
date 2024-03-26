const mongoose = require('mongoose');

const EvenementSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  lieu: { type: String, required: true },
  categorie: { type: String, required: true }
});

const Evenement = mongoose.model('Evenement', EvenementSchema);

module.exports = Evenement;
