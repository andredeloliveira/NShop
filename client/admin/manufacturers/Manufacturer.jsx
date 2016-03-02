
ManufacturerAdmin = React.createClass({

  getInitialState(){
    var modalId = '#' + this.props.manufacturer._id;
    return{
      modal: $(modalId)
    }
  },
  componentDidMount(){
    var modalId = '#' + this.props.manufacturer._id ;
    this.setState({
      modal: $(modalId).modal({detachable:false})
    });
  },
  removeManufacturer(event){
    event.preventDefault();
    Manufacturers.remove({_id: this.props.manufacturer._id});
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
    <div className="ui cards">
        <div className="card">
          <div className="content">
            <div className="header">
              {this.props.manufacturer.name}
            </div>
            <div className="meta">
              <p>logo can come here or somewhere</p>
            </div>
            <div className="description">
              {this.props.manufacturer.description}
            </div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              <button className="ui red button" onClick={this.removeManufacturer}><i className="icon remove circle"></i> Remove</button>
              <button className="ui orange button" onClick={this.toggleModal}><i className="icon write"></i> Edit</button>
            </div>
          </div>
        </div>
      </div>
      <div className="ui modal editform" id={this.props.manufacturer._id}>
        <EditManufacturer manufacturer={this.props.manufacturer} close={this.closeModal} />
      </div>
  </div>
    );
  }
});
