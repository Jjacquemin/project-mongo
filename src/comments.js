// librairie pour discuter avec mongodb en js
const mongoose = require('mongoose')

//Référencement de la classe Schema de mongoose.
const Schema = mongoose.Schema

//Instantiation d'un schema CommentSchema constitué d'un contenu obligatoire de type String 
//et d'un id d'utilisateur
const CommentSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Le contenu est requis']
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
})

//Création d'un model de Comment basé sur le Schema précédemment défini.
const Comment = mongoose.model('comment',CommentSchema)

//Export du model Comment pour pouvoir y accéder de l'exterieur.
module.exports = Comment
