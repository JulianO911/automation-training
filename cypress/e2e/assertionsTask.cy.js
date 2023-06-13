describe('3 assertions task', () => {

    it('Buy a product test',() => {
       cy.visit('')
       cy.get('#tbodyid > div:nth-of-type(1) .card-img-top').click() //select the image of the first product
       cy.get('.row .btn').click() //select the button for add to the chart
       cy.get('#cartur').click() //select the cart link
       cy.get('#page-wrapper .btn').click() //click on 'Place Order' button
 
       //Input the form
       cy.get('#name').type('testBuy')
       cy.get('#country').type('Colombia')
       cy.get('#city').type('Medallo')
       cy.get('#card').type('111')
       cy.get('#month').type('10')
       cy.get('#year').type('2023')
       cy.get('#orderModal button[onClick="purchaseOrder()"]').click() //Click on purchase button
 
       //Verify if the alert has a OK button
       cy.get('.sweet-alert').contains('button','OK').should('be.visible')
 
       //Verify if the alert shows the 'Thank you for your purchase!' text
       cy.get('.sweet-alert > h2').should('have.text','Thank you for your purchase!')
 
       /*Verify if the alert shows a text with the next information: Id, Amount, Card number, name (with no spaces)
       and the date with the format DD/M/YYYY*/
       cy.get('.lead').invoke('text').then((text) => { 
         expect(text).to.match(/Id: \d+Amount: \d+ \w{3}Card Number: \d+Name: \w+Date: \d{1,2}\/\d{1}\/\d{4}/) 
       })
     
 
 
     })
 })