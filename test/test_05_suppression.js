const assert = require('assert')
const Book = require('../src/books')

describe('Suppression de livre', () => {
  let book1

  beforeEach('Insertion du livre servant à la chaine de suppression de livre', done => {
    book1 = new Book({title:"Harry Potter and the Philosopher\'s Stone"})
    book1.save()
    .then(() => done())
  })

  function assertRemove(operation, done) {
    operation
      .then(() => Book.find({}))
      .then(books => {
        assert(books.length === 0)
        done()
      })
  }

  it('Suppression sur une instance (deleteOne)', done => {
    assertRemove(book1.deleteOne(), done)
  })

  it('Suppression de tous les livres en passant par le model (deleteMany)', done => {
    assertRemove(Book.deleteMany({ title: book1.title}), done)
  })

  it('Recherche un livre par son titre et suppression (findOneAndRemove)', done => {
    assertRemove( Book.findOneAndRemove({ title: book1.title}), done)
  })

  it('Recherche un livre par id et suppression (findByIdAndRemove)', done => {
    assertRemove(Book.findByIdAndRemove(book1._id), done)
  })

})
