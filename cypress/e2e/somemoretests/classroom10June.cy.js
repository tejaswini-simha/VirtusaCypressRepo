/// <reference types="Cypress"/>
/// <reference types="cypress-xpath" />

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

let localxpath = {
    headerText: "//h1",
    buttonUnderSmartPhone: "//div[@id='article1'][contains(.,'Smartphone')]//button",
    sidebarListElements: "//ul[@class='sidebar-list']//li",
    sidebarHighlightedElements: "//ul[@class='sidebar-list']//li[@class='highlight']",
    thirdArticle: "//div[@id='article3']"
};

let cssSel = {
    cssHeader: "h1"
}

describe('template spec', ()=>{
    it('XPath Usage', () => {
        cy.visit("http://localhost:3000/productreviewpage-copy.html");
        cy.xpath(localxpath.headerText).should('contain', 'Product Blog');
    })

    it('Verify the header', () => {
        cy.visit('http://localhost:3000/productReviewPage-copy.html');
        // cy.xpath(xpath.headerText).should("contain.text", "Product Blog");
        cy.xpath(localxpath.headerText).should("contain", "Product Blog");
        cy.xpath("//h1").should("contain", "Product Blog");
        cy.xpath(localxpath.headerText).should("be.visible");
        cy.xpath(localxpath.buttonUnderSmartPhone).should("contain.text", "Read more");
        cy.xpath(localxpath.buttonUnderSmartPhone).should("be.enabled");
        cy.xpath(localxpath.sidebarListElements).should("have.length", 4);
        cy.xpath(localxpath.sidebarHighlightedElements).should("have.css", "color", "rgb(217, 83, 79)");
        cy.xpath(localxpath.thirdArticle).should("have.attr","class", "article");
        cy.xpath(localxpath.thirdArticle).should("have.class", "article");
    })
})