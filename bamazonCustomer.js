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
  connection.end();
});

inquirer
    .prompt([
        {
            type: "input",
            name: "userInput",
            message: "Which item would you like to buy? Type in the id number.",
            choices: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10
            ]
        }
    // .prompt([{
    //         type: "input",
    //         name: "userInput",
    //         message: "How many units would you like to buy?"
    // }
    // ])
    ]).then(function(id){
        console.log(id.userInput);
    });