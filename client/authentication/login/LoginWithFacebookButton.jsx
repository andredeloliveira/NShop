loginWithFacebookButton = React.createClass({
  getInitialState(){
    error: ''
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
        FlowRouter.go('Home');
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
          <i className="icon facebok"></i>
        </button>
    </div>
    );
  }
});
