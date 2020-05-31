// librairie pour discuter avec mongodb en js
const mongoose = require('mongoose')

//Référencement de la classe Schema de mongoose.
const Schema = mongoose.Schema

//Instantiation d'un schema BlogBooksSchema (on n'a pas modifié le schéma Books pour éviter de revoir tous les tests) 
//constitué d'un titre obligatoire de type String 
//d'un résumé de type String
//d'un tableau d'ID de commentaires
const blogBooksSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis']
  },
  summary: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment'
  }]
})

//Création d'un model de BlogBook basé sur le Schema précédemment défini.
const BlogBook = mongoose.model('blogBook',blogBooksSchema)

//Export du model BlogBook pour pouvoir y accéder de l'exterieur.
module.exports = BlogBook
