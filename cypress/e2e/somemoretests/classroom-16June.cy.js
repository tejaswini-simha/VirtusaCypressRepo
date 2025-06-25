///<reference types="Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('Mouse over Handling', ()=> {
    xit("Mouse over simulation on Cypress Website", ()=>{
        cy.visit("https://www.cypress.io/");
        cy.get('#dropdownDocs').trigger("mouseover");
        cy.wait(3000);
    })

    xit("Mouse over simulation on Local website", ()=>{
        cy.visit("http://localhost:3000/basicMouseOver.html");
        cy.get('[data-testid="menu-1"]').trigger("mouseenter");
        cy.wait(3000);
    })

    it("Mouse over simulation on Cypress todo", ()=>{
        cy.visit("https://example.cypress.io/todo");
        cy.get(".new-todo").type("Task1 {Enter}");
        cy.get(".new-todo").type("Task2 {Enter}");
        cy.get(".new-todo").type("Task3 {Enter}");
        // cy.get("div.view").contains("Task1").parent("div").find(".destroy").click({force:true});
        cy.get("div.view").contains("Task1").parent("div").find(".destroy").invoke("show").click();
    })
})