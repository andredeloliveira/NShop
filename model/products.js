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

/*constructors for Product Object*/
  ProductObject = function(){
    this.name = ""
    this.description = "";
    this.weight = "";
    this.height = "";
    this.width = "";
    this.length = "";
    this.price = "";
    this.stock = "";
    this.brand = "";
    this.category = "";
    /*internal function that calculates the rating*/
    this.rating  = {
      avgRate: 0,
      nRates: 0
    };
    this.getRating = () => {
      var avg = this.rating.avg;
      var nRates = this.rating.nRates
      var result = 0;
      if(avg !== 0 && nVotes !== 0){
        result = avg / nvotes;
      }
      return result;
    };
    this.images = [];
  };
