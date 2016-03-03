BrandAdmin = React.createClass({
  getInitialState(){
    return {
      modal: $('#modal')
    }
  },
  removeBrand(event){
    event.preventDefault();
    Brands.remove({_id: this.props.brand._id});
  },
  /*this is very important to notice. When the component has everything ready, THEN, you do something
    in this case, I want to load the Modal, special case to be detachable. Loading as a State, makes
    the modal accessible from all functions in te component.
  */

  componentDidMount(){
    var modalId = '#'+this.props.brand._id ;
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

    return(
  <div>
    <div className="column">
      <div className="ui special cards">
        <div className="card">
          <div className="blurring dimmable image">
            <div className="ui dimmer">
              <div className="content">
                <div className="center">
                </div>
              </div>
            </div>
              <img src={this.props.brand.image.url()} />
          </div>
          <div className="content">
            <p className="header">{this.props.brand.name}</p>
            <div className="meta">
            </div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              <button className="ui red button" onClick={this.removeBrand}><i className="icon remove circle"></i> Remove</button>
              <button className="ui orange button" onClick={this.toggleModal}><i className="icon write"></i> Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="ui modal editform" id={this.props.brand._id}>
        <EditBrand brand={this.props.brand} close={this.closeModal}  />
      </div>
  </div>
    );
  }
});
