/*Component for the login form
  Everything that belongs to the LoginForm will be in Here
  @Milestone More detailed documentation should be added

  We need to find a way to make this international.
  So developers would be able to change the showing content as they wish.
  Example: E-mail is international but password isn't
*/
Meteor.subscribe("users");
LoginForm = React.createClass({
  propTypes: {
    error: React.PropTypes.any
  },
  onSubmit(e){
    e.preventDefault();
    var email = e.target.email.value;
    var password = e.target.password.value;
    Meteor.loginWithPassword(email, password, (err) => {
      if(err){

        this.props.error = err;
        console.log(this.props.error);
      }else {
        FlowRouter.go('Home');
      }
    });
  },
  render(){
    return(
      <div className="ui form error">
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <label>E-mail</label>
            <input type="email" name="email" placeholder="john@domain.com"/>
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password"/>
          </div>
          <div>
            <input type="submit" value="Login" className="ui blue basic button"/>
          </div>
        </form>
      </div>
    );
  }
})
