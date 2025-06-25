///<reference types="Cypress"/>

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('API Testing of mockapis', ()=> {
    it("Get List of Trainees", ()=>{
        cy.request('GET', 'https://jsonplaceholder.typicode.com/users/')
            .then((response) => {
                console.log(response);
                expect(response.status).equal(200);
                expect(response.body[3].address.geo.lat).to.contain('29.4572');
            });
    })

    it("Get List of Trainees", ()=>{
        cy.request('GET', 'https://674866bc5801f5153590b33e.mockapi.io/MyCypressTrng/Trainees/17')
            .then((response) => {
                console.log(response);
                // expect(response.status).equal(200);
            });
    })

    xit("Create A Trainee", ()=>{
        cy.request('POST', 'https://674866bc5801f5153590b33e.mockapi.io/MyCypressTrng/Trainees')
            .then((response) => {
                console.log(response);
                expect(response.status).equal(201);
                expect(response.body).has.property("id");
                expect(response.body.id).not.empty;
                cy.log("The generated Trainee's id is :: " + response.body.id);
                cy.log("The generated Trainee's name is :: " + response.body.firstName);
            });
    })

    xit("Update A Trainee", ()=>{
        cy.request('PUT', 'https://674866bc5801f5153590b33e.mockapi.io/MyCypressTrng/Trainees/17', {email: "Justin.XYZ@email.com"})
            .then((response) => {
                console.log(response);
                expect(response.status).equal(200);
            });
    })

    xit("Delete A Trainee", ()=>{
        cy.request('DELETE', 'https://674866bc5801f5153590b33e.mockapi.io/MyCypressTrng/Trainees/17')
            .then((response) => {
                console.log(response);
                expect(response.status).equal(200);
            });
    })

})