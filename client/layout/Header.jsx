Header = React.createClass({
  mixins: [ReactMeteorData],
  /*gets the data and put into this.data.[property]*/
  getMeteorData(){
    var shoppingCartItemsHandler = Meteor.subscribe("shoppingcart");
    return {
      isCartLoading: ! shoppingCartItemsHandler.ready(),
      currentUser: Meteor.user(),
      shoppingCartItems: ShoppingCart.find({}).fetch()[0]
    }
  },
  handleLogout(){
    Meteor.logout();
  },
  renderShoppingCart(){
    return <ShoppingCartHeader nItems={this.data.shoppingCartItems.items.length} /> ;
  },
  render(){
    var hasShoppingCart = this.data.shoppingCartItems;
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
    if(this.data.isCartLoading){
      return <LoadingSpinner />
    }
    console.log(this.data.shoppingCartItems)
    return(
      <div className="ui fixed menu">
        <a className="item" href="/">Home</a>
        <a className="item" href="/admin">Admin</a>
        <div className="right menu">
        {logoutButton}
        {loginButtons}
        {currentUser && hasShoppingCart ? <div> {this.renderShoppingCart()}</div> :
         <div>
           <ShoppingCartHeader nItems={0} />
           <div className="ui custom popup top left transition hidden" id="errorPopup">
             This item is already on you shopping cart!
           </div>
         </div>
        }
        </div>
      </div>
    );
  }
});
