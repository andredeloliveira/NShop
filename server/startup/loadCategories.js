/*Populate the categories database if it's empty*/
Meteor.startup(function(){
  if(Categories.find().count() === 0){
    var categories = [
      {
        name: 'category 1',
        description: 'this is the description for category 1',
        parentCategory: '',
      },
      {
        name: 'category 2',
        description: 'this is the description for category 2',
        parentCategory: '',
      },
      {
        name: 'category 3',
        description: 'this is the description for category 3',
        parentCategory: ''
      }
    ];
    /**/
    for(var i =0; i< categories.length; i++){
      Categories.insert(categories[i]);
    }
  }

});
