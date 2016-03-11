ShoppingCartHeader = React.createClass({
  render(){
    iconSize = {
      fontSize: '2em'
    };
    return(
      <div className="ui compact menu">
        <a className="item">
          <i className="icon shop" style={iconSize}></i>
          <div className="ui orange circular label">{this.props.nItems}</div>
        </a>
      </div>
    );
  }
});
