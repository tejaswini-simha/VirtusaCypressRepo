describe("Demoing the asynchronicity of the cy statements", () => {
    let intrsprEg = "Nothing";
    console.log("Value of the variable intrsprEg :: " + intrsprEg);
    it("Console log statements & cypress statements together", () => {
         console.log("First statement in the it block without wrap :: " + intrsprEg);
        cy.wrap(intrsprEg).then((wrappedIntrsprEg) =>{
          console.log("First statement in the it block wrappedValue " + wrappedIntrsprEg);
        })
        cy.visit("https://www.wikipedia.org");
        cy.get("h1 span.central-textlogo__image").invoke("text").then((textVal) => {
            intrsprEg = textVal;
            console.log("After fetching header text intrsprEg is :: " + intrsprEg);
            let subStrOfIntrSprsEg = intrsprEg.substring(5);
            console.log(subStrOfIntrSprsEg);
            // cy.wrap(intrsprEg).as('wrappedIntrsprEg');
        })
        console.log("After wiki call " + intrsprEg);
        cy.wrap("SimplyAnything").then((wrappedvalue) =>{
            console.log("Last statement in the it block wrapping anything " + intrsprEg);
        })
        cy.wrap(intrsprEg).then((wrappedIntrsprEg) =>{
          console.log("Last statement in the it block wrappedValue " + wrappedIntrsprEg);
          console.log("Last statement in the it block intrsprEg's value " + intrsprEg);
        })
        // cy.get('@wrappedIntrsprEg').then((newIntrsprEg)=>{
        //   console.log("Last last statement in the it block, alias of intrsprEg value is :: " + newIntrsprEg);
        // })
        console.log("Last statement in the it block without wrap :: " + intrsprEg);
    })
})