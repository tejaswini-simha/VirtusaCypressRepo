describe('Database Update Tests', () => {
    xit('should update the order status to "Shipped"', () => {
      cy.task('queryDb', "UPDATE orders SET status = 'Shipped' WHERE order_id = 1")
        .then((result) => {
          expect(result.affectedRows).to.eq(1); // Assert that one row is updated
        });
    });

    it('should reduce product stock after an order', () => {
      cy.task('queryDb', "UPDATE products SET stock_quantity = stock_quantity - 1 WHERE product_id = 1")
        .then((result) => {
          expect(result.affectedRows).to.eq(1); // Assert that stock is reduced
        });
    });
  });
