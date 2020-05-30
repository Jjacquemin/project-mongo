// librairie pour discuter avec mongodb en js
const mongoose = require('mongoose')

// Définition de la connexion à la base MongoDB
mongoose.connect('mongodb://localhost/books_test',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Connexion à la base MongoDB
mongoose.connection
  .once('open',() => console.log("Bravo ! Connexion établie")) // connexion avec succès
  .on('error',error => console.warn('Erreurs : ',error)) // connexion en erreur
