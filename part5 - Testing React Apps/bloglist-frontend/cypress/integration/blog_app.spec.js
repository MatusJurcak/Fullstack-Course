describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Emdzej',
            username: 'emdzej',
            password: 'password'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Log in form is shown', function () {
        cy.contains('Log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('emdzej')
            cy.get('#password').type('password')
            cy.get('#login-button').click()

            cy.contains('Emdzej logged in')

        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('emdzej')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'wrong credentials')
                .and('have.css', 'color', 'rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'Emdzej logged in')

        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'emdzej', password: 'password' })
        })

        it('A blog can be created', function () {
            cy.contains('create new blog').click()

            cy.get('#title').type('a blog created by cypress')
            cy.get('#author').type('emdzej')
            cy.get('#url').type('url')
            cy.get('#submit-button').click()

            cy.contains('a blog created by cypress')
        })

        describe('and a note exists', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'another note cypress',
                    author: 'emdzej',
                    url: 'url'
                })
            })

            it('you can like a blog', function () {
                cy.contains('another note cypress').parent().find('#details').click()
                cy.contains('another note cypress').parent().should('contain', '0')
                cy.contains('another note cypress').parent().find('#like').click()
                cy.contains('another note cypress').parent().should('contain', '1')
            })
            it('you can delete a blog', function() {
                cy.contains('another note cypress').parent().find('#details').click()
                cy.contains('another note cypress').parent().find('#removeButton').click()
                cy.should('not.contain', 'another note cypress')
            })
        })
    })
})
