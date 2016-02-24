/*Here the Models will be defined*/
Products = new Mongo.Collection("products");
Products.allow({ 
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
