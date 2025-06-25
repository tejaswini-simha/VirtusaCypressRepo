///<reference types="Cypress"/>
import order from "../fixtures/order.json";
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('Upload Files', ()=> {
    it('Reads a PNG File and uploads it tp PDF,co', () =>{
        const apikey = "tejaswini.simhacy@gmail.com_pBS3c80XlGzgm0sjLNammVkn9Hd0U12EQVDN71Ozg3lhYx9mPUeZ6FZE6LMhEOeK";
        cy.readFile('cypress/fixtures/w3c_home.png', 'base64').then((base64Content)=>{
            cy.request({
                method: 'POST',
                url: 'https://api.pdf.co/v1/file/upload/base64',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apikey
                },
                body: {
                    file: `data:image/png;base64,${base64Content}`,
                    name: 'uploaded_image.png'
                }
            }).then((response) => {
                cy.log(response);
                expect(response.status).equal(200);
                expect(response.body).to.have.property('url');
                cy.log("Uploaded File URL is :: " + response.body.url);
            })
        });
    })

})