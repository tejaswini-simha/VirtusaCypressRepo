///<reference types="Cypress"/>
import order from "../fixtures/order.json";
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('Download Files', ()=> {
    it("Get Auth Token", () => {
        const fileDownloadUrl= "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";
        const downloadPath = "cypress/downloads/dummy.pdf";
        cy.request({
            method: 'GET',
            url: fileDownloadUrl,
            encoding: 'binary'
        }).then((response)=>{
            cy.log(response);
            expect(response.status).equal(200);
            cy.writeFile(downloadPath,response.body, {encoding:'binary'});
            cy.wait(2000);
        })
    })
})
