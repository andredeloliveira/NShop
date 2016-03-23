ShippingInfos = new Mongo.Collection("shipping");
ShippingInfos.allow({ 
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
