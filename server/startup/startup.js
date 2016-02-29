Meteor.startup(function(){
  if(Meteor.users.find().count() === 0){

    Accounts.createUser({
      email: 'user@user.com',
      password: 'user'
      });
  }
});
