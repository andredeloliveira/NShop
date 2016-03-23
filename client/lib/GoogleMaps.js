if(Meteor.isClient){
  Meteor.startup( () => {
    GoogleMaps.load({v: '3', key: 'AIzaSyCM6K5wH7Hw7u714n08BF4pdESJpDck85Q', libraries: 'places'});
  });
}
