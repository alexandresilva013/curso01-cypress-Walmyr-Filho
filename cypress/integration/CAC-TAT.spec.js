/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', () =>{
        const longText = "Como podemos te ajudar Como podemos te ajudar Como podemos te ajudar Como podemos te ajudarComo podemos te ajudar Como podemos te ajudar"
        
        cy.clock();

        //delay deixa o teste mais devagar para ser possível acompanhar o teste
        cy.get('#firstName').type('Alexandre', {delay:500});
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('alexandre@gmail.com');
        cy.get('#open-text-area').type(longText, {delay:0});
        //cy.get('button[type="submit"]').click();
        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible');

        cy.tick(3000);
        cy.get('.success').should('be.not.visible');
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        //paralisa o relógio do navegador
        cy.clock();
        
        cy.get('#firstName').type('Alexandre');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('alexandre#gmail.com');
        cy.get('#open-text-area').type('Teste');
        //cy.get('button[type="submit"]').click();
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
        
        //adianta o relógio do navegador em 3 segundos
        cy.tick(3000)
        cy.get('.error').should('be.not.visible');
    })

    it('não alfanúmericos no telefone', () => {
        //Preenche e valida em um só código
        cy.get('#phone').type('Alexandre').should('have.value', '');
    })

    it('Telefone Obrigatório', () => {
        cy.clock();

        cy.get('#firstName').type('Alexandre');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('alexandre@gmail.com');
        cy.get('#open-text-area').type('Teste');
        cy.get('#phone-checkbox').check();
        //cy.get('button[type="submit"]').click();
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');

        cy.tick(3000);
        cy.get('.error').should('be.not.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
        .type('valor-aqui')
        .should('have.value', 'valor-aqui')
        .clear()
        .should('have.value', '');
        cy.get('#lastName')
        .type('valor-aqui')
        .should('have.value', 'valor-aqui')
        .should('have.value', 'valor-aqui')
        .clear()
        .should('have.value', '');
        cy.get('#email').type('valor-aqui')
        .should('have.value', 'valor-aqui')
        .should('have.value', 'valor-aqui')
        .clear()
        .should('have.value', '');
        cy.get('#phone')
        .type('111111')
        .should('have.value', '111111')
        .clear()
        .should('have.value', '');
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock();

        //cy.get('button[type="submit"]').click();
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');

        cy.tick(3000);
        cy.get('.error').should('be.not.visible');
    })

    it('preenche os campos obrigatórios e envia o formulário', () =>{
        cy.clock();

        cy.fillMandatoryFieldsAndSubmit();

        cy.get('.success').should('be.visible');

        cy.tick(3000);
        cy.get('.success').should('be.not.visible');
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type=radio][value=feedback]')
        .check()
        .should('have.value', 'feedback');
    })

    it('marca cada tipo de atendimento"', () => {
        //percorre manualmente os radio button e conferindo se estão marcados
        cy.get('input[type=radio][value=ajuda]')
        .check()
        .should('have.value', 'ajuda');
        cy.get('input[type=radio][value=elogio]')
        .check()
        .should('have.value', 'elogio');
        cy.get('input[type=radio][value=feedback]')
        .check()
        .should('have.value', 'feedback');

        //percorre os radio button marcando e conferindo
        cy.get('input[type=radio]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check().should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () =>{
        //cy.get('#email-checkbox').check().should('be.checked');
        //cy.get('#phone-checkbox').check().should('be.checked');

        //marcar todos os checkbox
        //cy.get(':checkbox').check().should('be.checked');
        // ou
        //cy.get('[type="checkbox"]').check().should('be.checked');

        cy.get('[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked');
    })

    it('seleciona um arquivo da pasta fixtures', () =>{
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/arquivoTeste.html')
        .should(function($input){
            //console.log($input)      para exibir o comando jQuery no console
            expect($input[0].files[0].name).to.equal('arquivoTeste.html');
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () =>{
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/arquivoTeste.html', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('arquivoTeste.html');
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
        cy.fixture('arquivoTeste.html').as('fileArquivo')
        cy.get('#file-upload')
        .should('not.have.value')
        .selectFile('@fileArquivo')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('arquivoTeste.html');
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        //cy.get('#privacy a').should('have.attr', 'target', '_blank');
        
        //cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank');
        
        //cy.contains('Política de Privacidade').should('have.attr', 'target', '_blank');
        
        //cy.get('#privacy a').should('have.attr', 'target', '_blank');
        
        //cy.get('#privacy a').should('have.attr', 'target', '_blank');
        
        //Tem um href específico
        //cy.get('a[href="privacy.html"').should('have.attr', 'target', '_blank');

        //Começa com um href específico
        //cy.get('a[href^="privacy"').should('have.attr', 'target', '_blank');

        //Termina com um href específico
        //cy.get('a[href$=".html"').should('have.attr', 'target', '_blank');

        //Href que começa com "pri" e termina ".html"
        cy.get('a[href^="pri"][href$=".html"]').should('have.attr', 'target', '_blank');

        //É possível pesquisar outros seletores também (id que começa com "pri" e termina com "vacy")
        //cy.get('[id^=pri][id$=vacy] a').should('have.attr', 'target', '_blank');
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click();
    })

    //comando lodash para repetir o teste quantas vezes quiser
    Cypress._.times(3, () =>{
        it('marca o tipo de atendimento "Feedback" três vezes', () => {
            cy.get('input[type=radio][value=feedback]')
            .check()
            .should('have.value', 'feedback');
        })
    })

    Cypress._.repeat('0123456789', 20)

    //comando lodash para repedir uma variável quantas vezes quiser
    it('preenche os campos obrigatórios e envia o formulário com a funcção repeat', () =>{
        const longText = Cypress._.repeat('Como podemos te ajudar', 10);
        
        cy.clock();

        cy.get('#firstName').type('Alexandre');
        cy.get('#lastName').type('Silva');
        cy.get('#email').type('alexandre@gmail.com');
        cy.get('#open-text-area').type(longText, {delay:0});
        //cy.get('button[type="submit"]').click();
        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible');

        cy.tick(3000);
        cy.get('.success').should('be.not.visible');
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.error')
        .should('be.not.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        .should('be.not.visible')

        cy.get('.success')
        .should('be.not.visible')
        .invoke('show')
        .should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.')
        .invoke('hide')
        .should('be.not.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('textarea[name="open-text-area"]')
        .invoke('val', 'como posso te ajudar')
        .should('have.value', 'como posso te ajudar')
    })

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')     
        .should(function(response){
            //console.log(response)
            const {status, statusText, body} = response;
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        }) 
    })

    it('Encontrando o gato', () => {
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
    })
})