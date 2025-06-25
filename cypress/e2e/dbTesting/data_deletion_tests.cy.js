describe('Database Deletion Tests', () => {
    it('should delete a product from the catalog', () => {
      cy.task('queryDb', "DELETE FROM products WHERE product_id = 1")
        .then((result) => {
          expect(result.affectedRows).to.eq(1); // Assert that one product was deleted
        });
    });

  });
