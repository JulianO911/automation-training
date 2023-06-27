context('Test suit', () => {

    it('Home page load porperly',() => {
        cy.visit('')
        cy.get('.title').contains('Home').should('be.visible')
    })

    it('Login failed - user doesnt exist',() => {
        cy.visit('index.php?route=account/login')
        cy.get('#input-email').clear().type('julian@gmail.com')
        cy.get('#input-password').clear().type('123')
        cy.get('form > .btn').click()
        cy.get('#account-login > .alert').should('have.text',' Warning: No match for E-Mail Address and/or Password.')

    })

    it('Login success - user login',() => {
        cy.visit('index.php?route=account/login')
        cy.get('#input-email').clear().type('tt@endava.com')
        cy.get('#input-password').clear().type('Test/1234')
        cy.intercept('GET','https://ecommerce-playground.lambdatest.io/index.php?route=account/account').as('afterlogin')
        cy.get('form > .btn').click()
        cy.wait('@afterlogin').its('response.statusCode').should('eq',200)
        cy.get('.card-header').contains('My Account').should('be.visible')
    })

    it('Firstname and lastname input fields requeriment shows an alert',() => {
        cy.visit('index.php?route=account/register')
        cy.get('.float-right .btn').click()
        cy.get('#input-firstname').parent('div').children('.text-danger').should('be.visible')
        cy.get('#input-lastname').parent('div').children('.text-danger').should('be.visible')
    })
})