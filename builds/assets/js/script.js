
  var customers = [];
  var stores = [];
  var select;
  var selectStore;

$(document).ready(function() {

  //create new instances of Customer prototype
  var natasha = new Customer("Natasha", "30.00");
  addCustomer(natasha);
  var flip = new Customer("Flip", "15.00");
  addCustomer(flip);
  var becca = new Customer("Becca", "77.25");
  addCustomer(becca);

  //create new instances of Store prototype
  var target = new Store("Target", "Richmond");
  addStore(target);
  var nordstrom = new Store("Nordstrom", "Richmond");
  addStore(nordstrom);
  var kroger = new Store("Kroger", "Richmond");
  addStore(kroger);

  //create new instances of Product prototype
  var mug = new Product("mug", "3.00", "ceramic", "0.25");
  addProduct(mug);
  var book = new Product("book", "7.99", "paper", "1.00");
  addProduct(book);
  var pen = new Product("pen", "1.00", "plastic", "0.10");
  addProduct(pen);


  //user adds new customer
  $(".customers-container").on("click", ".add-customer", function() {
    var newCustomerName = prompt("Please enter your name");
    var newCustomerWallet = prompt("Please enter the amount in your wallet");
    var newCustomer = new Customer(newCustomerName, newCustomerWallet);
    addCustomer(newCustomer);
  });

  //dynamically populate customers table
  function addCustomer(customer) {
    $("#customers > tbody:last-child").append("<tr><td>" + customer.name + "</td><td>" + customer.cashMoney + "</td><td><button class='btn btn-default select'>Select</button></td></tr>");
    customers.push(customer);
  }

  //user selects customer
  $("#customers").on("click", ".select", function() {
    for (var i = 0; i < customers.length; i++) {
      if ($(this).parent().siblings()[0].innerHTML == customers[i].name) {
        select = customers[i];
      }
    }
    confirm();
  });

  //confirm selected customer
  function confirm(){
    var msg = "Are you " + select.name + "?";
    var div = $("<div>" + msg + "</div>");
    div.dialog({
      buttons: [
        {
          text: "Yes",
          click: function () {
            $(".customers-container button").css("display", "none");
            console.log(select);
            div.dialog("close");
          }
        },
        {
          text: "No",
          click: function () {
            select = {};
            div.dialog("close");
          }
        }
      ]
    });
  }


  //dynamically add store
  function addStore(store) {
    $("#stores > tbody:last-child").append("<tr><td>" + store.name + "</td><td>" + store.location + "</td><td><button class='btn btn-default'>Select</button></td></tr>");
    stores.push(store);
  }

  //user selects store
  $("#stores").on("click", "button", function() {
    for (var i = 0; i < stores.length; i++) {
      if ($(this).parent().siblings()[0].innerHTML == stores[i].name) {
        selectStore = stores[i];
      }
    }
    confirmStore();
  });

  //confirm selected store
  function confirmStore(){
    var msg = "Do you select " + selectStore.name + "?";
    var div = $("<div>" + msg + "</div>");
    div.dialog({
      buttons: [
        {
          text: "Yes",
          click: function () {
            $("#stores button").css("display", "none");
            console.log(selectStore);
            div.dialog("close");
          }
        },
        {
          text: "No",
          click: function () {
            selectStore = {};
            div.dialog("close");
          }
        }
      ]
    });
  }


  //dynamically add product
  function addProduct(product) {
    $("#products > tbody:last-child").append("<tr><td>" + product.name + "</td><td>" + product.price + "</td><td>" + product.material + "</td><td>" + product.weight + "<td><button class='btn btn-default'>Add to Cart</button></td></tr>");
  }

  //user selects product
  $("#products").on("click", "button", function() {
    console.log("product select");
  });


  //use object constructor to create customer prototype
  function Customer(name, cashMoney) {

    this.name = name;
    this.cashMoney = cashMoney;
    this.shoppingBag = [];

    this.introduction = function() {
      return "Hi my name is " + this.name + " and I have $" + this.cashMoney + " in my wallet.";
    };

    //add product to customer's shopping bag
    this.addToShoppingBag = function(product) {
      this.shoppingBag.push(product);
      return "I have added a " + product.name + " to my shopping bag.";
    };

    this.itemsInShoppingBag = function() {
      var shoppingBagLength = this.shoppingBag.length;
      for (i = 0; i < shoppingBagLength; i++) {
        console.log(this.shoppingBag[i].name);
      }
    };

    this.purchase = function(product) {
      this.cashMoney -= Product.price;
      return "I have $" + this.cashMoney + " remaining in my wallet.";
    };
  }


  //find product amount of one product and then create function that calls that function on all the products  indexOf  if store is out of product or customer out of money, don't allow purchase

  //use object constructor to create Product prototype
  function Product(name, price, material, weight) {
    this.name = name;
    this.price = price;
    this.material = material;
    this.weight = weight;

    this.sayWeight = function(product) {
      return "This product weighs " + Product.weight + " pounds.";
    };
  }


  //use object constructor to create store prototype
  function Store(name, location) {

    this.name = name;
    this.location = location;
    this.products = [];
    this.cashRegister = 100;

    this.sayStore = function() {
      return "You are currently shopping in " + this.name + " in " + this.location;
    };

    //add each product to products[]

    this.addProduct = function(product) {
      this.products.push(product);
    };

    //iterate through products to create inventory
    this.inventory = function() {
      for (i = 0; i < this.products.length; i++) {
        console.log(this.products[i].name);
      }
    };

    this.purchase = function(product) {
      this.cashRegister += product.price;
      var index = this.products.indexOf(product);
      this.products.splice(index, 1);
    };
  }


  var transaction = function(store, customer, product) {
    store.purchase(product);
    customer.purchase(product);
  };

});
