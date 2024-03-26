const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('./Utilisateur');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, login, password } = req.body;
    const existingUser = await Utilisateur.findOne({ $or: [{ email }, { login }] });
    const hashedPassword = await bcrypt.hash(password, 12);
    const utilisateur = new Utilisateur({ email, login, password: hashedPassword });
    await utilisateur.save();

    res.status(201).send('utilsateur ajouter');
  } catch (error) {
    res.status(500).send('Erreur de cration');
  }
});

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const utilisateur = await Utilisateur.findOne({ login });

    if (!utilisateur || !await bcrypt.compare(password, utilisateur.password)) {
      return res.status(400).send('Login ou mot de passe incorrect');
    }

    const token = jwt.sign({ id: utilisateur._id },TOKEN_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).send('Erreur de connexion');
  }
});

module.exports = router;
