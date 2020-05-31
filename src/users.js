// librairie pour discuter avec mongodb en js
const mongoose = require('mongoose')
// Import du Schéma de livre pour pouvoir impléter un tableau de livres dans le Schéma d'user
const BookSchema = require('./books').schema
const BlogBook = require('../src/blogBooks');

//Référencement de la classe Schema de mongoose.
const Schema = mongoose.Schema

//Instantiation d'un schema UserSchema constitué d'un nom obligatoire de type String 
//et d'un tableau de schema de livres
// et d'un tableau d'Id de blogBook
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis']
  },
  books: [BookSchema],
  blogBooks: [{
    type: Schema.Types.ObjectId, 
    ref: 'blogBook'
  }]
})

//Ajout colonne virtuelle pour nombre de livres dans l'attribut books, 
//on n'utilise pas de fonction fléchée à cause du this
UserSchema.virtual('countBooks').get(function() {
  return this.books.length
})

//Ajout d'un middleware pre-deleteOne car on veut supprimer tout les livres référencés dans le tableau d'Id avant de supprimer le user
//Pas de fonction fléchée à cause du this
UserSchema.pre('remove', function(next) {
  // Supprime les BlogBook dont l'ID est DANS this.blogBooks ( les blogBooks de l'utilisateur )
  BlogBook.deleteMany({ _id: { $in: this.blogBooks } })
    .then(() => {
      next()
    })  
})

//Création d'un model de User basé sur le Schema précédemment défini.
const User = mongoose.model('user', UserSchema)

//Export du model User pour pouvoir y accéder de l'exterieur.
module.exports = User