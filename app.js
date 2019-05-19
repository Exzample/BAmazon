var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Connection Variable (how to connect with the DB)//
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Liam2012",
  database: "BAmazon"
});
