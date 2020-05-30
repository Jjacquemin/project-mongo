const assert = require('assert')
const Book = require('../src/books')

describe('Modification de livre', () => {
  let book1
  const newTitle = 'Harry Potter à l\'école des sorciers'

  beforeEach('Insertion du livre servant à la chaine de modification de livre', done => {
    book1 = new Book({title:"Harry Potter and the Philosopher\'s Stone"})
    book1.save()
    .then(() => done())
  })

  function assertTitle(operation, done) {
    operation
      .then(() => Book.find({}))
      .then(books => {
        assert(books.length === 1)
        assert(books[0].title === newTitle)
        done()
      })
  }

  it('Modification sur une instance (set puis save)', done => {
    book1.set('title', newTitle)
    assertTitle(book1.save(), done)
  })

  it('Modification sur une instance (updateOne)', done => {
    assertTitle(book1.updateOne({ title: newTitle}), done)
  })

  it('Modification de tous les livres en passant par le model (updateMany)', done => {
    assertTitle(Book.updateMany({ title: book1.title}, { title: newTitle}), done)
  })

  it('Recherche un livre par son titre et modification (findOneAndUpdate)', done => {
    assertTitle( Book.findOneAndUpdate({ title: book1.title}, { title: newTitle}), done)
  })

  it('Recherche un livre par id et modification (findByIdAndUpdate)', done => {
    assertTitle(Book.findByIdAndUpdate(book1._id, { title: newTitle}), done)
  })

  it('Incrémente le nombre de pages', done => {
    Book.updateMany({ title: book1.title }, { $inc: { totalPages: 3 } })
    .then( () => Book.findOne({ title: book1.title }))
    .then( book => {
            assert(book.totalPages === 3)
            done()
    })
  })

})
