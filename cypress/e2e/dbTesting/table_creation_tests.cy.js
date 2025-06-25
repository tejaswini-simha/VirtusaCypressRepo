describe('Table Creation Tests', () => {
    it('should create the required tables', () => {
      cy.task('queryDb', "CREATE TABLE users (user_id INT PRIMARY KEY AUTO_INCREMENT,username VARCHAR(50) NOT NULL,email VARCHAR(100) NOT NULL UNIQUE,password VARCHAR(255) NOT NULL,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);")
        .then((result) => {
          cy.log(result);
          expect(result.message).equal("");
      });
      cy.task('queryDb', "CREATE TABLE products (product_id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(100) NOT NULL,description TEXT,price DECIMAL(10, 2) NOT NULL,stock_quantity INT DEFAULT 0,created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);")
        .then((result) => {
          expect(result.message).equal("");
      });
        cy.task('queryDb', "CREATE TABLE orders (order_id INT PRIMARY KEY AUTO_INCREMENT,user_id INT,order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,status VARCHAR(50) DEFAULT 'Pending',total_amount DECIMAL(10, 2) NOT NULL,FOREIGN KEY (user_id) REFERENCES users(user_id));")
        .then((result) => {
          expect(result.message).equal("");
      });
        cy.task('queryDb', "CREATE TABLE order_items (order_item_id INT PRIMARY KEY AUTO_INCREMENT,order_id INT,product_id INT,quantity INT NOT NULL,price DECIMAL(10, 2) NOT NULL,FOREIGN KEY (order_id) REFERENCES orders(order_id),FOREIGN KEY (product_id) REFERENCES products(product_id));")
        .then((result) => {
          expect(result.message).equal("");
      });
    });
  });
