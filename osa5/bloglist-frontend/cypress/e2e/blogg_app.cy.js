/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      username: 'Eestipoeg',
      name: 'Oskari',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  describe('Login', function () {
    it('Login form is shown', function () {
      cy.contains('Log in to application')
      cy.contains('username')
      cy.contains('password')
    })

    it('Login is doable', function () {
      cy.get('#username-input').type('Eestipoeg')
      cy.get('#password-input').type('salainen')
      cy.get('#loginbutton').click()

      cy.contains('Oskari logged in')
    })
    it('Login fails with wrong password', function () {
      cy.get('#username-input').type('Eestipoeg')
      cy.get('#password-input').type('wrong')
      cy.get('#loginbutton').click()

      cy.contains('wrong username or password')
    }
    )

  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'Eestipoeg', password: 'salainen' })
    }
    )
    it('A blog can be created', function () {
      cy.createBlog({ title: 'oskari', author: 'markus', url: 'leevi.fi' })
      cy.contains('oskari, author: markus')
    })
    it('A blog can be liked', function () {
      cy.createBlog({ title: 'oskari', author: 'markus', url: 'leevi.fi' })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    }
    )
    it('A blog can be deleted', function () {
      cy.createBlog({ title: 'oskari', author: 'markus', url: 'leevi.fi' })
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('oskari, author: markus').should('not.exist')
    }
    )
    it('Blogs are ordered by likes', function () {
      cy.createBlog({ title: 'oskari', author: 'markus', url: 'leevi.fi', likes: 1 })
      cy.createBlog({ title: 'eesti', author: 'mart', url: 'eesti.fi', likes: 55 })
      cy.createBlog({ title: 'suomi', author: 'markus', url: 'suomi.fi', likes: 3 })
      cy.get('.blog').eq(0).should('contain', 'eesti')
      cy.get('.blog').eq(1).should('contain', 'suomi')
      cy.get('.blog').eq(2).should('contain', 'oskari')

    }
    )



  })

})






