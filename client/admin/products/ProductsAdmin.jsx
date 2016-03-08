ProductsAdmin = React.createClass({
  renderHeader(){
    return this.props.products.columns.map( (column, index) =>{
      return <ProductsAdminHeader key={index} column={column}  /> ;
    });
  },
  renderBody(){
    return this.props.products.object.map( (product) => {
        return <ProductsAdminBody product={product} key={product._id} />
    });
  },
  toggleAdd(event){
    this.state.modal.modal('show');
  },
  componentDidMount(){
    this.setState({
      modal: $("#addProduct").modal({detachable: false})
    })
  },
  closeAdd(){
    this.state.modal.modal('hide');
  },
  render(){
    return(
      <div>
        <button className="ui vertical animated primary button" tabIndex="0"  onClick={this.toggleAdd}>
          <div className="hidden content">Add</div>
          <div className="visible content">
            <i className="plus icon"></i>
          </div>
        </button>
      <table className="ui compact celled table">
        <thead>
          <tr>
              { this.renderHeader() }
          <th></th>
          </tr>
        </thead>
        <tbody>
          { this.renderBody() }
        </tbody>
      </table>
      <div className="ui modal ediform" id="addProduct">
        <AddProduct  close={this.closeAdd}/>
      </div>
    </div>
    );
  }
});
