///<reference types="Cypress"/>

// describe('Retrieve text from wikipedia', ()=> {
//     let textFldValue="";
//     it("Capture the Iamge Text", ()=>{
//         cy.visit("https://www.wikipedia.org/");
//         cy.get("h1 span.central-textlogo__image").invoke("text").then((textVal)=>{
//             textFldValue = textVal;
//             cy.log("Image Logo Text is (inside the callback):: " + textFldValue);
//         })
//         cy.log("outside of callback :: " +  textFldValue);
//     })

//     it("Next Test - Text Fld Value - Check", ()=>{
//         cy.log("inside 2nd test :: Text Fld Value is :: " +  textFldValue);
//     })
// })

describe('Accessing text fields inside the test', ()=> {
    it("Capture the Iamge Text", ()=>{
        cy.visit("https://www.wikipedia.org/");
        cy.get("h1 span.central-textlogo__image").invoke("text").then((textVal)=>{
            const textFldValue = textVal;
            cy.log("Image Logo Text is (inside the callback):: " + textFldValue);
            cy.wrap(textFldValue).as('savedHeaderText');
            Cypress.env('passedData', textFldValue);
        })
        // cy.log("outside of callback :: " +  textFldValue);
        cy.get("@savedHeaderText").then((savedHeaderText)=>{
            cy.log("Saved Header from prev callback is :: " + savedHeaderText);
        })
    })

    it("Next Test - Check Alias Value", ()=>{
        // cy.log("inside 2nd test :: Text Fld Value is :: " +  textFldValue);
        // cy.get("@savedHeaderText").then((savedHeaderText)=>{
        //     cy.log("Saved Header from prev test is  :: " + savedHeaderText);
        // })
        cy.log("Retrieved via Cypress env variable :: "+ Cypress.env("passedData"));
    })

})