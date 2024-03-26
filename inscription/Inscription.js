const mongoose = require('mongoose');

const inscriptionSchema = new mongoose.Schema({
  utilisateur_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
  evenement_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Evenement', required: true }
});
const Inscription = mongoose.model('Inscription', inscriptionSchema);

module.exports = Inscription;