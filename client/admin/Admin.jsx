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
  categoriesHeader() {
    return (
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th></th>
      </tr>
    );
  },
  categoriesBody(){
    return this.data.categories.map((category) =>{
        return (
          <tr>
            <td>{ category.name }</td>
            <td>{ category.description }</td>
            <td className="single line">
              <span><i className="large unhide icon"></i></span>
              <span><i className="large edit icon"></i></span>
              <span><i className="large remove icon"></i></span>
            </td>
          </tr>
        );
    });
  },
  menuItems() {
    var items = [
      { name: 'Products', icon: 'shop icon', size: this.data.products.length, class: "active item" },
      { name: 'Categories', icon: 'unordered list icon', size: this.data.categories.length, class: "item" },
      { name: 'Manufacturers', icon: 'configure icon', size: this.data.manufacturers.length, class: "item" },
      { name: 'Brands', icon: 'barcode icon', size: this.data.brands.length, class: "item" },
      { name: 'Promotions', icon: 'announcement icon', size: 0, class: "item" },
      { name: 'Videos', icon: 'film icon', size: 0, class: "item" }
    ];
    return (
      <div className="ui vertical pointing menu">
        { items.map((item) => {
            return (
              <a className={ item.class }>
                <span><i className={ item.icon } ></i></span>
                { item.name }
                <div className="ui label"> { item.size } </div>
              </a>
            );
          })
        }
      </div>
    );
  },
  render(){
    return(
      <div className="ui grid">
        <div className="four wide column">
          { this.menuItems() }
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
                { this.categoriesHeader() }
              </thead>
              <tbody>
                { this.categoriesBody() }
              </tbody>
            </table>

          </div>
        </div>
      </div>
    );
  }
});
