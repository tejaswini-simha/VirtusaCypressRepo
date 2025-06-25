///<reference types="Cypress"/>

const axios = require('axios');

function asyncFunction(condition){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(condition==='resolve'){
                resolve(42);
            } else if (condition === 'reject'){
                reject(30);
            }
        }, 3000);
    });
}


// describe('Async Handling in Cypress', ()=> {
//     it("Approach 1 - Promise Handling", ()=>{
//        return asyncFunction("reject").then((responseVar)=>{
//             console.log(responseVar);
//             expect(responseVar).to.be.equal(42);
//         })
//         .catch(error =>{
//             expect(error).to.be.equal(30);
//             chai.expect.fail("Promise Rejected");
//         })
//     })

//     it("Second Approach using wrap command", ()=>{
//         cy.wrap(asyncFunction("reject")).should('equal',30);
//     })
// })

describe('Demo the use of promises returned by RestAPI Calls', ()=> {
    xit("Promise Handling", ()=>{
       const userRequest = axios.get("https://jsonplaceholder.typicode.com/users/1");
       cy.wrap(userRequest).then((response)=>{
            console.log(response);
            expect(response.status).to.equal(200);
            console.log(response.data);
            expect(response.data).to.have.property('id', 1);
            expect(response.data).to.have.property('name', "Leanne Graham");
       })

       const failedReq = axios.get("https://httpstat.us/500");
       cy.wrap(failedReq).then((response)=>{
            console.log(response);
            expect(response.status).to.equal(500);
            // console.log(response.data);
            // expect(response.data).to.have.property('id', 1);
            // expect(response.data).to.have.property('name', "Leanne Graham");
       })
    })

    it(("printing of cy command"), ()=>{
        cy.visit('http://localhost:3030/');
        const name = cy.get('#new-todo').invoke('attr', 'placeholder');
        cy.log(name);
    })
})
