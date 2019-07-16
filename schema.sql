DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NULL,
department_name VARCHAR (100) NULL,
price INT NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("ps4", "electronics", 300, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("xbox one", "electronics", 300, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("switch", "electronics", 300, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("quip", "household", 40, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("towels", "bath", 20, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("blender", "kitchen", 60, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("laptop", "electronics", 1000, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tv", "electronics", 2000, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chocolate", "food", 2, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("knifes", "household", 50, 300);

SELECT * FROM products;