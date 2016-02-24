Admin = React.createClass({

  render(){
    var iconSize = {
      fontSize: '9em',
      marginTop: '50px',
      marginBottom: '0'
    };

    return(
      <div>
          <div className="ui four column grid">
            <div className="column">
              <div className="ui fluid card">
                <a className="image" href="/admin/products"  >
                  <img src="../resources/box.png" />
                </a>
                <div className="content">
                  <a className="header" href="/admin/products" >Products</a>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui fluid card">
                <a className="image" href="/admin/categories">
                  <img src="../resources/products.png"/>
                </a>
                <div className="content">
                  <a className="header" href="/admin/categories">Categories</a>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui fluid card">
                <a className="image" href="/admin/promotions">
                  <img src="../resources/promotions.png"/>
                </a>
                <div className="content">
                  <a className="header" href="/admin/promotions">Promotions</a>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="ui fluid card">
                <a className="image" href="admin/videos">
                  <img src="../resources/video.png"/>
                </a>
                <div className="content">
                  <a className="header" href="/admin/videos">Videos</a>
                </div>
              </div>
            </div>
          </div >
      </div>
    );
  }
});
