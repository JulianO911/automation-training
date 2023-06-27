class Login{

    constructor(){
        this.url = 'index.php?route=account/login'
        this.loginErrorMessage = ' Warning: No match for E-Mail Address and/or Password.'
        this.blockErrorMessage = ' Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.'
        this.statusCodes = [200]
    }
    element = {
        emailField: () => cy.get('#input-email'),
        passwordField: () => cy.get('#input-password'),
        loginButton: () => cy.get('form > .btn'),
        errorMessage: () => cy.get('#account-login > .alert'),
        accountHeader: () => cy.get('.card-header').contains('My Account'),
        afterLoginStatusCode: () =>  cy.wait('@afterlogin').its('response.statusCode')
    }

    visit(){
        cy.visit(this.url);
    }

    loginProcess(email,password){

        this.typeLoginEmail(email);
        this.typeLoginPassword(password)
        this.clickLoginButton()

    }

    typeLoginEmail(email){
        this.element.emailField().clear().type(email)
    }

    typeLoginPassword(password){
        this.element.passwordField().clear().type(password)
    }

    clickLoginButton(){
        this.element.loginButton().click()
    }

    errorMessageVerification(message){
        this.element.errorMessage().should('have.text',message)
    }

    verifyLoginErrorMessage(){
        this.errorMessageVerification(this.loginErrorMessage)
    }

    verifyBlockErrorMessage(){
        this.errorMessageVerification(this.blockErrorMessage)
    }

    verifySuccesLogin(){
        this.element.accountHeader().should('be.visible')
    }

    statusCodeOk(element){
        element.should('eq',this.statusCodes[0])
    }

    verifyAfterLoginStatusCode(){
        this.statusCodeOk(this.element.afterLoginStatusCode())
    }

}

module.exports = new Login();