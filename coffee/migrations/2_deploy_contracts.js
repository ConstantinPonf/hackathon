var CoffeeExchange = artifacts.require("CoffeeExchange");
var CoffeeBuggy = artifacts.require("CoffeeBuggy");
module.exports = function(deployer) {
  deployer.deploy(CoffeeBuggy);
  deployer.deploy(CoffeeExchange);
  
};