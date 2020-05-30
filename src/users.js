// librairie pour discuter avec mongodb en js
const mongoose = require('mongoose')
// Import du Schéma de livre pour pouvoir impléter un tableau de livres dans le Schéma d'user
const BookSchema = require('./books').schema

//Référencement de la classe Schema de mongoose.
const Schema = mongoose.Schema

//Instantiation d'un schema UserSchema constitué d'un nom obligatoire de type String 
//et d'un tableau de schema de livres
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis']
  },
  books: [BookSchema]
})

//Création d'un model de Book basé sur le Schema précédemment défini.
const User = mongoose.model('user', UserSchema)

//Export du model User pour pouvoir y accéder de l'exterieur.
module.exports = User