RegisterForm = React.createClass({
  error: '',
  onSubmit(event){
    event.preventDefault();
    /*New user's object*/
    var newUser = {
      email: event.target.email.value,
      password: event.target.password.value,
      profile: {
        name: event.target.name.value,
        /*extra profile data can be handle here*/
        surname: event.target.surname.value
      }
    };
    /*Now we can create the user on Accounts and redirect to the Home route*/

    Accounts.createUser(newUser, (err) =>{
       if(err){
         this.props.error = err.reason;
       }else {
         FlowRouter.go('Home');
       }
    });
  },
  render(){
    return(
      <div className="ui form success">
        <form onSubmit={this.onSubmit}>
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name"/>
          </div>
          <div className="field">
            <label>Surname</label>
            <input type="text" name="surname" placeholder="Surname"/>
          </div>
          <div className="field">
            <label>E-mail</label>
            <input type="email" name="email" placeholder="john@domain.com"/>
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="Password"/>
          </div>
          <div>
            <input type="submit" value="Register" className="ui green basic button"/>
          </div>
        </form>
        <div className="ui error message">
          {this.props.error}
        </div>
      </div>
    );
  }
});
