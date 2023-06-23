describe('api testing', () => {
    it('pikachu test', () => {
        cy.request('GET','https://pokeapi.co/api/v2/pokemon/pikachu').its('status').should('eq',200)
    })

    it('Beltran test', () => {
        cy.request({method:"GET", url:"https://pokeapi.co/api/v2/pokemon/beltran",failOnStatusCode:false }).its('status').should('eq',404)
    })

    it('JSON path', () => {
        const pokemon = 'pikachu';
        const type = 'electric';
        cy.request('GET','https://pokeapi.co/api/v2/pokemon/'+pokemon).then(
            (response) => {
                expect(response.body).to.have.property('name',pokemon)
                expect(response.body.types[0].type).to.have.property('name',type)
            }
        )
    })

    it('intercept test', () => {
        cy.intercept('GET','https://api.demoblaze.com/entries').as('entries')
        cy.visit('')
        cy.wait('@entries').its('response.statusCode').should('eq',200)
    })
})