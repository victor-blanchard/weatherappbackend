var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

//inscription

router.post("/signup", (req, res) => {
  //vérifie que les infos name mail et password sont bien renseignés
  if (!checkBody(req.body, ["name", "email", "password"])) {
    //réponse error si ce n'est pas le cas
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  // si on entre pas dans le if alors on va pouvoir vérifier si l'email n'est aps déja inscrit
  User.findOne({
    email: req.body.email,
  }).then((data) => {
    if (data == null) {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      newUser.save().then(() => {
        res.json({ result: true });
        console.log("user created succesfully");
      });
    } else {
      res.json({ result: false, error: "User already exists" });
      return;
    }
  });
});

//connexion

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    //réponse error si ce n'est pas le cas
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  //si on entre pas dans le if alors on peut vérifier le mot de passe et l'email
  User.findOne({ email: req.body.email, password: req.body.password }).then((data) => {
    if (data) {
      res.json({ result: true });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

module.exports = router;
