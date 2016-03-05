Meteor.subscribe("products");
Meteor.subscribe("categories");
Meteor.subscribe("manufacturers");
Meteor.subscribe("brands");

Admin = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      products: Products.find({}).fetch(),
      categories: Categories.find({}).fetch(),
      manufacturers: Manufacturers.find({}).fetch(),
      brands: Brands.find({}).fetch()
    }
  },
  render(){
    var iconSize = {
      fontSize: '9em',
      marginTop: '50px',
      marginBottom: '0'
    };

    return(
      <div className="ui grid">
        <div className="four wide column">
          <div className="ui vertical pointing menu">
            <a className="active item">
              <span><i className="shop icon"></i></span>
              Products
              <div className="ui label">
                { this.data.products.length }
              </div>
            </a>
            <a className="item">
              <span><i className="unordered list icon"></i></span>
              Categories
              <div className="ui label">
                { this.data.categories.length }
              </div>
            </a>
            <a className="item">
              <span><i className="configure icon"></i></span>
              Manufactures
              <div className="ui label">
                { this.data.manufacturers.length }
              </div>
            </a>
            <a className="item">
              <span><i className="barcode icon"></i></span>
              Brands
              <div className="ui label">
                { this.data.brands.length }
              </div>
            </a>
            <a className="item">
              <span><i className="announcement icon"></i></span>
              Promotions
              <div className="ui label">0</div>
            </a>
            <a className="item">
              <span><i className="film icon"></i></span>
              Videos
              <div className="ui label">0</div>
            </a>
          </div>
        </div>
        <div className="twelve wide stretched column">
          <div className="ui segment">
            <div className="ui vertical animated primary button" tabindex="0">
              <div className="hidden content">Add</div>
              <div className="visible content">
                <i className="plus icon"></i>
              </div>
            </div>

            <table className="ui compact celled table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Weight</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>In Stock</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <td>Dummy Product</td>
                <td>Creatine is the reference compound for power improvement, with numbers from one meta-analysis to assess potency</td>
                <td>123</td>
                <td className="single line">12 x 12 x 12</td>
                <td>$12.00</td>
                <td>454</td>
                <td>Fake Company</td>
                <td>Falsified</td>
                <td className="single line">
                  <span><i className="large unhide icon"></i></span>
                  <span><i className="large edit icon"></i></span>
                  <span><i className="large remove icon"></i></span>
                </td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
});
