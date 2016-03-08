ProductsAdminBody = React.createClass({
  toggleEdit(event){
    this.state.modal.modal('show');
  },
  componentDidMount(){
    var modalId = '#' + this.props.product._id;
    this.setState({
      modal: $(modalId).modal({detachable: false})
    })
  },
  closeEdit(){
    this.state.modal.modal('hide');
  },
  remove(event){
    event.preventDefault();
    Products.remove({_id: this.props.product._id});
  },
  render(){
    return(
      <tr>
        <td>{ this.props.product.name }</td>
        <td>{ this.props.product.description }</td>
        <td className="single line center aligned">
          <a href=""><i className="large unhide icon"></i></a>
          <a href="" onClick={this.toggleEdit}><i className="large edit icon"></i></a>
          <a href="" onClick={this.remove}><i className="large remove icon"></i></a>
            <div className="ui modal editform" id={this.props.product._id}>
              <EditProduct product={this.props.product} close={this.closeEdit} />
            </div>
        </td>
      </tr>


  );
  }
});
