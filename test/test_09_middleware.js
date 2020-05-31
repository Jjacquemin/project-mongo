const assert = require('assert')
const BlogBook = require('../src/blogBooks')
const User = require('../src/users')
const Comment = require('../src/comments')

describe('Test de middleware', () => {
  it('Test que les blogBooks d\'un user sont bien supprimés lors de la suppression du user', done => {
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
        user1.remove()
          .then( () => {
            BlogBook.estimatedDocumentCount()
              .then(count => {
                assert.equal(count, 0)
                done()
              })
          })
      })
  })
})
