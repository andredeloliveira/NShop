Meteor.subscribe("categories");
CategoryAdmin = React.createClass({
  mixins:[ReactMeteorData],
  getMeteorData(){

    return {
      parentCategory: Categories.findOne( this.props.category.parentCategory)
    }
  },
  getInitialState(){
    var modalId = '#' + this.props.category._id;
    return{
      modal: $(modalId)
    }
  },
  componentDidMount(){
    var modalId = '#' + this.props.category._id ;
    this.setState({
      modal: $(modalId).modal({detachable:false})
    });
  },
  removeCategory(event){
    event.preventDefault();
    Categories.remove({_id: this.props.category._id});
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
              {this.props.category.name}
            </div>
            <div className="meta">
              { this.data.parentCategory ?
                <div>{this.data.parentCategory.name}</div>
              : null}
            </div>
            <div className="description">
              {this.props.category.description}
            </div>
          </div>
          <div className="extra content">
            <div className="ui two buttons">
              <button className="ui red button" onClick={this.removeCategory}><i className="icon remove circle"></i> Remove</button>
              <button className="ui orange button" onClick={this.toggleModal}><i className="icon write"></i> Edit</button>
            </div>
          </div>
        </div>
      </div>
      <div className="ui modal editform" id={this.props.category._id}>
        <EditCategory category={this.props.category} close={this.closeModal} />
      </div>
  </div>
    );
  }
});
