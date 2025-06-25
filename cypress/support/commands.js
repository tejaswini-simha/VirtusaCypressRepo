// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
    cy.session([username,password], ()=>{
        cy.visit("/");
        cy.get('input[name="loginname"]').type(username);
        cy.get('input[name="password"]').type(password);
        cy.get('button[title="Login"]').click();
        cy.url().should('contain', 'https://automationteststore.com/index.php?rt=account/account');
        console.log("Inside common login session - Successfully logged in as :: " + username + " :: " + password);
    }, {
        cacheAcrossSpecs: true
    })
})

Cypress.Commands.add('loginLambda', (username, password) => {
    cy.session([username,password], ()=>{
        cy.visit("/");
        cy.get("[class*='dropdown-toggle'] span").contains("My account").click();
        cy.get('[placeholder="E-Mail Address"]').type(username);
        cy.get("[placeholder='Password']").type(password);
        cy.get("[value='Login']").click();
        cy.wait(10000);
        console.log("Inside common login session - Successfully logged in as :: " + username + " :: " + password);
    })
})

Cypress.Commands.add('loginAuto', (username, password) => {
    cy.visit("/");
    cy.get('input[name="loginname"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[title="Login"]').click();
    cy.wait(10000);
})