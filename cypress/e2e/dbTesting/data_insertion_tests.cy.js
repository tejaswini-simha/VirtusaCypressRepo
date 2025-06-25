describe('Database Insertion Tests', () => {
    it('should insert a new user', () => {
      cy.task('queryDb', "INSERT INTO users (username, email, password) VALUES ('tejaswini_simha', 'tejaswini.simha@example.com', 'password789')")
        .then((result) => {
          expect(result.affectedRows).to.eq(1); // Assert that one row is inserted
        });
    });

    it('should insert a new product', () => {
      cy.task('queryDb', "INSERT INTO products (name, description, price, stock_quantity) VALUES ('Tablet', 'High-end tablet', 500.00, 30)")
        .then((result) => {
          expect(result.affectedRows).to.eq(1); // Assert that one row is inserted
        });
    });
  });
