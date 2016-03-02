Brands = new Mongo.Collection("brands"); 
CollectionName.allow({
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
