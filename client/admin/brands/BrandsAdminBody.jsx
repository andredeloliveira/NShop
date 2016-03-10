Meteor.subscribe("manufacturers");
BrandsAdminBody = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      manufacturer: Manufacturers.findOne({_id: this.props.brand.manufacturer})
    }
  },
  toggleEdit(event){
    this.state.modal.modal('show');
  },
  componentDidMount(){
    var modalId = '#' + this.props.brand._id;
    this.setState({
      modal: $(modalId).modal({detachable: false})
    })
  },
  closeEdit(){
    this.state.modal.modal('hide');
  },
  remove(event){
    event.preventDefault();
    Brands.remove({_id: this.props.brand._id});
  },
  render(){
    console.log(this.data.manufacturer);
    return(

      <tr>
        <td>{ this.props.brand.name }</td>
        {this.data.manufacturer ? <td>{ this.data.manufacturer.name }</td> :
          <strong>no data</strong>}
        <td className="single line center aligned">
          <a href=""><i className="large unhide icon"></i></a>
          <a href="" onClick={this.toggleEdit}><i className="large edit icon"></i></a>
          <a href="" onClick={this.remove}><i className="large remove icon"></i></a>
            <div className="ui modal editform" id={this.props.brand._id}>
              <EditBrand brand={this.props.brand} close={this.closeEdit} />
            </div>
        </td>
      </tr>


  );
  }
});
