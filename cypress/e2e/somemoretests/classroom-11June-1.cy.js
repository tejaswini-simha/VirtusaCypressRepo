///<reference types="Cypress"/>

describe('File Handling', ()=> {
    const constantFilePath = "./cypress/fixtures/generated_files/";
    const dirPath = "./cypress/fixtures/generated_file/newDir";
    xit("Should write into a file", ()=>{
        cy.writeFile(constantFilePath+"/write_into_file_test1.txt", "First Write!");
    })

    xit("Append into a file", ()=>{
        cy.writeFile(constantFilePath+"/write_into_file_test1.txt",'Fourth Write!', {flag:'a+'});
    })

    xit("Reading the just written file", ()=>{
        cy.readFile(constantFilePath+"/write_into_file_test1.txt").then((text)=>{
            cy.log("File contents :: " + text);
        })
        cy.readFile(constantFilePath+"/write_into_file_test1.txt").should("contain", "First Write");
    })

    xit("Read FIle as a fixture", ()=>{
        cy.fixture("/generated_files/write_into_file_test1.txt").then((text)=>{
            cy.log("File contents is :: " + text);
        })
    })

    xit("Appending to an existing file", ()=>{
        cy.writeFile(constantFilePath+"/write_into_file_test1.txt", "\nAppending to the existing file - Fifth write!", {flag:'a+'});
        cy.readFile("./cypress/fixtures/generated_files/write_into_file_test1.txt").should("contain","Fifth write!" );
        cy.fixture("./generated_files/write_into_file_test1.txt").should("contain","Fifth write!" );
        cy.writeFile(constantFilePath+"/write_into_file_test1.txt", "\nAppending to the existing file - Sixth write!", {flag:'a+'});
        cy.readFile("./cypress/fixtures/generated_files/write_into_file_test1.txt").should("contain","Sixth write!" );
        cy.fixture("./generated_files/write_into_file_test1.txt").should("contain","Sixth write!" ); //Demonstratest that the fixture file is loaded only once.
    })

    xit("reading package.json", ()=>{
        cy.fixture("../../package.json").then((metadata) =>{
            cy.log("File Contents :: " + metadata);
            expect(metadata).to.have.property("name");
            expect(metadata.devDependencies).to.have.property("cypress");
        })
        cy.readFile("package.json").should('have.property', 'devDependencies').and('have.property', 'cypress');
    })

    it('Shud create a mew directory', ()=>{
        cy.task('createDir', dirPath);
    })

    it('Shud delete a directory', ()=>{
        cy.task('deleteDir', dirPath);
    })
})