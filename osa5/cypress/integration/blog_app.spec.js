describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Jarmo Kuusisto',
      username: 'jarmokuu',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.get('h2').contains('Log In')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jarmokuu')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jarmokuu')
      cy.get('#password').type('salas')
      cy.get('#login-button').click()
      cy.contains('wrong credentials')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'jarmokuu', password: 'salasana'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('Add new Blog').click()
      cy.get('#title').type('test1')
      cy.get('#author').type('jk')
      cy.get('#url').type('test.com/blog1')
      cy.get('#add').click()
      cy.contains('test1')
    })
  })

  describe('Liking', function() {
    beforeEach(function() {
      cy.login({username: 'jarmokuu', password: 'salasana'})
    })

    it('Clicking like works', function() {
      cy.contains('Add new Blog').click()
      cy.get('#title').type('test1')
      cy.get('#author').type('jk')
      cy.get('#url').type('test.com/blog1')
      cy.get('#add').click()
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

  })

  describe('Deleting', function() {
    beforeEach(function() {
      cy.login({username: 'jarmokuu', password: 'salasana'})
    })

    it('Clicking remove works', function() {
      cy.contains('Add new Blog').click()
      cy.get('#title').type('test1')
      cy.get('#author').type('jk')
      cy.get('#url').type('test.com/blog1')
      cy.get('#add').click()
      cy.get('#delete-button').click()
      cy.get('html').should('not.contain', 'test1')
    })
  })

  describe('Sorting', function() {
    beforeEach(function() {
      cy.login({username: 'jarmokuu', password: 'salasana'})
      cy.createBlog({
        title: 'test1',
        author: 'jk',
        url: 'test.com/b1',
        likes: 10
      })
      cy.createBlog({
        title: 'test2',
        author: 'jk',
        url: 'test.com/b2',
        likes: 20
      })
      cy.createBlog({
        title: 'test3',
        author: 'jk',
        url: 'test.com/b3',
        likes: 13
      })
    })

    it('blog are sorted correctly', function () {
      cy.contains('test2').contains('View').click()
      cy.contains('likes 20')
    })
  })
})