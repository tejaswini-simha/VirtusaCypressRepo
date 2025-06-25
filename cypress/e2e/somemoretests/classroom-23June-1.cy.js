///<reference types="Cypress"/>
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('Intercept Network Requests', ()=> {
    it('Intercept Google Image Search and redirect it to amazon page', () =>{
        cy.intercept("GET", "**/imghp?hl=en&ogbl", (req)=>{
            req.redirect("https://amazon.in");
        })
        cy.visit("https://www.google.com");
        cy.get('[aria-label="Search for Images "]').click();
    })
})