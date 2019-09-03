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
}