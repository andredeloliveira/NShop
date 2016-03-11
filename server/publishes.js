/*Publish to gather all the products in the database*/
Meteor.publish("products", function(){
  return Products.find({});
});
Meteor.publish("users", function(){
  return Meteor.users.find({});
});
Meteor.publish("manufacturers", function(){
  return Manufacturers.find({});
});
Meteor.publish("categories", function(){
  return Categories.find({});
});
Meteor.publish("brands", function(){
  return Brands.find({});
});
Meteor.publish("shoppingcart", function(){
  return ShoppingCart.find({
    owner: this.userId
  });
});
