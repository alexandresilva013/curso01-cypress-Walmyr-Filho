Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Alexandre');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('alexandre@gmail.com');
        cy.get('#open-text-area').type("Teste");
        cy.get('button[type="submit"]').click();
        //cy.contains('button', 'Enviar').click();
})