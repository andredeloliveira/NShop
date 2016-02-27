Manufacturers = new Mongo.Collection("manufacturer");
Manufacturers.allow({
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
