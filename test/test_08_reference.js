const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/users')
const BlogBook = require('../src/blogBooks')
const Comment = require('../src/comments')

describe('Test de références', () => {
  let user1, blogBook1, comment1

  beforeEach(done => {
      
    user1 = new User({ name: 'Joachim' })
    blogBook1 = new BlogBook({ 
      title: 'Les fourmis', 
      summary: 'Les fourmis : un livre qui concerne, les fourmis...'
    })
    comment1 = new Comment({ content: 'Wao génial super comme livre !' })

    user1.blogBooks.push(blogBook1)
    blogBook1.comments.push(comment1)
    comment1.user = user1

    Promise.all([user1.save(), blogBook1.save(), comment1.save()])
      .then(() => {
        done()
      })
  })

  it('Test le titre du livre d\'un user', done => {
    // populate permet de récupérer le détail de l'objet pour lequel l'id dans un tableau de référence id
    User.findOne({ name: 'Joachim' })
      .populate('blogBooks')
        .then(user => {
          assert(user.blogBooks[0].title === blogBook1.title)
          done()
        })
  })

  it('Test le commentaire du livre d\'un user', done => {
    // populate permet de récupérer le détail de l'objet pour lequel l'id dans un tableau de référence id
    // on doit détailler plus lorsqu'on est sur un populate de petite fille (path + model)
    User.findOne({ name: 'Joachim' })
      .populate({
        path: 'blogBooks',
        populate: {
          path: 'comments',
          model: 'comment'
        }
      })
        .then(user => {
          assert(user.blogBooks[0].comments[0].content === comment1.content )
          done()
        })         
  })
})
