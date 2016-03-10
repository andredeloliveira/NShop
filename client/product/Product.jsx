/*we can add the quick look option here in the next update. For now, it will stay
  inactive due to design decisions
*/
Product = React.createClass({
  getRating(){
    var avg = this.props.product.rating.avgRate;
    var nRates = this.props.product.rating.nRates;
    var result = 0;
    if(avg !== 0 && nRates !== 0){
       result = Math.ceil(avg / nRates);
    }
    return result;
  },
  componentDidMount(){
    var identifiers = {
      quickLook: '#' + 'modal' + this.props.product._id,
      rating: '#' + 'rating' + this.props.product._id
    };
    var data = {
      quickLook: $(identifiers.quickLook),
      rating: $(identifiers.rating).rating({interactive: false})
    };
    this.setState(data);
  },
  quickLook(event){
    this.state.quickLook.modal('show');
  },
  render(){
    var shownImage = this.props.product.images[0].url();
    var hiddenImage = '';
    if(this.props.product.images.length > 0){
       hiddenImage = this.props.product.images[1].url();
    }
    return(
      <div className="column">
      <div className="ui card">
        <div className="ui slide masked reveal image">
          <img src={shownImage} className="visible content" />
          <img src={hiddenImage} className="hidden content" />
        </div>
        <div className="content">
          <a className="header" href={'/products/'+this.props.product._id}>{this.props.product.name}</a>
          <div className="meta">
            <span className="date">$ {this.props.product.price}</span>
          </div>
        </div>
        <div className="extra">
            <div className="ui star rating" id={'rating' + this.props.product._id}
               data-rating={this.getRating()} data-max-rating="5" ></div>
        </div>
        <div className="ui modal" id={'modal' + this.props.product._id}>

        </div>
      </div>
      </div>
  );
  }
});
