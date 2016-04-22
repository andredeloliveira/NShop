Categories = new Mongo.Collection('categories');

if (typeof Schema === 'undefined') {
	Schema = function Schema() {}
}
Schema.Categories = new SimpleSchema({
  name: {
    type: String
  },
  parentCategory: {
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

Categories.attachSchema(Schema.Categories);
