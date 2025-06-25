///<reference types="Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

describe('Basic CYpress Actions', ()=> {

    beforeEach(()=>{
        cy.visit('http://localhost:3000/productReviewPage.html');
    })

    xit("Basic Assertiosns", ()=>{
        cy.get("button").should('exist');
        cy.get("button").should("be.enabled");
        cy.get("button").should
        // cy.get("button").contains("Read mor1e");
        cy.get("button").should("contain", "Read more");
        cy.contains("Read more");
        cy.get("button").should("not.be.enabled");
    })

    xit("Chaining Assertions", ()=>{
        cy.get("button").should('exist').and("not.be.visible");
        // // cy.get("button").contains("Read mor1e");
        // cy.get("button").should("contain", "Read more");
        // cy.get("button").should("not.be.enabled");
    })

    xit("Invisibility Assertions", ()=>{
        cy.visit('http://localhost:3000/productReviewPage-copy.html');
        cy.get(".highlight.fade-in",{timeout:6000}).should("be.visible");
        // cy.get(".highlight.fade-in").should("not.be.visible");
        cy.get("ul.sidebar-list").within(()=>{
            cy.get(".highlight.fade-in").should("exist");
        })
        cy.get("ul.sidebar-list").find(".highlight.fade-in").should("exist");
        cy.get("ul.sidebar-list .highlight.fade-in").should("exist");
    })

    xit("Length assertions", ()=>{
        cy.visit('http://localhost:3000/productReviewPage-copy.html');
        cy.get("ul.sidebar-list li").should("have.length", 3);
    })

    xit("Null assertions", ()=>{
        cy.visit('http://localhost:3000/productReviewPage-copy.html');
        cy.get("ul.sidebar-list").should("not.be.null");
    })

    xit("No of elements check", ()=>{
        cy.visit('http://localhost:3000/productReviewPage-copy.html');
        cy.get("button").then((webelements)=>{
            expect(webelements).have.length(3, "Not 3 elements");
            expect(webelements).have.length(3);
        })
    })


    xit("Text Check", ()=>{
        cy.visit('http://localhost:3000/productReviewPage-copy.html');
        cy.get("button").invoke('text').then((text)=>{
            cy.log("Text is :: " + text);
            assert(text.trim().includes("Read more"));
        })
    })

    it("XPath tests", ()=>{
        cy.xpath("//button").should('exist');
        cy.xpath("//button").should("be.enabled");
        cy.xpath("//button").should("be.enabled");
        // cy.get("button").contains("Read mor1e");
        cy.xpath("//button").should("contain", "Read more");
        cy.xpath("//button").should("not.be.enabled");
    })

})