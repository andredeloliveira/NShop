ProductDetails = React.createClass({
  mixins:[ReactMeteorData],
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
  getMeteorData(){
    var handleProduct = Meteor.subscribe("products");
    var handleBrand = Meteor.subscribe("brands");
    return {
      isLoadingProduct: ! handleProduct.ready(),
      isLoadingBrand: ! handleBrand.ready(),
      product: Products.findOne(this.props.product),

    }
  },
  componentDidMount(){
    var state = {} ;
    state.mainImage = this.data.product.images[0];
    state.rating = $('#'+'rating'+this.data.product._id).rating({interactive: false});
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
                    <button className="fluid ui button">Add to bag</button>
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
      </div>
    );
  }
});
