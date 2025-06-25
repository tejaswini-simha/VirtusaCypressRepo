describe("DB Connection tests", () => {
    it("Query From Table", ()=>{
        cy.task("queryDb",`select * from ip_auto_01.testdata where DataSet = 'NAT_001';`).then((rows) => {
            rows.forEach(row => {
                for (const key in row) {
                    if (row.hasOwnProperty(key)) {
                      const value = row[key];
                      cy.log(key + " : " +value);
                    }
                }
            });
        });
    })
})