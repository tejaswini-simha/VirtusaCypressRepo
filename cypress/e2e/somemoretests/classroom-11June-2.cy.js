/// <reference types="Cypress" />
// import testData from './../fixtures/users.json';
// import tourData from '../../fixtures/tour-data-with-childnodes-jsonarr.json';

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
    });

    describe('File Handling', ()=> {
        const filePath = "./cypress/fixtures/test_output.txt";

        // xit("Write to a File", ()=>{
        //     cy.writeFile(filePath, "Second write!", {flag:'a+'});
        //     cy.wait(3000);
        // })

        xit("Read a JSON File", ()=>{
            cy.fixture('example').then((contents)=>{
                cy.log(contents);
                expect(contents.email).contains('hello');
            })
        })

        const myObject = {
            name: 'Tejaswini',
            occupation: 'Software Engg',
            skills: ['JS, Java, Cypress']
        };

        xit("Write to a JSON File", ()=>{
            cy.writeFile('./cypress/fixtures/output.json', myObject);
            cy.wait(3000);
        })

        // const testData = [
        //     {username: 'admin', password: 'admin'},
        //     {username: 'admin', password: 'admin123'},
        //     {username: 'seema', password: 'seema'}
        // ]


        it('should login with valid credentials - user1', () => {
            // Access currentData for this test
            cy.fixture('users_copy').then((testData)=> {
                cy.log(testData);
                testData.forEach((data) => {
                    cy.visit('https://demo.guru99.com/test/newtours/index.php');
                    cy.get('input[name="userName"]').type(data.username);
                    cy.get('input[name="password"]').type(data.password);
                    // cy.get('input[type="submit"]').click();
                    // cy.get("h3").should("contain", "Login Successfully");
                    // cy.url().should('contain', 'login_sucess');
                })
            })
            console.log("typing in :: "+'admin');
            cy.get('input[name="userName"]').should('have.value', 'admin');
        })

    })
