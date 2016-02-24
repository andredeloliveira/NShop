EditProduct = React.createClass({

  getInitialState(){
    return {
      files: []
    }
  },
  onDrop(files){
    this.setState({
      files: files
    });
  },
  onOpenClick(){
    this.refs.dropzone.open();
  },
  imagesRender(){
    return this.state.files.map((file)=>{
      return (
        <div>
        <img src={file.preview} key={file.name + file.preview} className="adminImage"/>
        </div>
      );
    });
  },
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
      price : event.target.price.value
    };
    /*for now only one image... I'll be working on this, to upload many images at once.*/
    if(this.state.files.length > 0){
      var fileObj = Images.insert(this.state.files[0], (err, fileObj) => {
          if(err){
            console.error('error during insert');
          }else{
            return fileObj;
          }
      });
      newProductObj.image = fileObj;
    }else {
      newProductObj.image = this.props.product.image;
    }
    Products.update({_id: this.props.product._id}, {$set:
      {
        'name': newProductObj.name,
        'description': newProductObj.description,
        'weight': newProductObj.weight,
        'height': newProductObj.height,
        'width': newProductObj.width,
        'length': newProductObj.length,
        'price': newProductObj.price,
        'image': newProductObj.image
      }
    });
    /*after everything, closes the modal*/
    this.props.close();
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
        <h4 className="ui dividing header">Size</h4>
        <div className="three fields">
          <div className="field">
            <input type="text" placeholder="Height" name="height" defaultValue={this.props.product.height}/>
          </div>
          <div className="field">
            <input type="text" placeholder="Width" name="width"  defaultValue={this.props.product.width}/>
          </div>
          <div className="field">
            <input type="text" placeholder="Length" name="length" defaultValue={this.props.product.length}/>
          </div>
        </div>
        <div className="field">
            <label>Price</label>
            <input type="text" placeholder="Price" name="price" defaultValue={this.props.product.price}/>
        </div>
        <div className="field">
          <label>Image</label>
          <div>
            <h1>Pictures</h1>
            <br></br>
            <div>
              <img src={this.props.product.image.url()} className="adminImage" />
            </div>
          </div>
          <div>
            <Dropzone ref="dropzone" onDrop={this.onDrop}>
              <div> Try dropping some files here, or click to select files to upload</div>
            </Dropzone>
            {this.state.files ? <div>
              {this.imagesRender()}
            </div> : null }
          </div>
          </div>
        <button className="ui button" type="submit" >Update</button>
     </form>

   </div>
  );
  }
});
