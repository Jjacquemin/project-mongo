const assert = require('assert')
const Book = require('../src/books')

describe('Création de livre', () => {
  it('Vérification de la sauvegarde en base',done => {
    const book1 = new Book({title:"Harry Potter and the Philosopher\'s Stone"})
    book1.save()
      .then(() => {
        assert(!book1.isNew)
        done()
      })
  })
})
