
Main = React.createClass({
  render(){
    /*Styles can be defined in here. It can be on a LESS/SASS as well, but for now it
    is in here*/
    var mainContent = {
      marginTop: '100px'
    };
    return(
      <div>
        {this.props.header}
        <div className="ui raised very padded container segment" style={mainContent} >
          <div className="column">
            {this.props.content}
          </div>
        </div>
        {this.props.footer}
      </div>
    );
  }
});
