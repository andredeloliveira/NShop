LoginWithFacebookButton = React.createClass({
  getInitialState(){
    return {
      error: ''
    }
  },
  setErrorState(error){
    this.setState({error: error.reason})
  },
  loginWithFacebook(event){
    event.preventDefault();
    Meteor.loginWithFacebook({}, (err)=> {
      if(err){
        this.setErrorState(err);
      }else{
        if(! this.props.closeModal){
          FlowRouter.go('Home');
        }else {
          this.props.closeModal();
        }
      }
    });
  },
  errorRender(){
    if(this.state.error !== ''){
      return <LoginError message={this.state.error} />;
    }
  },
  render(){
    return (
    <div>
        <button className="ui facebook button" onClick={this.loginWithFacebook}>
          <i className="icon facebook"></i>Login with Facebook
        </button>
    </div>
    );
  }
});
