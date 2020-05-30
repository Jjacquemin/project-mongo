const assert = require('assert')
const Book = require('../src/books')

describe('Recherche de livre', () => {
  let book1
  let book2
  let book3
  let book4
  let book5
  let book6
  let book7

  beforeEach('Insertion des livres servant à la chaine de recherche de livre', done => {
    book1 = new Book({title:"Harry Potter and the Philosopher\'s Stone"})
    book2 = new Book({title:"Harry Potter and the Chamber of Secrets"})
    book3 = new Book({title:"Harry Potter and the Prisoner of Azkaban"})
    book4 = new Book({title:"Harry Potter and the Goblet of Fire"})
    book5 = new Book({title:"Harry Potter and the Order of the Phoenix"})
    book6 = new Book({title:"Harry Potter and the Half-Blood Prince"})
    book7 = new Book({title:"Harry Potter and the Deathly Hallows"})
    Promise.all([book1.save(), book2.save(), book3.save(), book4.save(), book5.save(), book6.save(), book7.save()])
      .then(() => Book.estimatedDocumentCount()
        .then(count => {
          assert.equal(count, 7)
          done()
        })
      )
  })

  it('Recherche du livre ayant un titre particulier et vérif id',done => {
    Book.findOne({ title: book1.title })
      .then(book => {
        assert(book._id.equals(book1._id))
        done()
      })
  })
  
  it('Recherche du livre ayant un id particulier et vérif titre',done => {
    Book.findOne({ _id: book1._id })
      .then(book => {
        assert(book.title === book1.title)
        done()
      })
  })

  it('Recherche des livres ayant un titre commençant par une chaine et vérif nombre',done => {
    Book.find({ title: { $regex: /Harry Potter/ }}) 
      .then(books => {
        assert(books.length === 7)
        done()
      })
  })

})
