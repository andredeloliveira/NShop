Brands = new Mongo.Collection('brands');

if (typeof Schema === 'undefined') {
	Schema = function Schema() {}
}
Schema.Brands = new SimpleSchema({
  userId: {
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

Brands.attachSchema(Schema.Brands);
