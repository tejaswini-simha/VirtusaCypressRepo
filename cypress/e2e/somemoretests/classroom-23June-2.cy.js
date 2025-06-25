///<reference types="Cypress"/>
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

describe('Intercept Network Requests', ()=> {
    xit("Spy a network call", () =>{
        cy.intercept("POST", "http://localhost:3030/todos").as("new-todo");
        cy.visit("http://localhost:3030");
        cy.get('#new-todo').type("Something" + Math.random().toString().substring(10) + "{enter}");
        cy.wait('@new-todo').then((resObject)=>{
            console.log("Response Object is :: " + resObject);
            cy.log("ID Code is :: " + resObject.response.body.id);
            Cypress.env("TodoId", resObject.response.body.id);
        })
    })

    xit("Delete the just created todo from API", ()=>{
        cy.request('DELETE', "http://localhost:3030/todos/"+ Cypress.env("TodoId")).then((response)=>{
            cy.log(response);
        })
    })

    it('Stub a response thru a fixture file', ()=>{
        cy.intercept("GET", "http://localhost:3030/todos", ({fixture:"todoslist"})).as('getTodosStubbed');
        cy.visit("http://localhost:3030/");
        cy.wait(10000);
    })
})

