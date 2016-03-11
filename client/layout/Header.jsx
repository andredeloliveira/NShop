Header = React.createClass({
  mixins: [ReactMeteorData],
  /*gets the data and put into this.data.[property]*/
  getMeteorData(){
    var shoppingCartItemsHandler = Meteor.subscribe("shoppingcart");
    return {
      currentUser: Meteor.user(),
      shoppingCartItems: ShoppingCart.find({}).count()
    }
  },
  handleLogout(){
    Meteor.logout();
  },
  render(){

    let currentUser = this.data.currentUser;
    if(currentUser){
      var logoutButton =<button className="ui red basic button right floated" onClick={this.handleLogout}>Logout</button>;
    }else {
      var loginButtons = <div> <LoginButtons/>
      </div>;
    }
 /*Ok. I've got things working now by some unknown force. I should finish this in a nice way.
  I should think about some styles as well
 */
    return(
      <div className="ui fixed menu">
        <a className="item" href="/">Home</a>
        <a className="item" href="/admin">Admin</a>
        <div className="right menu">
        {logoutButton}
        {loginButtons}
        <ShoppingCartHeader nItems={this.data.shoppingCartItems}/>
        </div>
      </div>
    );
  }
});
