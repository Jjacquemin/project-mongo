// librairie pour discuter avec mongodb en js
const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

// Hook before de la campagne de tests mocha
before('Lancement de la connexion',done => {
  // Définition de la connexion à la base MongoDB
  mongoose.connect('mongodb://localhost/books_test',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  // Connexion à la base MongoDB
  mongoose.connection
    .once('open',() => {
      console.log("Bravo ! Connexion établie")
	  done()
	}) // connexion avec succès
    .on('error',error => console.warn('Erreurs : ',error)) // connexion en erreur
})

beforeEach('Supprime la base de données entière', done => {
  mongoose.connection.db.dropDatabase()
    .then( () => {
      done()
    })
})
