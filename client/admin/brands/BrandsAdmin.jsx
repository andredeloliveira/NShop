Meteor.subscribe("brands");
BrandsAdmin = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      brands: Brands.find({}).fetch()
    }
  },
  brandsRender(){
    return this.data.brands.map( (brand) => {
      return (
        <BrandAdmin key={brand._id} brand={brand} />
      );
    });
  },
  onSubmit(event){
    event.preventDefault();
    newBrandObj = {
      name: event.target.name.value
    };
    var images = this.refs.images.returnFiles();
    var imageObj = Images.insert(images[0], (err, fileObj) => {
        if(err){
          console.error("image not added due to", err.reason);
        }
        return fileObj;
    });
    newBrandObj.image = imageObj;
    Brands.insert(newBrandObj);
    event.target.name.value = '';
    this.refs.images.cleanImages();
  },
  render(){
    return (
      <div>
        <h1>Manage Brands</h1>
        <form onSubmit={this.onSubmit} className="ui form" >
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name"/>
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
      { this.data.brands ?
      <div>
        <div className="ui divider"></div>
        <h2>Brands</h2>
         <div className="ui two column grid">
           {this.brandsRender()}
         </div>
      </div>   : ''}
     </div>
    );
  }
});
