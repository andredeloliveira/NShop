/*Meteor subscribe is necessary to get the data from MiniMongo to the UI*/

Home = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    let query = {};
    /*here all products are being returned for the sake of testing*/
    return {
      products: Products.find(query).fetch()
    }
  },
  /*Simple render for the product*/
  productsRender(){
    return this.data.products.map((product) => {
      return (<Product key={product._id} product={product} />);
    });
  },
  render(){
    return(
      <div>
        <h1>Products for sale</h1>
        <div className="ui three column grid">
          {this.productsRender()}
        </div>
      </div>

    );
  }
});
