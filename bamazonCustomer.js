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
            message: "Which item would you like yo buy? Type in the id number."
        }
    ]).then(function(id){
        console.log(id.userInput);
    });