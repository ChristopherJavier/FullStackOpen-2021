Cypress.Commands.add('createUser', ({ username, name, password }) => {
    cy.request('POST', 'http://localhost:3003/api/users', {
        username, name, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBloglistappUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogslistUser', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title, author, url },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogslistUser')).token}`
        }
    })

    cy.visit('http://localhost:3000')
})

Cypress.Commands.add('loginInApp', ({ username, password }) => {
    cy.get('#username').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
    cy.contains('userTest2 logged in')
})

Cypress.Commands.add('createBlogWithLikes', ({ title, author, url, likes }) => {
    cy.request({
        url: 'http://localhost:3003/api/blogs',
        method: 'POST',
        body: { title, author, url, likes },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogslistUser')).token}`
        }
    })
})