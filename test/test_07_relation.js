const assert = require('assert')
const User = require('../src/users')

describe('Test de relation', () => {
  it("Test qu'un titre est bien present comme attribut pour le livre et vérif virtual column", done => {
    const user1 = new User({
      name: 'Joachim',
      books: [{ title: 'Le seigneur des anneaux' }, { title: 'Les raisins de la colère' }]
    })
    user1.save()
      .then( () => User.findOne({ name: user1.name }))
      .then( user => {
        assert(user.books.length === 2)
        assert(user.countBooks === 2)
        done()
      })
  })

  it("Test qu'un livre à bien été ajouté à un utilisateur et vérif virtual column", done => {
    const user1 = new User({ name: 'Joachim' })
    user1.books.push({ title: 'Le seigneur des anneaux' });
    user1.save()
      .then( () => {
        User.findOne({ name: user1.name })
          .then( userFound => {
            assert(userFound.books.length === 1)
            assert(userFound.countBooks === 1)
            done()
          })
      })
       
  })

  it("Supprime les livres d'un user et vérif virtual column", done => {
    const user1 = new User({
      name: 'Joachim',
      books: [{ title: 'Le seigneur des anneaux' }, { title: 'Les raisins de la colère' }]
    })
    user1.books[0].remove()
    user1.save()
      .then( () => {
        User.findOne({ name: user1.name })
          .then( userFound => {
            assert(userFound.books.length === 1)
            assert(userFound.countBooks === 1)
            done()
          })
      })
  })
})
