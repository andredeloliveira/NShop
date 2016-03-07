CategoriesAdmin = React.createClass({
  renderHeader(){
    return this.props.categories.columns.map( (column, index) =>{
      return <CategoriesAdminHeader key={index} column={column}  /> ;
    });
  },
  renderBody(){
    return this.props.categories.object.map( (category) => {
        return <CategoriesAdminBody category={category} key={category._id} />
    });
  },
  toggleAdd(event){
    this.state.modal.modal('show');
  },
  componentDidMount(){
    this.setState({
      modal: $("#addCategory").modal({detachable: false})
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
      <div className="ui modal ediform" id="addCategory">
        <AddCategory close={this.closeAdd}/>
      </div>
    </div>
    );
  }
});
