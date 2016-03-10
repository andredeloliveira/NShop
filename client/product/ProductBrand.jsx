ProductBrand = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    var brandHandle = Meteor.subscribe("brands");
    return {
      brand: Brands.findOne(this.props.brand)
    }
  },
  render(){
    return(
      <a href={'/brands/'+this.data.brand.name}>
        {this.data.brand.name}
      </a>
    )
  }
});
