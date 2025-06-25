describe('Database Retrieval Tests', () => {
    it('should retrieve a user by email', () => {
      cy.task('queryDb', "SELECT * FROM users WHERE email = 'tejaswini.simha@example.com'")
        .then((result) => {
          cy.log(result);
          expect(result).to.have.lengthOf(1);
          expect(result[0].username).to.eq('tejaswini_simha');
          cy.log(result[0].created_at);
        });
    });

    it('should retrieve all products where price > or = 500', () => {
      cy.task('queryDb', "SELECT * FROM products WHERE price >= 500")
        .then((result) => {
          expect(result).to.have.length.greaterThan(0);
        });
    });
  });
