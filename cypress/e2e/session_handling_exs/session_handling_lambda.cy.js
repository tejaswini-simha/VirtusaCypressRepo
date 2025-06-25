/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });
describe('Login test to demoqa', () => {
    beforeEach(()=>{
        cy.loginLambda("koushik350@gmail.com","Pass123$");
    } )

    it("Intercept the Login ", () => {
        cy.visit("/");
        // cy.get("[class*='dropdown-toggle'] span").contains("My account").click();
        // cy.get('[placeholder="E-Mail Address"]').type('koushik350@gmail.com');
        // cy.get("[placeholder='Password']").type('Pass123$');
        // cy.get("[value='Login']").click();
        // cy.wait(2000);
        cy.get("#column-right a").contains("My Account").click();
    })

    it("Intercept the Login - 2 ", () => {
        cy.visit("/");
        // cy.get("[class*='dropdown-toggle'] span").contains("My account").click();
        // cy.get('[placeholder="E-Mail Address"]').type('koushik350@gmail.com');
        // cy.get("[placeholder='Password']").type('Pass123$');
        // cy.get("[value='Login']").click();
        // cy.wait(2000);
        cy.get("#column-right a").contains("Edit Account").click();
    })

})

