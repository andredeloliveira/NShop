MyCart = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var SCHandle = Meteor.subscribe("shoppingcart");
    return {
      isLoading : ! SCHandle.ready(),
      shoppingCart : ShoppingCarts.find({}).fetch()[0]
    }
  },
  getInitialState(){
    return {
      quantities: []
    }
  },
  handleQuantityChange(event){
    /*everytime that a quantity changes, we
    have to update the multiplier.. and as I don't want to reload the whole page,
    just re-render the bit that it was updated, I'm going to access the database again
    and update the value there. It might be a bit silly, but it looks awesome.
    -------------*/
    //first of all, update the changed values;
    var updatedItems = this.data.shoppingCart.items.map( (item, index) => {
        if(item.name === event.target.name){
            item.quantity = event.target.value;
        }
        return item;
    });
    /*then we can update the collection, setting all the new values*/
    ShoppingCarts.update({_id: this.data.shoppingCart._id}, {
        $set: {
            'items': updatedItems
          }
        }
    );
  },
  removeItem(item, index, event){
    /*only updates the array inside the database.*/
    console.log(item._id);
    ShoppingCarts.update({_id: this.data.shoppingCart._id}, {
      $pull: {
        'items' : item
      }
    });
  },
  itemsRender(){
    return this.data.shoppingCart.items.map((item, index) => {
        return (
                <div className="item" key={index}>
                  <div className="image">
                    <img src={item.images[0].url()} alt={item.name} />
                    </div>
                    <div className="content">
                      <a className="header">{item.name}</a>
                      <div className="meta">
                        {item.selectedColor ?
                          <div>
                            Color:
                            <span className="cinema">{item.selectedColor}</span>
                          </div> :
                        null }
                      </div>
                      <div className="description">
                        <h1>${item.price}</h1>
                      </div>
                      <div className="extra">
                        <div>
                          Quantity: <input type="number" name={item.name} min="1" max="100" defaultValue={item.quantity} onChange={this.handleQuantityChange}/>
                        </div>
                        <button className="ui button" onClick={this.removeItem.bind(this, item, index)}><i className="icon remove"></i> Remove</button>
                      </div>
                    </div>
                  </div>
        );
    });
  },
  getTotal(){
    /*Get the quantities. and multiply them*/
    if(this.data.shoppingCart.items.length === 0){
      return <h1>Your shopping cart is empty! <a href="/">Click here to shop!</a></h1>;
    }
    var prices = this.data.shoppingCart.items.map( (item, index) => {
      /*the problem here is that I can't get the fucking quantity value, shit*/
      return  item.price * item.quantity;
    });
    var total = prices.reduce( (previous, current) => {
      return previous + current;
    });
    return total;
  },
  goToCheckout(event){
    FlowRouter.go("Checkout");
  },
  render(){
    if(this.data.isLoading) {
      return <LoadingSpinner />
    }
    console.log(this.data.shoppingCart)
    return (
          <div>
            <h1>Shopping Cart</h1>
            <div className="ui divided items">
              {this.itemsRender()}
            </div>
            <h2 className="ui horizontal divider header">
                  Total
            </h2>
            <Total total={this.getTotal()} />
            <div className="ui grid right aligned">
              <div className="row">
                <div className="column">
                  <button className="ui huge button" onClick={this.goToCheckout}>Checkout</button>
                </div>
              </div>
            </div>
          </div>
           );
  }
});
