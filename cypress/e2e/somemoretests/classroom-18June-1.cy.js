///<reference types="Cypress"/>
import order from "./../fixtures/order.json";
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('Testing Simple Books Glitch API', ()=> {
    let accessToken = "";
    xit("Get Auth Token", () => {
        cy.request({
            method: 'POST',
            url: 'simple-books-api.glitch.me/api-clients',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "clientName": "MyVirtusa1228",
                "clientEmail": "MyVirtusa1228@gmail.com"
            }
        }).then((response)=>{
            cy.log(response);
            expect(response.status).equal(201);
            expect(response.body.accessToken).to.not.be.empty;
            cy.log("AccessToken is :: " + response.body.accessToken);
            accessToken=response.body.accessToken;
            cy.wrap(accessToken).as('accTkn');
            console.log("Inside the then block access Token is :: "+accessToken); //Value will be there
        })
        console.log("Outside the then block, access token is :: "+ accessToken); // Here access token will be empty
        cy.get('@accTkn').then((accTkn)=>{
            console.log("Access Token retrieved from alias :: "+accTkn); // This will have value
        })
    })

    it("Book Order", () => {
        accessToken="8c38d5f8a0948ff958bd7f7ac769a1f62d43cc28c66c5e926cd952653098ebc0";
        // cy.fixture("order").then((order)=>{
            cy.log(order);
            cy.log("Access Token in next test is :: " + accessToken); // accessToken will have value
            cy.request({
                method: 'POST',
                url: 'simple-books-api.glitch.me/orders/',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+accessToken
                },
                body: order
            }).then((response)=>{
                cy.log(response);
                expect(response.status).equal(201);
                expect(response.body.orderId).not.to.be.empty;
                // expect(response.body.accessToken).to.not.be.empty;
                // cy.log("orderId is :: " + response.body.orderId);
                // accessToken=response.body.accessToken;
            })
        // })
    })
})
