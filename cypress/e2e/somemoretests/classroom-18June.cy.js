///<reference types="Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('API Testing for weathermap using the appid', ()=> {
    it("Get Request using the authorization type as API Key", () => {
        cy.request({
            method: 'GET',
            url: 'api.openweathermap.org/data/2.5/weather',
            qs: {
                APPID: '9bc1f96a4508c0ce1cc8aa6ab737a566',
                q: 'London,UK'
            }
        }).then((response)=>{
            cy.log(response);
            expect(response.status).equal(200);
            expect(response.body.coord.lon).equal(-0.1257);
        })
    })
})
