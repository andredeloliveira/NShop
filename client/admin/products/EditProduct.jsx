Meteor.subscribe("images");


EditProduct = React.createClass({

  onSubmit(event){
    event.preventDefault();
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
      manufacturer: event.target.manufacturer.value,
      category: event.target.category.value
    };
    /*adds the images to the database.. I think it can be refactored to a
    single function that returns an Array with all the added images, but
    we still need to add the component to add into the db and another one for
    image buckets such as s3, etc*/
    var images = this.refs.images.returnFiles();
    var imagesToBeInserted = [];
    for(var i =0; i< images.length; i++){
      var pImage = Images.insert(images[i], (err, fileObj) => {
        if(err){
          console.error('duh');
        }else {
          return fileObj;
        }
      });
      imagesToBeInserted.push(pImage);
    }
    newProductObj.images = imagesToBeInserted;

    Products.update({_id: this.props.product._id}, {$set:
      {
        'name': newProductObj.name,
        'description': newProductObj.description,
        'weight': newProductObj.weight,
        'height': newProductObj.height,
        'width': newProductObj.width,
        'length': newProductObj.length,
        'price': newProductObj.price,
        'stock': newProductObj.stock,
        'manufacturer' : newProductObj.manufacturer,
        'category' : newProductObj.category,
        'images': newProductObj.images
      }
    });
    /*after everything, closes the modal*/
    this.props.close();
  },
  actualImagesRender(){
    return this.props.product.images.map((image, index)=>{
      return <img key={index} src={image.url()} className="adminImage" />
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
      <h1>Manage Products</h1>
      <form onSubmit={this.onSubmit} className="ui form" >
        <div className="field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" defaultValue={this.props.product.name}/>
        </div>
        <div className="field">
          <label>Description</label>
          <input type="text" name="description" placeholder="Description" defaultValue={this.props.product.description}/>
        </div>
        <div className="field">
          <label>Weight</label>
          <input type="text" placeholder="Weight" name="weight" defaultValue={this.props.product.weight}/>
        </div>
        <h4 className="ui dividing header">Size(cm)</h4>
        <div className="three fields">
          <div className="field">
            <input type="number" placeholder="Height" name="height" defaultValue={this.props.product.height}/>
          </div>
          <div className="field">
            <input type="number" placeholder="Width" name="width"  defaultValue={this.props.product.width}/>
          </div>
          <div className="field">
            <input type="number" placeholder="Length" name="length" defaultValue={this.props.product.length}/>
          </div>
        </div>
        <div className="field">
            <label>Price</label>
            <input type="text" placeholder="Price" name="price" defaultValue={this.props.product.price}/>
        </div>
        <div className="field">
            <label>Quantity in Stock</label>
            <input type="number" placeholder="Quantity in Stock" name="stock" defaultValue={this.props.product.stock} />
        </div>
        <div className="field">
            <label>Manufacturer</label>
            <input type="text" placeholder="Manufacturer" name="manufacturer" defaultValue={this.props.product.manufacturer}/>
        </div>
        <div className="field">
            <label>Category</label>
            <input type="text" placeholder="Category" name="category" defaultValue={this.props.product.category}/>
        </div>
        <div className="field">
          <label>Images</label>
          <div>
            <h1>Actual Pictures</h1>
            <br></br>
            <div>
              {this.actualImagesRender()}
            </div>
          </div>
          <div>
            <ImageField ref="images" />
          </div>
          </div>
        <button className="ui button" type="submit" >Update</button>
     </form>

   </div>
  );
  }
});
