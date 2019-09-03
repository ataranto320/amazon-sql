var mysql = require("mysql");
var inquirer = require("inquirer");
require(console.table);

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  //   connection.end();
    managerList();
  });

  // function to load products
function managerList(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res);
        managerOptions();
    })
}

function managerOptions() {
    inquirer
        .prompt({
            type: "list",
            name: "input",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            message: "Choose between:"
        })
        .then(function(answer){
            switch(answer.choice) {
                case "View Products for Sale":
                    managerList();
                    break;
                case "View Low Inventory":
                    lowInv();
                    break;
                case "Add to Inventory":
                    addInv();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
            }
        });
};

function lowInv() {
    connection.query("SELECT * FROM products WHERE stock_quantity <= 3", function(err, res){
        if (err) throw err;
        console.log(res);
        managerList(res);
    });
}

function addInv() {
    inquirer
        .prompt({
            type: "add",
            name: "input",
            message: "What is the product you want to add to inventory?"
        })
        .then(function(answer){
            var product = checkInv(item_id, stock_quantity);
            if (product) {
                promptQuantity(product);
            } else {
                managerList();
            }
        });
}

// function promptQuantity() {
//     inquirer
//         .prompt({
//             type: "prompt",
//             name: "quantity",
//             message: "How many do you want to add?"
//         })
//         .then(function(answer){
//              addQuantity(products, stock_quantity);
//         });
// }

// addQuantity(product, stock_quantity); {
//     connection.query("UPDATE products SET stock_quantity = ? WHERE id = ?"),
//     function(err, res) {
//         managerList();
//     }
// }

function addNewProduct() {
    connection.query("INSERT INTO products [item_id, product_name, department_name, price, stock_quantity] VALUES [?, ?, ?, ?, ?"),
    function(err, res) {
        if (err) throw err;
        managerList();
    };
}



