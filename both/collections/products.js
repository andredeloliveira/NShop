Products = new Mongo.Collection('products');

if (typeof Schema === 'undefined') {
	Schema = function Schema() {}
}
Schema.Products = new SimpleSchema({
  name: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        this.unset();
      }
    },
    denyUpdate: true
  },
});

Products.attachSchema(Schema.Products);
