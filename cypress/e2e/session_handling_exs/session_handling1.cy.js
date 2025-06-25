/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });
    // For this test to reuse the session that is already existing, we need to use the property cacheAcrossSpecs to true in the Command.js file in the cy.session creation - as shown below
    // cy.session([username,password], ()=>{
    //     cy.visit("/");
    //     cy.get('input[name="loginname"]').type(username);
    //     cy.get('input[name="password"]').type(password);
    //     cy.get('button[title="Login"]').click();
    //     cy.url().should('contain', 'https://automationteststore.com/index.php?rt=account/account');
    //     console.log("Inside common login session - Successfully logged in as :: " + username + " :: " + password);
    // }, {
    //     cacheAcrossSpecs: true
    // })
describe(("Login with different creds"), ()=>{
    beforeEach(()=>{
        cy.login('tu3123','tu3123');
    } )

    it('Login 3rd Time -this time with a same user - And Sign out', ()=> {
        cy.visit("/");
        cy.get("span.maintext").should("contain", " My Account");
        // cy.url().should('contain', 'login_sucess');
        cy.get('span.subtext').contains('tu3123').click();
    })
})
