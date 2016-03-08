Meteor.subscribe("images");
Meteor.subscribe("brands");
Meteor.subscribe("categories");

AddProduct = React.createClass({
mixins: [ReactMeteorData],
getMeteorData(){
  return{
    brands: Brands.find({}).fetch(),
    categories: Categories.find({}).fetch()
  }
},
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
    /*get all the values again, into the object*/
    var newProductObj = {
      name: event.target.name.value,
      description: event.target.description.value,
      weight : event.target.weight.value,
      height : event.target.height.value,
      width : event.target.width.value,
      length : event.target.length.value,
      price : event.target.price.value,
      stock: event.target.stock.value,
      brand: event.target.brand.value,
      category: event.target.category.value,
      rating: {
        avgRate: 0,
        nRates: 0
      },
      images: [],
      colors: []
    };
    /*adds the images to the database.. I think it can be refactored to a
    single function that returns an Array with all the added images, but
    we still need to add the component to add into the db and another one for
    image buckets such as s3, etc*/
    var images = this.refs.images.returnFiles();
    var colors = this.refs.colors.returnFiles();
    if(images.length > 0) {
      newProductObj.images = addImagesToDB(images);
    }
    if(colors.length > 0){
      newProductObj.colors= addImagesToDB(colors);
    }

    Products.insert(newProductObj);

    event.target.name.value = '';
    event.target.description.value = '';
    event.target.weight.value = '';
    event.target.height.value = '';
    event.target.width.value = '';
    event.target.length.value = '';
    event.target.price.value = '';
    event.target.stock.value = '';

    /*after everything, closes the modal*/
    this.props.close();
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
  render(){
    style ={
      marginTop: '30px',
      marginLeft: '30px',
      marginRight: '30px',
      marginBottom: '50px'
    };
    return(
    <div style={style}>
      <h1>Add Products</h1>
      <form onSubmit={this.onSubmit} className="ui form" >
        <div className="field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" />
        </div>
        <div className="field">
          <label>Description</label>
          <input type="text" name="description" placeholder="Description"/>
        </div>
        <div className="field">
          <label>Weight</label>
          <input type="text" placeholder="Weight" name="weight" />
        </div>
        <h4 className="ui dividing header">Size(cm)</h4>
        <div className="three fields">
          <div className="field">
            <input type="number" placeholder="Height" name="height" />
          </div>
          <div className="field">
            <input type="number" placeholder="Width" name="width"/>
          </div>
          <div className="field">
            <input type="number" placeholder="Length" name="length" />
          </div>
        </div>
        <div className="field">
            <label>Price</label>
            <input type="text" placeholder="Price" name="price" />
        </div>
        <div className="field">
            <label>Quantity in Stock</label>
            <input type="number" placeholder="Quantity in Stock" name="stock"  />
        </div>
        <div className="field">
            <label>Brand</label>
            <select className="ui fluid dropdown" name="brand">
              <option value="">Choose One</option>
              {this.brandsOptionsRender()}
            </select>
        </div>
        <div className="field">
            <label>Category</label>
              <select className="ui fluid dropdown" name="category">
                <option value="">Choose One</option>
                {this.categoriesOptionsRender()}
              </select>
        </div>
        <div className="field">
          <label>Images</label>
          <div>
            <ImageField ref="images" />
          </div>
          </div>
          <div className="field">
            <label>Colors</label>
            <div>
              <ImageField ref="colors" />
            </div>
            </div>
        <button className="ui button" type="submit" >Add</button>
     </form>

   </div>
  );
  }
});
