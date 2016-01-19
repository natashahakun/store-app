
  var customers = [];
  var stores = [];
  var products = [];
  var select = {};
  var selectStore = {};
  var selectProduct = {};
  var totalCost = 0;

$(document).ready(function() {

  //create new instances of Customer prototype
  var natasha = new Customer("Natasha", 30.00);
  addCustomer(natasha);
  var flip = new Customer("Flip", 15.00);
  addCustomer(flip);
  var becca = new Customer("Becca", 77.25);
  addCustomer(becca);

  //create new instances of Store prototype
  var target = new Store("Target", "Richmond");
  addStore(target);
  var nordstrom = new Store("Nordstrom", "Richmond");
  addStore(nordstrom);
  var kroger = new Store("Kroger", "Richmond");
  addStore(kroger);

  //create new instances of Product prototype
  var mug = new Product("mug", 3.00, "ceramic", 0.25);
  addProduct(mug);
  var book = new Product("book", 7.00, "paper", 1.00);
  addProduct(book);
  var pen = new Product("pen", 1.00, "plastic", 0.10);
  addProduct(pen);
  // var computer = new Electronic.prototype("computer", 800.00, "plastic", 6.00, "test");
  // addProduct(computer);


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
    $("#cart > tbody:last-child").append("<tr><td>" + product.name + "</td><td>" + product.price + "</td><td><button class='btn btn-default'>X</button></td></tr>");
    select.addToCart(product);
  }

  //user removes product from cart-container
  $("#cart").on("click", "button", function() {
    var rowRemove = $(this).parents("tr");
    rowRemove.remove();
    var selectProduct;
    for (var i = 0; i < products.length; i++) {
      var product = products[i];
      if ($(this).parent().siblings()[0].innerHTML == product.name) {
        selectProduct = product;
      }
    }
    removeProduct(select.cart, selectProduct);
  });

  //remove product from cart array
  function removeProduct(cart, product) {
    var remove = cart.indexOf(product);
    cart.splice(remove, 1);
  }


  //user makes purchase when clicking on checkout
  $(".cart-container").on("click", ".checkout", function() {
    transaction(selectStore, select, select.cart);
  });

  //transaction calls purchase for store and customer
  function transaction(store, customer, cart) {
    for (var i = 0; i < cart.length; i++) {
      totalCost += cart[i].price;
    }
    customer.wallet -= totalCost;
    if (customer.wallet >= 0) {
      store.cashRegister += totalCost;
      console.log(store.cashRegister);
      customer.cart = [];
      $("#cart tbody").empty();
      $(".modal-body p").append("Your purchase cost $" + totalCost + ". " + "You have $" + customer.wallet + " remaining in your wallet.");
    } else {
      customer.wallet += totalCost;
      $(".modal-body p").append("Purchase denied. You do not have enough money in your wallet to make this purchase.");
    }
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
  }


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
  //   };
  // }
  //
  // Electronic.prototype = Product;


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
  }
});
