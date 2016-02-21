LoginButtons = React.createClass({
  goToLogin(){
    FlowRouter.go('LoginForm');
  },
  goToRegister(){
    FlowRouter.go('RegisterForm');
  },
  render(){
    return(
      <div>
        <button className="ui blue basic button right floated" onClick={this.goToLogin}>Login</button>
        <button className="ui green basic button right floated" onClick={this.goToRegister}>Register</button>
      </div>
    );
  }
});
