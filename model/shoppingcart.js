
/*defining shopping cart now*/
ShoppingCarts = new Mongo.Collection("shoppingcart");

/*
Storing data about the user's shoppingCart can have some interesting
results.
*/
ShoppingCarts.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});
