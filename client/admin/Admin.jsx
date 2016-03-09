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
        columns: ['Name', 'Manufacturer']
      }
    }
  },
  getInitialState(){
    return {
      showMe: 0
    }
  },
  showItem(index,event){
    this.setState({
      showMe: index
    });
  },
  renderChosenOption(){
    var result = null;
    switch (this.state.showMe) {
      case 0:
        result = <ProductsAdmin products={this.data.products} />;
        break;
      case 1:
        result = <CategoriesAdmin categories={this.data.categories} />;
        break;
      case 2:
        result = <ManufacturersAdmin manufacturers={this.data.manufacturers} />;
        break;
      case 3 :
        result = <BrandsAdmin brands={this.data.brands} /> ;
        break;
      case 4:
        result = <div><h1>Promotions</h1></div>;
        break;
      case 5:
        result = <div><h1>Videos</h1></div>;
        break;
      default:
        result = null;
        break;
    }
    return result;
  },
  menuItems() {

    var items = [
      { name: 'Products', icon: 'shop icon', class: "item",
        size: this.data.products.object.length },

      { name: 'Categories', icon: 'unordered list icon', class: "item",
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
        { items.map((item, index) => {
          if(this.state.showMe === index){
            item.class = "active item";
          }
            return (
              <a key={item.name} className={ item.class } id={item.name} index={index} onClick={this.showItem.bind(this, index)}  >
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
              {this.renderChosenOption()}
          </div>
        </div>
      </div>
    );
  }
});
