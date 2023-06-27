class homePage{

    constructor(){

    }
    element = {
        homeButton: ()=> cy.get(".title").contains("Home")
    }

    visit(){
        cy.visit("");
    }

    verifyHomePageLoads(){
        this.element.homeButton().should('be.visible')
    }
}

module.exports = new homePage();