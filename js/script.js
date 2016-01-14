

//use object constructor to create Product prototype
var Product = function(name, price, material, weight) {
  this.name = name;
  this.price = price;
  this.material = material;
  this.weight = weight;

    this.sayWeight = function(product){
    return "This product weighs " + Product.weight + " pounds.";
  }
}


//use object constructor to create store prototype
var Store = function(name, location) {

  this.name = name;
  this.location = location;
  this.products = [];
  this.cashRegister = 100;

  this.sayStore = function(){
    return "You are currently shopping in " + this.name + " in " + this.location;
  }

  //add each product to products[]

  this.addProduct = function(product){
    this.products.push(product);
  }

  //iterate through products to create inventory
  this.inventory = function(){
    for (i = 0; i < this.products.length; i++) {
      console.log(this.products[i].name);
    }
  }

  this.purchase = function(product) {
    this.cashRegister += product.price;
    var index = this.products.indexOf(product);
    this.products.splice(index, 1);
  }
}


//use object constructor to create customer prototype
var Customer = function(name, cashMoney) {

  this.name = name;
  this.cashMoney = cashMoney;
  this.shoppingBag = [];

  this.introduction = function(){
    return "Hi my name is " + this.name + " and I have $" + this.cashMoney + " in my wallet.";
  }

  //add product to customer's shopping bag
  this.addToShoppingBag = function(product){
    this.shoppingBag.push(product);
    return "I have added a " + product.name + " to my shopping bag."
  }
}
