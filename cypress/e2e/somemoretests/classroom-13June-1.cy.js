///<reference types="Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('Child Tab Handling', ()=> {

    xit("Child Tab Handling", ()=>{
        cy.visit("https://the-internet.herokuapp.com/windows");
        // cy.get(".example a").click();
        cy.get(".example a").invoke("removeAttr", 'target').click();
        cy.get("h3").contains("New Window");
        cy.wait(3000);
        cy.go(-1);
        // cy.get("[value='Upload']").click();
    })

    xit("Child Tab Handling", ()=>{
        cy.visit("https://the-internet.herokuapp.com/windows");
        // cy.get(".example a").click();
        cy.get(".example a").then((webEle)=>{
            const hrefProperty = webEle.prop("href");
            console.log("Href Property is :: " + hrefProperty);
            cy.visit(hrefProperty);
        });
        cy.get("h3").contains("New Window");
        cy.wait(3000);
        cy.go(-1);
        cy.get("h3").contains("Opening a new window");
    })

    it("Child Tab Handling", ()=>{
        const baseUrl = "https://demoqa.com";
        cy.visit("https://demoqa.com/browser-windows");
        cy.window().then((win)=>{
            cy.stub(win, 'open').callsFake((url)=>{
                console.log("New Tabs Url :: " + url);
                cy.visit(baseUrl+url);
            })
        });
        cy.get("#tabButton").click();
    })

})