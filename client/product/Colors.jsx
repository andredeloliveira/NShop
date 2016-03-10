Colours = new React.createClass({
  selectedColor(colorId, event){
    console.log(colorId);
    return colorId;
  },
  renderImages(){
    return this.props.colours.map( (color, index) => {
      return (
            <div key={index}>
              <a href=""  onClick={this.selectedColor.bind(this, color._id)}>
                <img className="ui mini image" src={color.url()} />
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
