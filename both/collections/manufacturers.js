Manufacturers = new Mongo.Collection('manufacturers');

if (typeof Schema === 'undefined') {
	Schema = function Schema() {}
}
Schema.Manufacturers = new SimpleSchema({
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

Manufacturers.attachSchema(Schema.Manufacturers);
