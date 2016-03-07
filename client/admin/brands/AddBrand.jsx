Meteor.subscribe("manufacturers");
AddBrand = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      manufacturers: Manufacturers.find({}).fetch()
    }
  },
  manufacturersOptionsRender(){
    return this.data.manufacturers.map( (manufacturer) => {
      return( <option key={manufacturer._id} value={manufacturer._id}>
                {manufacturer.name}
              </option>
            );
    });
  },
  onSubmit(event){
    event.preventDefault();
    newBrandObj =  {
      name: event.target.name.value,
      manufacturer: event.target.manufacturer.value,
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
    Brands.insert(newBrandObj);
    event.target.name.value= '';
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
            <input type="text" name="name" placeholder="Name"/>
          </div>
          <div className="field">
            <label>Logo</label>
            <div className="ui divider"></div>
            <div className="ui four column grid">
              <ImageField ref="images"/>
            </div>
          </div>
          <div className="field">
            <label>Manufacturer</label>
            <select className="ui fluid dropdown" name="manufacturer">
              <option value="">Choose One</option>
              {this.manufacturersOptionsRender()}
            </select>
          </div>
          <button className="ui button" type="submit">Submit</button>
       </form>
     </div>
    );
  }
});
