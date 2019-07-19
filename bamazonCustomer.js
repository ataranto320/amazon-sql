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
            var query = "UPDATE products SET stock_quantity = ? WHERE id = ?"
            // var query = "UPDATE stock_quantity FROM products WHERE stock_quntity = answer.userInput"
            // var sql = "UPDATE products SET completed ? WHERE stock_quantity ?"
            connection.query(query, [ answer.userInput ], {itme_id}, function(err, res){
            // connection.query(query, {"UPDATE stock_quantity FROM products WHERE stock_quantity ?"}, function(err, res){
                if (err) throw err;
                // for (var i = 0; i < res.length; i++){
                //     console.log(userInput)
                // }
                console.log(res);

                // var query = connection.query(
                //     "UPDATE products SET stock_quantity = ? WHERE id = ?",
                //     [
                //         {
                //             quantity: 200
                //         },
                //         {
                //             item_id: 7
                //         }
                //     ],
                //     fucntion(err, res), {
                //         if (err) {throw err};
                //         console.log(res);
                //     }
                // )
                
                runSearch();
            });
        });
        // connection.end();
}

// else {
//     console.log("Insufficient quantity!")
// };