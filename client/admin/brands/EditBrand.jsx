EditBrand = React.createClass({
  onSubmit(event){
    event.preventDefault();
    newBrandObj =  {
      name: event.target.name.value,
      image : this.props.brand.image
    };

    var images = this.refs.images.returnFiles();
    if(images.length > 0){
        var imageObj = Images.insert(images[0], (err, fileObj) =>{
          if(err){
            console.error(err.reason);
          }
          return fileObj;
        });
        newBrandObj.image = imageObj;
    }
    Brands.update({_id: this.props.brand._id}, {$set: {
      'name': newBrandObj.name,
      'image': newBrandObj.image
    }});
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
        <h1>Edit Brand</h1>
        <form onSubmit={this.onSubmit} className="ui form" >
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" defaultValue={this.props.brand.name}/>
          </div>
          <div className="field">
            <label>Brand</label>
            <div className="ui divider"></div>
            <div className="ui four column grid">
              <ImageField ref="images"/>
            </div>
          </div>
          <button className="ui button" type="submit">Submit</button>
       </form>
     </div>
    );
  }
});
