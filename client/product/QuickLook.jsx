QuickLook = React.createClass({
  componentDidMount(){
    var identifier = '#' + 'quickLook' + this.props.product._id;
    this.setState({
        rating: $(identifier).rating({interactive: false})
    });
  },
  renderAllImages(){
    return this.props.product.images.map( (image, index) => {
      return <img className="quickLookThumb" key={index} src={image.url()} />
    });
  },
  renderAllColors(){
    return this.props.product.colors.map( (color, index) => {
        return <image className="quickLookColorsThumb" key={index} src={image.url()} />
    });
  },
  render(){
    style= {
      maxWidth: '800px',
      width: '100%',
      maxHeight: '800px',
      height: '100%',
      margin: 'auto'
    };
    return (
            <div style={style}>
              <h1 className="ui centered">{this.props.product.name}</h1>
              <img src={this.props.product.images[0].url()} className="ui centered image" />
                  <div className="ui centered massive star rating" id={'quickLook' + this.props.product._id}
                   data-rating={this.props.rating} data-max-rating="5" ></div>
            </div>
    );
  }
});
