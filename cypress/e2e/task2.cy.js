describe('3 selectors task', () => {
    it('adding a product to the cart and deleting it', () => {
        cy.visit('')
        cy.get('#tbodyid > div:nth-of-type(1) .card-img-top').click() //select the image of the first product
        cy.get('.row .btn').click() //select the button for add to the chart
        cy.get('#cartur').click() //select the cart link
        cy.get('#tbodyid a').click() //select the delete link of the product
      })
})