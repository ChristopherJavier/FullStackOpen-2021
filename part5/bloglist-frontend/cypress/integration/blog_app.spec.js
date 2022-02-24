describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({ username: 'userTest1', name: 'userTest1', password: 'password1' })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('Log in to application')
        cy.get('form').contains('username')
        cy.get('form').contains('password')
        cy.get('form').contains('login')
        cy.get('form').get('button').contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('userTest1')
            cy.get('#password').type('password1')
            cy.get('#login-button').click()
            cy.contains('userTest1 logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('user')
            cy.get('#password').type('password')
            cy.get('#login-button').click()
            cy.get('.error').contains('Wrong credentials')
        })

        it('the notification shown with unsuccessful login is displayed red', function() {
            cy.get('#username').type('user')
            cy.get('#password').type('password')
            cy.get('#login-button').click()
            cy.get('.error')
                .should('contain', 'Wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'userTest1', password: 'password1' })
        })

        it('a blog can be created', function() {
            cy.get('#newBlogButton').click()
            cy.contains('Create a new blog')
            cy.get('#title').type('TestBlog')
            cy.get('#author').type('Cypress')
            cy.get('#url').type('http://test-cypress.com')
            cy.get('#saveBlogButton').click()

            cy.get('.notification')
                .should('contain', 'a new blog TestBlog by Cypress was created')
                .and('have.css', 'color', 'rgb(0, 128, 0)')

            cy.get('.blog').contains('TestBlog Cypress')
        })

        it('the users can like a blog', function() {
            cy.createBlog({ title: 'TestBlog1', author: 'Cypress', url: 'http://test-cypress.com' })
            cy.get('.blog')
            cy.get('.detailsButtons').click()
            cy.get('.likeButtons').click()
            cy.get('.list').contains('likes 1')
        })

        it('the user who created a blog can delete it', function() {
            cy.createBlog({ title: 'TestBlog1', author: 'Cypress', url: 'http://test-cypress.com' })
            cy.get('.blog')
            cy.get('.detailsButtons').click()
            cy.get('.removeButton').click()

            cy.get('.notification').contains('The blog TestBlog1 of Cypress was successfully deleted')
            cy.get('.blog').should('not.exist')
        })

        it('other users cannot delete the blog', function()  {
            cy.createBlog({ title: 'TestBlog1', author: 'Cypress', url: 'http://test-cypress.com' })
            cy.contains('logout').click()

            cy.createUser({ username: 'userTest2', name: 'userTest2', password: 'password2' })
            cy.contains('Log in to application')
            cy.loginInApp({ username: 'userTest2', password: 'password2' })
            cy.get('.detailsButtons').click()
            cy.get('.removeButton').should('not.exist')
        })

        it('the blogs are ordered according to likes', function() {
            cy.login({ username: 'userTest1', password: 'password1' })
            cy.createBlogWithLikes({ title: 'TestBlog1', author: 'Cypress', url: 'http://test-cypress.com', likes: 10 })
            cy.createBlogWithLikes({ title: 'TestBlog2', author: 'Cypress', url: 'http://test-cypress.com', likes: 20 })
            cy.createBlogWithLikes({ title: 'TestBlog3', author: 'Cypress', url: 'http://test-cypress.com', likes: 5 })
            cy.createBlogWithLikes({ title: 'TestBlog4', author: 'Cypress', url: 'http://test-cypress.com', likes: 1 })
            cy.createBlogWithLikes({ title: 'TestBlog5', author: 'Cypress', url: 'http://test-cypress.com', likes: 19 })

            cy.visit('http://localhost:3000')
            cy.get('.blog').then(($blog) => {
                cy.wrap($blog).get('.detailsButtons').click({ multiple: true })
                cy.wrap($blog[0]).contains('20')
                cy.wrap($blog[1]).contains('19')
                cy.wrap($blog[2]).contains('10')
                cy.wrap($blog[3]).contains('5')
                cy.wrap($blog[4]).contains('1')
            })

            cy.contains('TestBlog5 Cypress').children().find('.likeButtons').as('theButton')
            cy.get('@theButton').click()
            cy.wait(2000)
            cy.get('@theButton').click()
            cy.wait(2000)

            cy.get('.blog').then(($blog) => {
                cy.wrap($blog[0]).contains('21')
                cy.wrap($blog[1]).contains('20')
                cy.wrap($blog[2]).contains('10')
                cy.wrap($blog[3]).contains('5')
                cy.wrap($blog[4]).contains('1')
            })
        })
    })
})