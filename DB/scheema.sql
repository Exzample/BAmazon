DROP DATABASE IF EXISTS BAmazon;
CREATE DATABASE BAmazon;

USE BAmazon;

CREATE TABLE products
(
  item_id INT
  AUTO_INCREMENT NOT NULL,
  product_name VARCHAR
  (45) NOT NULL,
  department_name VARCHAR
  (45) NOT NULL,
  price DECIMAL
  (10,2) NOT NULL,
  stock_quantity INT
  (10) NOT NULL,
  primary key
  (item_id)
);

  SELECT *
  FROM products;

  
