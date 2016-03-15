ShoppingCartHeader = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      currentUser: Meteor.user()
    }
  },
  goToShoppingCart(event){
    if(! this.data.currentUser){
      FlowRouter.go("LoginForm");
    }else{
      FlowRouter.go('shoppingCart');
    }
  },
  render(){
    iconSize = {
      fontSize: '2em'
    };

    /*Would be really nice to have a popup in here to show the items in the shopping Cart.*/
    return(
      <div className="ui compact menu">
        <a className="item" href="" onClick={this.goToShoppingCart}>
          <i className="icon shop" style={iconSize}></i>
          <div className="ui orange circular label">{this.props.nItems}</div>
        </a>
      </div>
    );
  }
});
