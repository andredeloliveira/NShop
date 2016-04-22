Shipping = new Mongo.Collection('shipping');

if (typeof Schema === 'undefined') {
	Schema = function Schema() {}
}
Schema.Shipping = new SimpleSchema({
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

Shipping.attachSchema(Schema.Shipping);
