/*This file will be responsible for the rendering and manipulation of the product in the admin area*/
Meteor.subscribe("images");
Meteor.subscribe("products");
Meteor.subscribe("categories");
Meteor.subscribe("brands");
ProductsAdmin = React.createClass({
  mixins: [ReactMeteorData],
  getInitialState(){
    return {
      updated:false
    }
  },
  getMeteorData(){
    let query = {};
    return {
      products: Products.find({}).fetch(),
      brands: Brands.find({}).fetch(),
      categories: Categories.find({}).fetch()
    }
  },

  productsRender(){
    return this.data.products.map((product) =>{
      return (
          <ProductAdmin key={product._id} product={product} />
      );
    });
  },
  brandsOptionsRender(){
    return this.data.brands.map((brand) => {
      return (
          <option key={brand._id} value={brand._id}>
            {brand.name}
          </option>
      );
    });
  },
  categoriesOptionsRender(){
    return this.data.categories.map( (category) => {
      return(
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
      );
    });
  },
  /*We still need validations on the fields*/
  onSubmit(event){
    event.preventDefault();
    function addImagesToDB(images){
      var imagesToBeInserted = [];
      for(var i =0; i< images.length; i++){
        var pImage = Images.insert(images[i], (err, fileObj) => {
          if(err){
            console.error('duh');
          }else {
            console.log(pImage);
            return fileObj;
          }
        });
        imagesToBeInserted.push(pImage);
      }
      return imagesToBeInserted;
    }
    var productObject = {
       name : event.target.name.value,
       description : event.target.description.value,
       weight : event.target.weight.value,
       height : event.target.height.value,
       width : event.target.width.value,
       length : event.target.length.value,
       price : event.target.price.value,
       stock: event.target.stock.value,
       brand: event.target.brand.value,
       category: event.target.category.value,
       rating: [],
       images: []
    };
    /*adds the images to the database.. I think it can be refactored to a
    single function that returns an Array with all the added images, but
    we still need to add the component to add into the db and another one for
    image buckets such as s3, etc*/
    var images = this.refs.images.returnFiles();
    var colors = this.refs.colors.returnFiles();
    /*add colors and images*/
    productObject.images = addImagesToDB(images);
    productObject.colors = addImagesToDB(colors);
    console.log(productObject);

    /*add the image object into it*/
    //productObject.image = fileObj;
    /*insert into the db*/
    Products.insert(productObject, (err) =>{
      if(err){
        console.log(err.reason);
      }else {
        console.log('sucess!');
      }
    });
    /*after that, clean the data on the form*/
    event.target.name.value = '';
    event.target.description.value = '';
    event.target.weight.value = '';
    event.target.height.value = '';
    event.target.width.value = '';
    event.target.length.value = '';
    event.target.price.value = '';
    event.target.stock.value = '';
    this.setState({updated: true});
    this.refs.images.cleanImages();
    this.refs.colors.cleanImages();

  },
  onDrop(files){
    console.log(files);
    this.setState({
      files: files
    });
  },

  render(){

    return(
      <div>
        <h1>Manage Products</h1>
        <form onSubmit={this.onSubmit} className="ui form" >
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name"/>
          </div>
          <div className="field">
            <label>Description</label>
            <input type="text" name="description" placeholder="Description"/>
          </div>
          <div className="field">
            <label>Weight(g)</label>
            <input type="number" placeholder="Weight" name="weight"/>
          </div>
          <h4 className="ui dividing header">Size(cm)</h4>
          <div className="three fields">
            <div className="field">
              <input type="number" placeholder="Height" name="height" />
            </div>
            <div className="field">
              <input type="number" placeholder="Width" name="width" />
            </div>
            <div className="field">
              <input type="number" placeholder="Length" name="length" />
            </div>
          </div>
          <div className="field">
              <label>Price</label>
              <input type="text" placeholder="Price" name="price"/>
          </div>
          <div className="field">
              <label>Quantity in Stock</label>
              <input type="number" placeholder="Quantity in Stock" name="stock"/>
          </div>
          <div className="field">
              <label>Brand</label>
              <select className="ui fluid dropdown" name="brand">
                {this.brandsOptionsRender()}
              </select>
          </div>
          <div className="field">
              <label>Category</label>
              <select className="ui fluid dropdown" name="category">
                {this.categoriesOptionsRender()}
              </select>
          </div>
          <div className="field">
            <label>Images</label>
            <div className="ui divider"></div>
            <div className="ui four column grid">
              <ImageField ref="images"/>
            </div>
          </div>
          <div className="field">
            <label>Colors (Images)</label>
            <div className="ui divider"></div>
            <div className="ui four column grid">
              <ImageField ref="colors"/>
            </div>
          </div>
          <button className="ui button" type="submit">Submit</button>
       </form>
      { this.data.products ?
      <div>
        <div className="ui divider"></div>
        <h2>Products</h2>
         <div className="ui two column grid">
           {this.productsRender()}
         </div>
      </div>   : ''}
     </div>
    );
  }
});
