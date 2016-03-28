ProductObj = function(obj){
  this.name = '' || obj.name;
  this.description = '' || obj.description;
  this.weight = 0.0 || obj.weight;
  this.height = 0.0 || obj.height;
  this.width = 0.0 || obj.width;
  this.length = 0.0 || obj.length;
  this.price = 0.0 || obj.price;
  this.stock= 0 || obj.stock;
  this.brand = '' || obj.brand;
  this.category = '' || obj.category;
  this.rating = {
    avgRate: 0,
    nRates: 0
  };
  this.images = [] || obj.images;
  this.colors = [] || obj.colors;
};
