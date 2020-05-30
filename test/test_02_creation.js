const assert = require('assert')
const Book = require('../src/books')

describe('Création de livre', () => {
  it('Vérification de la sauvegarde en base sans totalPages',done => {
    const book1 = new Book({ title: "Harry Potter and the Philosopher\'s Stone" })
    book1.save()
      .then(() => {
        assert(!book1.isNew)
        done()
      })
  })
  it('Vérification de la sauvegarde en base avec totalPages',done => {
    const book1 = new Book({
      title: "Harry Potter and the Philosopher\'s Stone",
      totalPages: 450
    })
    book1.save()
      .then(() => {
        assert(!book1.isNew)
        done()
      })
  })
})
