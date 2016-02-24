/*Login error component. A message can be passed on the prop message.*/
LoginError = React.createClass({

  render(){
    return(
        <div className="ui error message">
          <div className="header">
            Login Error!
          </div>
          <p>The error is <strong>{this.props.message}</strong>. Please, check your login details and try again.</p>
      </div>
    );
  }
});
