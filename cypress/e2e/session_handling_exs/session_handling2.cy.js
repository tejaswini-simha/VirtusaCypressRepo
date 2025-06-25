/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe(("Login with different creds"), ()=>{
    beforeEach(()=>{
        cy.login('tu11234','tu11234');
    } )

    it('Login 3rd Time -this time with a different user - And Sign out', ()=> {
        cy.visit("/");
        cy.get("span.maintext").should("contain", " My Account");
        // cy.url().should('contain', 'login_sucess');
        cy.get('span.subtext').contains('tu11234').click();
    })
})
