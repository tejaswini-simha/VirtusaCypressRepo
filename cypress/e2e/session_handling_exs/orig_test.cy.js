/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });
describe('Login test to demoqa', () => {
    beforeEach(()=>{
        cy.loginAuto('tu3123','tu3123');
            // cy.url().should('contain', 'https://automationteststore.com/index.php?rt=account/account');
    } )

    it('Login 1st Time - And Sign out', ()=> {
        cy.get(".menu_text").should("contain", "Welcome back tu3123");
    })

    it('Login 2nd Time - And Sign out', ()=> {
        cy.url().should('contain', 'https://automationteststore.com/index.php?rt=account/account');        cy.get('span.subtext').contains('tu3123').click();
    })
})

