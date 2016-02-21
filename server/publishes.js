/*Publish to gather all the products in the database*/
Meteor.publish("products", function(){
  return Products.find({});
});
Meteor.publish("users", function(){
  return Meteor.users.find();
});
