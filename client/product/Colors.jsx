Colours = new React.createClass({
  getInitialState(){
    return {
      selectedColor: null
    }
  },
  selectedColor(color, event){
    var sc = color.name();
    var colorName = sc.match(/([^.*\.png$]+[^.*\.jpg$])\w+/g)[0];
    this.setState({
      selectedColor: colorName
    });
  },
  getSelectedColor(){
    return this.state.selectedColor;
  },
  renderImages(){
    function isColorSelected(state, color){
      var colorName = color.name().match(/([^.*\.png$]+[^.*\.jpg$])\w+/g)[0];
      if(state && state === colorName){
        return true;
      }else {
        return false;
      }
    };
    return this.props.colours.map( (color, index) => {
      return (
            <div key={index}>
              <a href=""  onClick={this.selectedColor.bind(this, color)}>
                <img className="ui mini image" src={color.url()} />
                { isColorSelected(this.state.selectedColor, color) ? <i className="checkmark icon"></i> :
                null}
              </a>
            </div>
            );
    });
  },
  render(){
    return(
      <div className="row">
         {this.renderImages()}
      </div>
    );
  }
});
