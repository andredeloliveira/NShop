ProductAdmin = React.createClass({
  /*product obj prop came from parent*/
  getInitialState(){
    return {
      modal: $('#modal')
    }
  },
  removeProduct(event){
    event.preventDefault();
    Products.remove({_id: this.props.product._id});
  },
  /*this is very important to notice. When the component has everything ready, THEN, you do something
    in this case, I want to load the Modal, special case to be detachable. Loading as a State, makes
    the modal accessible from all functions in te component.
  */
  shouldComponentUpdate(nextProps, nextState, event){
    return true;
  },
  componentDidMount(){
    var modalId = '#'+this.props.product._id ;
    this.setState({
      modal: $(modalId).modal({detachable:false})
    })
  },
  toggleModal(event){
    this.state.modal.modal('show');
  },
  closeModal(event){
    this.state.modal.modal('hide');
  },
  render(){
    var hasImages = this.props.product.images.length > 0;
    return(
  <div>
    <div className="column">
      <div className="ui special cards">
        <div className="card">
          <div className="blurring dimmable image">
            <div className="ui dimmer">
              <div className="content">
                <div className="center">
                  <div className="ui inverted button">Remove product</div>
                  <div className="ui inverted button">Edit Product</div>
                </div>
              </div>
            </div>
            { hasImages ? <img src={this.props.product.images[0].url()} /> : null}
          </div>
          <div className="content">
            <p className="header">{this.props.product.name}</p>
            <div className="meta">
              <span className="date">{this.props.product.price}</span>
            </div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              <button className="ui red button" onClick={this.removeProduct}><i className="icon remove circle"></i> Remove</button>
              <button className="ui orange button" onClick={this.toggleModal}><i className="icon write"></i> Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="ui modal editform" id={this.props.product._id}>
        <EditProduct product={this.props.product} close={this.closeModal}  />
      </div>
  </div>
    );
  }
});
