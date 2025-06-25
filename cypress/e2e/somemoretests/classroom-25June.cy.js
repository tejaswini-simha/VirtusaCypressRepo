///<reference types="Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('Client Certificate Handling', ()=> {
    it('Test badssl client with the cert and key', ()=>{
        cy.request({
            url: "/",
            method: 'GET'
        }).then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body).to.include('badssl.com');
        })
    })
})