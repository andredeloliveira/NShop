LoadingSpinner = React.createClass({
  render(){
    return(
      <div className="ui segment">
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading</div>
        </div>
        <p></p>
     </div>
    );
  }
});
