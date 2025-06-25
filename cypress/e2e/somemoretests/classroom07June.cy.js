///<reference types="Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
});

describe('Basic CYpress Actions', ()=> {

    // beforeEach(()=>{
    //     cy.visit('http://localhost:3000/productReviewPage-Copy.html');
    // })

   xit("Grabbing Text", ()=>{
        cy.contains("Product Blog");
        cy.get("h1").should("contain", "Product Blog");
        cy.get("button").then((webElements)=>{
            cy.log(webElements);
            cy.log("Text is :: " + webElements.text());
            cy.log(webElements[0]);
            cy.log("innerHtml :: " + webElements[0].innerHTML);
            cy.log("innerText :: " + webElements[0].innerText);
            cy.log("outerHtml :: " + webElements[0].outerHTML);
            cy.log("outerText :: " + webElements[0].outerText);
            cy.log("textContent :: " + webElements[0].textContent);
        })
        cy.get("h1").invoke("text").then((textVal)=>{
            cy.log("Text Value is :: " + textVal);
        })
    })

    xit("Placeholder vlaues", ()=>{
        cy.visit("https://www.lambdatest.com/selenium-playground/input-form-demo");
        cy.get("input#name").invoke("attr", "placeholder").then((placeHolderVal)=>{
            cy.log("Placeholder value is :: " + placeHolderVal);
        })

        // cy.get("input#name").type("tejaswini").invoke('prop', 'val').then((val)=>{
        //     cy.log("Value is :: " + val);
        // })

        cy.get("input#name").type("Tejaswini");
        cy.get("input#name").invoke("prop", "value").then((valueValue)=>{
            cy.log("value's Value is :: " + valueValue);
        })
        cy.get("input#name").invoke("val").then((valueValue)=>{
            cy.log("value's Value is :: " + valueValue);
        })

        // cy.get("input#name").then((webElements)=>{
        //     cy.log(webElements);
        // })
        // cy.get("input#name").invoke("attr", "val").then((inputVal)=>{
        //     cy.log("Input value is :: " + inputVal);
        // })
    })

    it("Style Checks", () => {
        cy.visit("https://www.w3schools.com/html/html_css.asp");
        cy.xpath("//h1[contains(.,'Colors')]//following-sibling::div/span").invoke("attr","style").then((styleVal)=>{
            cy.log("Style is :: " + styleVal);
            expect(styleVal).to.contain("color:#ffffff");
        })
        // cy.xpath("//h1[contains(.,'Colors')]//following-sibling::div/span").should('have.attr', 'style', "background-color:#B4009E;color:#ffffff;");
    })
})