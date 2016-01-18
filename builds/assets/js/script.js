
  var customers = [];
  var stores = [];
  var products = [];
  var select = {};
  var selectStore = {};
  var selectProduct = {};

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
    $("#customers > tbody:last-child").append("<tr><td>" + customer.name + "</td><td>" + customer.wallet + "</td><td><button class='btn btn-default select'>Select</button></td></tr>");
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

  //user confirms selected customer
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
            showProducts();
            welcomeCustomer();
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

  //welcome customer added to nav
  function welcomeCustomer() {
    $("nav li:first").html("Hi " + select.name + "!");
  }


  //dynamically add store
  function addStore(store) {
    $("#stores > tbody:last-child").append("<tr><td>" + store.name + "</td><td>" + store.location + "</td><td><button class='btn btn-default'>Select</button></td></tr>");
    stores.push(store);
  }

  //user selects store
  $("#stores").on("click", "button", function() {
    for (var i = 0; i < stores.length; i++) {
      var store = stores[i];
      if ($(this).parent().siblings()[0].innerHTML == store.name) {
        selectStore = store;
      }
    }
    confirmStore();
  });

  //user confirms selected store
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
            showProducts();
            welcomeStore();
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

  //welcome to store added to nav
  function welcomeStore() {
    $("nav li:nth-child(2)").html("Welcome to " + selectStore.name + ".");
  }


  //show products container when a customer and store have been selected and hide customers and stores
  function showProducts() {
    if (jQuery.isEmptyObject(select) === false && jQuery.isEmptyObject(selectStore) === false) {
      $(".customers-store-container").css("display", "none");
      $(".products-container").css("display", "block");
      cartAvailable();
    }
  }

  //dynamically add product
  function addProduct(product) {
    $("#products > tbody:last-child").append("<tr><td>" + product.name + "</td><td>" + product.price + "</td><td>" + product.material + "</td><td>" + product.weight + "</td><td><button class='btn btn-default'>Add to Cart</button></td></tr>");
    products.push(product);
  }

  //dynamically add Your Cart button to nav
  function cartAvailable() {
    $("nav li:last").append("<button class ='btn btn-default navbar-btn'>" + "Your Cart" + "</button>");
  }

  //show cart-container
  $("nav").on("click", "button", function() {
    console.log(select.productsInCart());
    $(".cart-container").css("display", "block");
  });

  //user selects product
  $("#products").on("click", "button", function() {
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      if ($(this).parent().siblings()[0].innerHTML == product.name) {
        selectProduct = product;
      }
    }
    addCart(selectProduct);
  });

  //user adds selected product to customer cart
  function addCart(product) {
    $("#cart > tbody:last-child").append("<tr><td>" + product.name + "</td><td>" + product.price + "</td><td><button class='btn btn-default'>Remove</button></td></tr>");
    select.addToCart(product);
  }

  //object constructor to create customer prototype
  function Customer(name, wallet) {

    this.name = name;
    this.wallet = wallet;
    this.cart = [];

    //return customer introduction name and money
    this.introduction = function() {
      return "Hi my name is " + this.name + " and I have $" + this.wallet + " in my wallet.";
    };

    //add product to customer's cart
    this.addToCart = function(product) {
      this.cart.push(product);
    };

    //show products in customer's cart
    this.productsInCart = function() {
      var cartLength = this.cart.length;
      for (i = 0; i < cartLength; i++) {
        console.log(this.cart[i].name);
      }
    };

    //customer purchases product
    this.purchase = function(product) {
      this.wallet -= Product.price;
      return "I have $" + this.wallet + " remaining in my wallet.";
    };
  }


  //find product amount of one product and then create function that calls that function on all the products  indexOf  if store is out of product or customer out of money, don't allow purchase

  //object constructor to create Product prototype
  function Product(name, price, material, weight) {
    this.name = name;
    this.price = price;
    this.material = material;
    this.weight = weight;

    //return product weight
    this.sayWeight = function(product) {
      return "This product weighs " + Product.weight + " pounds.";
    };
  }

  // function Electronic(test) {
  //   this.test = test;
  //
  //   this.testSuccess = function(product) {
  //     return "This " + Product.name + " works.";
  //   }
  // }
  //
  // Electronic.prototype


  //object constructor to create store prototype
  function Store(name, location) {

    this.name = name;
    this.location = location;
    this.products = [];
    this.cashRegister = 100;

    //return current store
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

    //purchase made from store
    this.purchase = function(product) {
      this.cashRegister += product.price;
      var index = this.products.indexOf(product);
      this.products.splice(index, 1);
    };
  }

  //transaction calls purchase for store and customer
  var transaction = function(store, customer, product) {
    store.purchase(product);
    customer.purchase(product);
  };

});
