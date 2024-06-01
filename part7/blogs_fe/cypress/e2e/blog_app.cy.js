describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)

    const user2 = {
      name: 'Miguel García',
      username: 'miguelgarglez',
      password: 'prueba',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.get('#login-form')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.message')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('input#newBlogTitle').type('a blog created by cypress')
      cy.get('input#newBlogAuthor').type('Cypress')
      cy.get('input#newBlogUrl').type('https://www.cypress.io')
      cy.get('#create-blog').click()

      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'Cypress',
          url: 'https://www.cypress.io',
        })
      })

      it('A blog can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('A blog can be deleted by the user who created it', function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('.message')
          .should('contain', 'removed')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it('A blog cannot be deleted by another user', function () {
        cy.get('button#logout').click()
        cy.login({ username: 'miguelgarglez', password: 'prueba' })
        cy.contains('view').click()
        cy.get('button#remove').should('not.exist')
      })
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'originally first blog cypress',
          author: 'Finally Second',
          url: 'https://www.cypress.io',
        })
        cy.createBlog({
          title: 'originally second blog cypress',
          author: 'Finally Third',
          url: 'https://www.cypress.io',
        })
        cy.createBlog({
          title: 'originally third blog cypress',
          author: 'Finally First',
          url: 'https://www.cypress.io',
        })
      })

      it('Blogs are ordered by likes', function () {
        cy.contains('view').click()
        cy.contains('view').click()
        cy.contains('view').click()

        cy.get('.blog').then((blogs) => {
          cy.wrap(blogs[0]).contains('like').click().click() // 2 likes
          cy.wrap(blogs[1]).contains('like').click() // 1 like
          cy.wrap(blogs[2]).contains('like').click().click().click() // 3 likes
        })

        cy.visit('')
        cy.contains('view').click()
        cy.contains('view').click()
        cy.contains('view').click()

        cy.get('.blog').then((blogs) => {
          cy.wrap(blogs[0]).contains('likes: 3')
          cy.wrap(blogs[1]).contains('likes: 2')
          cy.wrap(blogs[2]).contains('likes: 1')
        })
      })
    })
  })
})
