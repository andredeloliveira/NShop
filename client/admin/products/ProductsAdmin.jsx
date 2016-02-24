/*This file will be responsible for the rendering and manipulation of the product in the admin area*/
Meteor.subscribe("images");
Meteor.subscribe("products");
ProductsAdmin = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    let query = {};
    return {
      products: Products.find({}).fetch()
    }
  },
  productsRender(){
    return this.data.products.map((product) =>{
      return (
          <ProductAdmin key={product._id} product={product} />
      );
    });
  },
  onSubmit(event){
    event.preventDefault();
    var productObject = {
       name : event.target.name.value,
       description : event.target.description.value,
       weight : event.target.weight.value,
       height : event.target.height.value,
       width : event.target.width.value,
       length : event.target.length.value,
       price : event.target.price.value
    };
    /*save the image in the DB and get the related URL*/
    var fileObj = Images.insert(this.state.files[0], (err, fileObj) => {
        if(err){
          console.error('error during insert');
        }else{
          return fileObj;
        }
    });
    /*add the image object into it*/
    productObject.image = fileObj;
    /*insert into the db*/
    Products.insert(productObject, (err) =>{
      if(err){
        console.log(err.reason);
      }else {
        console.log('sucess!');
      }
    });
  },
  onDrop(files){
    console.log(files);
    this.setState({
      files: files
    });
  },
  onCropComplete(crop){
    console.log(crop);
  },
  getInitialState(){
    return {
      files: []
    }
  },
  onOpenClick(){
    this.refs.dropzone.open();
  },
  imagesRender(){
    return this.state.files.map((file)=>{
      return (
        <div>
        <img src={file.preview} className="adminImage" key={file.name + file.preview} />
        </div>
      );
    });
  },
  render(){
    return(
      <div>
        <h1>Manage Products</h1>
        <form onSubmit={this.onSubmit} className="ui form">
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name"/>
          </div>
          <div className="field">
            <label>Description</label>
            <input type="text" name="description" placeholder="Description"/>
          </div>
          <div className="field">
            <label>Weight</label>
            <input type="text" placeholder="Weight" name="weight"/>
          </div>
          <h4 className="ui dividing header">Size</h4>
          <div className="three fields">
            <div className="field">
              <input type="text" placeholder="Height" name="height" />
            </div>
            <div className="field">
              <input type="text" placeholder="Width" name="width" />
            </div>
            <div className="field">
              <input type="text" placeholder="Length" name="length" />
            </div>
          </div>
          <div className="field">
              <label>Price</label>
              <input type="text" placeholder="Price" name="price"/>
          </div>
          <div className="field">
            <label>Images</label>
            <div>
              <Dropzone ref="dropzone" onDrop={this.onDrop}>
                <div> Try dropping some files here, or click to select files to upload</div>
              </Dropzone>
              {this.state.files ? <div>
                {this.imagesRender()}
              </div> : null }
            </div>
            <div>

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
