CheckoutItems = React.createClass({
  itemsRender(){
    return this.props.items.map( (item) => {
      return (
        <div className="ui divided items">
          <div className="item">
              <div className="content">
                <div className="header">{item.name}</div>
                <div className="meta">
                  <span className="price">{item.price}</span>
                  <span className="stay"></span>
                </div>
                <div class="description">
                  { this.props.selectedColor ? <p>Color{':'}
                    <p> {this.props.selectedColor.name}</p>
                  </p> : null}
                </div>
              </div>
            </div>
        </div>
      );
    });
  },
  render(){
    return (
            <div>
                {this.itemsRender()}
            </div>);
  }
});
