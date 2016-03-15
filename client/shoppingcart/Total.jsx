Total = React.createClass({
  render(){
    return (
      <div className="ui grid right aligned">
        <div className="row">
          <div className="column">
            <h1>{'$'} {this.props.total}</h1>
          </div>
        </div>
      </div>
    );
  }
});
