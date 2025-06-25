describe('Table Creation Tests', () => {
    it('should create the drop the tables', () => {
        cy.task('queryDb', "DROP TABLE order_items")
        .then((result) => {
            expect(result.message).equal("");
        });
        cy.task('queryDb', "DROP TABLE orders")
        .then((result) => {
            expect(result.message).equal("");
        });
        cy.task('queryDb', "DROP TABLE products")
            .then((result) => {
            expect(result.message).equal("");
        });
        cy.task('queryDb', "DROP TABLE users")
        .then((result) => {
            expect(result.message).equal("");
        });
    });
  });
