/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});


describe('template spec', ()=>{
    it('XPath Usage', () => {
        cy.visit("/productreviewpage-copy.html");
        cy.xpath("//h1").should("contain", "Product Blog");
        // cy.get('.sidebar-list').screenshot();
    })

    it('Screenshots with options', () => {
        cy.visit("/productreviewpage-copy.html");
        cy.xpath("//h1").should("contain", "ProductBlog");
        // cy.screenshot();
        // cy.screenshot("fullpage", {capture: 'fullPage'});
        // cy.screenshot("runner",{capture: 'runner'});
        // cy.screenshot("viewport", {capture: 'viewport'});
    })

    // it('Verify the header', () => {

    // })
})