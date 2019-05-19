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

// TODO On connection the app should prompt the users with two messages//
// ! What is the ID of the product you would like to buy //
// ! Should ask how many units of the product they would like to buy //
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  getProducts();
});

function getProducts() {
  let query = connection.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("There was an error, Products did not load");
    }
    console.log(query.sql);
    console.table(res);
    itemPrompt();
  });
}

function itemPrompt(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message:
          "What is the ID of the item you would like to purchase? [Quit with Q]",
        validate: val => {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(val => {
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      if (product) {
        qtyPrompt(product);
      } else {
        console.log("That item is not available");
        getProducts();
      }
    });
}

// Prompt the customer for a product quantity
function qtyPrompt(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like?",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      var quantity = parseInt(val.quantity);
      // If there isn't enough of the chosen product and quantity, let the user know and re-run loadProducts
      if (quantity > product.stock_quantity) {
        console.log("\nInsufficient quantity!");
        loadProducts();

      } else {
        // Otherwise run makePurchase, give it the product information and desired quantity to purchase
        makePurchase(product, quantity);
      }
    });
}

// Check to see if the product the user chose exists in the inventory
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If a matching product is found, return the product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
}
/* Need to Create the following functions:
  getProducts(); Gets all products from the products table;
  Prompt user to make selection; "what would you like to buy"
  prompt user for quantity; "how many would you like to buy"
  Prompts should have validation;
    cases: user picks product ID that is not available
           user wants to buy more products than available
           user choice to continue shopping or quit
  checkInventory(); SELECT stock_quantity FROM products WHERE id = @userChoice
  makePurchase(); UPDATE TABLE products SET stock_quantity = (current_qty-@userAmount) WHERE item_id = @userChoice;
