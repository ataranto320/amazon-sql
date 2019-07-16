var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "vodkamysql1",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
//   connection.end();
  runSearch();
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

//     inquirer
//         .prompt([
//         {
//             type: "input",
//             name: "userInput",
//             message: "Which item would you like to buy? Type in the id number.",
//             // choices: [
//             //     1, 2, 3, 4, 5, 6, 7, 8, 9, 10
//             // ]
//         }
// ]).then(function(id){
//     console.log(id.userInput);
// });


function searchId(){
    inquirer 
        .prompt({
            type: "input",
            name: "userInput",
            message: "Which item would you like to buy? Type in the id number."
        })
        .then(function(answer){
            var query = "SELECT item_id FROM products WHERE ?"
            connection.query(query, {item_id: answer.userInput}, function(err, res){
                if (err) throw err;
                // for (var i = 0; i < res.length; i++){
                //     // console.log(userInput)
                console.log(res);
                // }
                runSearch();
            });
        });
}

function searchStock(){
    inquirer 
        .prompt({
            type: "input",
            name: "userInput",
            message: "How many units of the product would you like?"
        })
        .then(function(answer){
            var query = "SELECT stock_quantity FROM products WHERE ?"
            connection.query(query, {stock_quantity: answer.userInput}, function(err, res){
                if (err) throw err;
                // for (var i = 0; i < res.length; i++){
                //     console.log(userInput)
                // }
                console.log(res);
                runSearch();
            });
        });
}

// else {
//     console.log("Insufficient quantity!")
// };