ProductDetails = React.createClass({
  mixins:[ReactMeteorData],
  getMeteorData(){
    var handleProduct = Meteor.subscribe("products");
    var handleBrand = Meteor.subscribe("brands");
    return {
      isLoadingProduct: ! handleProduct.ready(),
      isLoadingBrand: ! handleBrand.ready(),
      product: Products.findOne(this.props.product),

    }
  },
  closeModal(event){
    this.state.modal.modal('hide');
  },
  /*this function is waay to long. Needs to be refactored*/
  addToCart(event){
    /*this also to need rewritten somewhere else. But for now it passes the tests*/
    function productExists(items, itemToVerify){
      let exists = false;
      for(var i=0; i< items.length; i++){
        if(items[i]._id === itemToVerify){
          exists = true;
          break;
        }
      }
      return exists;
    };
    /*first verify if the user is logged in. If not, we open a modal with
    the requisition.
    */
    if(! Meteor.user()){
      /*for some reason if I add the LoadingSpinner on the Render,
      the modal simply does not work.(????) Should I add ComponentWillMount function
      to have the state working? Great question*/
      this.state.modal.modal('show');
      FlowRouter.go(FlowRouter.current().name);
      /*Ok, after this point the modal will show, user will log in and the modal will close
      And we can get back to business*/
    }
    /*verify if the user actually has an existing shopping cart before creating one*/
    var handler= Meteor.subscribe("shoppingcart");
    var shoppingCart = ShoppingCart.find({}).fetch()[0];
    let newSC = null;
    console.log(shoppingCart);
    if(shoppingCart === undefined){
        newSC = ShoppingCart.insert({
        owner: Meteor.user()._id,
        items: []
      }, (err, obj) => {
        if(err){
          console.error('error creating shopping cart');
        }
        return obj;
      });
      /*in this case, as the user does not have a shopping cart,
      the item is not verified*/
      ShoppingCart.update({_id: newSC}, {$push: {
        'items': this.data.product
      }
      });
    }else {
      /*verify if exists*/
      if(productExists(shoppingCart.items, this.data.product._id)){
        this.showError();
      }else{
        ShoppingCart.update({_id: shoppingCart._id}, {$push: {
          'items': this.data.product
        }
        });
      }
    }
    /*Now, we add the item into the shopping cart yeah*/
    console.log('aparently is done');
    /*now I need to verify if the item is not add already!. In case of true
    you know... say it loudly*/
  },
  showImageonSlider(index, event){
      this.setState({
        mainImage: this.data.product.images[index]
      });
  },
  //we can leave this as a Product function inside the Constructor.. that still we be done.
  //I hope to erase this message in the next commit
  getRating(){
    var avg = this.data.product.rating.avgRate;
    var nRates = this.data.product.rating.nRates;
    var result = 0;
    if(avg !== 0 && nRates !== 0){
       result = Math.ceil(avg / nRates);
    }
    return result;
  },

  componentDidMount(){
    var state = {} ;
    state.mainImage = this.data.product.images[0];
    state.rating = $('#'+'rating'+this.data.product._id).rating({interactive: false});
    state.modal = $('#loginModalProduct').modal({detachable: false});
    state.popup = $('#')
    this.setState(state);
  },
  allImagesRender(){
    return this.data.product.images.map( (image, index) => {
      return (<div key={index}>
                <a href="" onClick={this.showImageonSlider.bind(this, index)} >
                  <img className="ui tiny rounded bordered image"  src={image.url()} />
                </a>
              </div>);
    });
  },
  showError(){

    var t = $('#errorPopup').popup('show');
    console.log(t);
  },
  render(){

    return (
      <div className="ui grid">
        <div className="two column row">
          <div className="column">
            <h1>{this.data.product.name}</h1>
            <small>by <ProductBrand brand={this.data.product.brand} /> </small>
          </div>
          
        </div>
        <div className="two column row">
          <div className="column">
            {this.data.isLoadingProduct ? <img className="ui medium rounded image" src={this.data.product.images[0].url()} /> :
            <img className="ui medium rounded image" src={this.state.mainImage.url()} />}

          </div>
          <div className="column">
            <div className="ui right aligned grid">
              <div className="row">
                  <div className=" column">
                    <h1 className="price">${this.data.product.price}</h1>
                    {this.data.product.stock > 0 ?<div className="inStock">In stock</div>:
                    <div className="outOfStock">Out of stock</div> }
                  </div>
              </div>
              <div className="row">
                <div className="column">
                  <input type="number" name="quantity"/>
                </div>
              </div>
              <div className="row">
                <div className="column">
                  <div className="ui star massive rating" id={'rating' + this.data.product._id}
                     data-rating={this.getRating()} data-max-rating="5" ></div>
                </div>
              </div>
            </div>
            <div className="ui centered aligned grid">
              <div className="row">
                  <div className="sixteen wide column">
                    <button className="fluid ui button" onClick={this.addToCart}>Add to bag</button>
                  </div>
              </div>
              <div className="row">
                <SocialMedia />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
            {this.allImagesRender()}
        </div>
          <Colours colours={this.data.product.colors} ref="colours"/>
          <div className="ui modal editform" id="loginModalProduct">
            <LoginForm closeModal={this.closeModal}/>
          </div>
      </div>
    );
  }
});
