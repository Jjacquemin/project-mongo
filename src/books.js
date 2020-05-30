// librairie pour discuter avec mongodb en js
const mongoose = require('mongoose')

//Référencement de la classe Schema de mongoose.
const Schema = mongoose.Schema

//Instantiation d'un schema BookSchema constitué d'un titre obligatoire de type String 
//et d'un nombre de pages de type numérique avec une valeur par défaut à 0
const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis']
  },
  totalPages: { 
    type: Number,
    default: 0,
    validate: {
       validator: totalPages => totalPages < 3000,
       message: 'Un livre doit avoir moins de 3000 pages'
    }
  }
})

//Création d'un model de Book basé sur le Schema précédemment défini.
const Book = mongoose.model('book',BookSchema)

//Export du model Book pour pouvoir y accéder de l'exterieur.
module.exports = Book
