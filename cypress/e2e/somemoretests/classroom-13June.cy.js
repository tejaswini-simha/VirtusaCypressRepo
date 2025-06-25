///<reference types="Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('File Upload/Download', ()=> {
    xit("File Upload Test", ()=>{
        cy.visit("https://the-internet.herokuapp.com/upload");
        cy.get("#file-upload").selectFile("./cypress/fixtures/dummy-image1.jpg", {action: 'select'});
        cy.wait(3000);
        cy.get("[value='Upload']").click();
    })

    xit("File Upload Test Drag Drop", ()=>{
        cy.visit("https://the-internet.herokuapp.com/upload");
        cy.get("#drag-drop-upload").selectFile(["./cypress/fixtures/dummy-image1.jpg", "./cypress/fixtures/dummy-image.jpg"], {action: 'drag-drop'});
        cy.wait(3000);
        // cy.get("[value='Upload']").click();
    })

    it("File Download", ()=>{
        cy.visit("https://demoqa.com/upload-download");
        cy.get("#downloadButton").click();
        cy.wait(3000);
        cy.readFile("./cypress/downloads/sampleFile.jpeg", "binary", {timeout:15000}).should((buffer)=>{
            expect(buffer.length).to.be.gt(0);
        })
        // cy.get("[value='Upload']").click();
    })



})