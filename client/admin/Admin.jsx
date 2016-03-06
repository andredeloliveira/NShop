Meteor.subscribe("products");
Meteor.subscribe("categories");
Meteor.subscribe("manufacturers");
Meteor.subscribe("brands");

Admin = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      products: {
        name: 'products',
        object: Products.find({}).fetch(),
        columns: ['Name', 'Description']
      },
      categories: {
        name: 'categories',
        object: Categories.find({}).fetch(),
        columns: ['Name', 'Description']
      },
      manufacturers: {
        name: 'manufacturers',
        object: Manufacturers.find({}).fetch(),
        columns: ['Name', 'Description']
      },
      brands: {
        name: 'brands',
        object: Brands.find({}).fetch(),
        columns: ['Name', 'Description']
      }
    }
  },
  categoriesHeader() {
    return (
      <tr>
        { this.data.categories.columns.map((column) => {
            return (
              <th> { column }</th>
            );
          })
        }
        <th></th>
      </tr>
    );
  },
  categoriesBody(){
    return this.data.categories.object.map((category) =>{
        return (
          <tr>
            <td>{ category.name }</td>
            <td>{ category.description }</td>
            <td className="single line center aligned">
              <a href="#"><i className="large unhide icon"></i></a>
              <a href="#"><i className="large edit icon"></i></a>
              <a href="#"><i className="large remove icon"></i></a>
            </td>
          </tr>
        );
    });
  },
  menuItems() {
    var items = [
      { name: 'Products', icon: 'shop icon', class: "item",
        size: this.data.products.object.length },

      { name: 'Categories', icon: 'unordered list icon', class: "active item",
        size: this.data.categories.object.length },

      { name: 'Manufacturers', icon: 'configure icon', class: "item",
        size: this.data.manufacturers.object.length },

      { name: 'Brands', icon: 'barcode icon', class: "item",
        size: this.data.brands.object.length },

      { name: 'Promotions', icon: 'announcement icon', class: "item",
        size: 0 },

      { name: 'Videos', icon: 'film icon', class: "item",
        size: 0 }
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
            <h1 className="ui center aligned header">Categories</h1>

            <a className="ui vertical animated primary button" tabindex="0" href="/admin/categories">
              <div className="hidden content">Add</div>
              <div className="visible content">
                <i className="plus icon"></i>
              </div>
            </a>
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
