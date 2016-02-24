Images = new FS.Collection("images",{
  stores: [
    new FS.Store.GridFS("original")
  ]
});
if (Meteor.isServer) {
  Images.allow({
    insert: function (userId) {
      return (userId ? true : false);
    },
    remove: function (userId) {
      return (userId ? true : false);
    },
    download: function () {
      return true;
    },
    update: function (userId) {
      return (userId ? true : false);
    }
  });

  Meteor.publish('images', function(options) {

    return Images.find({});
  });
}
