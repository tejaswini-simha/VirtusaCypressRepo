/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });
describe('Login test to demoqa', () => {
    beforeEach(()=>{
        // cy.session('LogintoDemoQA', ()=>{
        //     cy.visit("/");
        //     cy.get('input[name="loginname"]').type('tu3123');
        //     cy.get('input[name="password"]').type('tu3123');
        //     cy.get('button[title="Login"]').click();
        //     cy.url().should('contain', 'https://automationteststore.com/index.php?rt=account/account');
        // })
        cy.login('tu3123','tu3123');
    } )

    it('Login 1st Time - And Sign out', ()=> {
        cy.visit("/");
        cy.get(".menu_text").should("contain", "Welcome back tu3123");
    })

    it('Login 2nd Time - And Sign out', ()=> {
        cy.visit("/");
        cy.get("span.maintext").should("contain", " My Account");
        // cy.url().should('contain', 'login_sucess');
        cy.get('span.subtext').contains('tu3123').click();
    })
})

