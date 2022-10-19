describe('Testes da tela de privacidade', () => {
    beforeEach( ()=> {
        cy.visit('./src/privacy.html')
    })

    it('testa a página da política de privavidade de forma independente', () =>{
        cy.get('#white-background').should('be.visible');
        cy.get('p')
        .last()
        .contains('Talking About Testing')
        // ou
        .should('have.text', 'Talking About Testing')
        cy.get('#title').should('have.text', 'CAC TAT - Política de privacidade')
    })
})