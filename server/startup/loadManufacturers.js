/*Populate the Manufacturers database if it's empty*/
Meteor.startup(function(){
  if(Manufacturers.find().count() === 0){
    /*more data can be added in here, in case we need more details about the manufacturer*/
    var manufacturers = [
      {
        name: 'manufacturer 1'
      },
      {
        name: 'manufacturer 2'
      },
      {
        name: 'manufacturer 3'
      }
    ];
    for(var i=0; i< manufacturers.length; i++){
      Manufacturers.insert(manufacturers[i]);
    }
  }
});
