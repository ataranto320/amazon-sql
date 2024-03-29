var mysql = require("mysql");
var inquirer = require("inquirer");
// require(console.table);

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
//   runSearch();
  load();
});

function runSearch(){
    inquirer
        .prompt([
        {
            type: "input",
            name: "userInput",
            message: "What do you want to do?",
            choices: [
                "Find item id number",
                "Find stock quantity."
            ]
        }
    ]).then(function(answer){
        console.log(answer.userInput);
        switch(answer.userInput){
            case "Find item id number":
                searchId();
                break;

            case "Find stock quantity":
                searchStock();
                break;
        }
    });
}

// function to load products
function load(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err) throw err;
        console.table(res);
        searchId();
    })
}


function searchId(){
    inquirer 
        .prompt({
            type: "input",
            name: "userInput",
            message: "Which item would you like to buy? Type in the id number."
        })
        .then(function(answer){
            console.log(answer)
            // var answer = checkInv(answer.stock_quantity)
            var query = "SELECT stock_quantity FROM products WHERE ?"
            connection.query(query, {item_id: answer.userInput}, function(err, res){
                if (err) throw err;
                if (answer) {
                    searchStock();
                } else {
                    console.log("This id number has no value.");
                }
                console.log(res);
                
                runSearch();
            });
        });
    };

// update statement
// var sql = ["UPDATE products SET completed ? WHERE stock_quantity? "]

function searchStock(){
    inquirer 
        .prompt({
            type: "input",
            name: "userInput",
            message: "How many units of the product would you like?"
        })
        .then(function(answer){
            var quantity = (answer.quantity);
            // var query = "UPDATE products SET stock_quantity = ? WHERE id = ?"
            // var query = "UPDATE stock_quantity FROM products WHERE stock_quntity = answer.userInput"
            // var sql = "UPDATE products SET completed ? WHERE stock_quantity ?"
            // connection.query(query, [ answer.userInput ], function(err, res){
            var query = "UPDATE stock_quantity FROM products WHERE stock_quantity ?"
            connection.query(query, {stock_quantity: answer.userInput}, function(err, res){
                if (err) throw err;
                if (quantity > answer.stock_quantity) {
                    console.log("Insufficient quantity.");
                    runSearch();
                } else {
                    purchase(answer, quantity);
                }
                // for (var i = 0; i < res.length; i++){
                //     console.log(userInput)
                // }
                console.log(res);

                runSearch();
            });
        });
}
        // connection.end();
 function purchase(answer, quantity) {
     connection.query(
         "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
         [quantity, answer.id], fucntion(err, res),
            console.log("Purchase fulfilled! " + quantity + " " ,answer.answer.item_id),
            runSearch()
     )
 };

function checkInv(stock_quantity) {
    for (var i = 0; i < stock_quantity.length; i++) {
        if (stock_quantity[i].id === answer) {
            return stock_quantity[i];
        }
    }
    return null;
}


