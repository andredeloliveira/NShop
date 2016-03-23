Shipping = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      loadingGmaps : ! GoogleMaps.loaded(),
    }
  },
  toShoppingCart(event){
    event.preventDefault();
    FlowRouter.go("shoppingCart");
  },
  onSubmit(event){
    event.preventDefault();
    var shippingInfo = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      address: {
        route: event.target.route.value,
        street_number: event.target.street_number.value,
        postal_code: event.target.postal_code.value,
        state: event.target.administrative_area_level_1.value,
        country: event.target.country.value,
        city: event.target.locality.value
      },
      owner: Meteor.user()._id
    };
    var si = ShippingInfos.insert(shippingInfo, (err, id) => {
      if(err){
        console.error(err.reason);
      }else{
        return id;
      }
    });
    /*clean the form after adding the new Shipping info*/
    event.target.firstName.value = '';
    event.target.lastName.value = '';
    event.target.route.value= '';
    event.target.street_number.value = '';
    event.target.postal_code.value = '';
    event.target.administrative_area_level_1.value = '';
    event.target.country.value = '';
    event.target.locality.value = '';
    console.log(si);
  },
  geolocate(event){
    event.preventDefault();
    $('#autocomplete').geocomplete({details: "form"});
  },
  render(){
    if(this.data.loadingGmaps){
      return <LoadingSpinner />
    }
    return(
    <div>
      <div>
        <ExistingShippingInfo ref="existingInfo" />
      </div>
      <form onSubmit={this.onSubmit} className="ui form">
        <h4 className="ui dividing header">Register a new shipping information</h4>
        <div className="field">
          <label>Name</label>
          <div className="two fields">
            <div className="field">
              <input type="text" name="firstName" placeholder="First Name" />
            </div>
            <div className="field">
              <input type="text" name="lastName" placeholder="Last Name" />
            </div>
          </div>
        </div>
        <div className="field">
          <label>Type your address</label>
          <div className="field">
            <input id="autocomplete" type="text"  placeholder="Type your address..."  onFocus={this.geolocate}/>
          </div>
          <div className="field">
            <label>Street Address</label>
          </div>
          <div className="fields">
            <div className="ten wide field">
              <input type="text" name="route" placeholder="Street Address" />
            </div>
            <div className="three wide field">
              <input type="text" name="street_number" placeholder="Number"/>
            </div>
            <div className="three wide field">
              <input type="text" name="postal_code" placeholder="Postal Code" />
            </div>
          </div>
        </div>
        <div className="three fields">
          <div className="field">
            <label>State/Province</label>
            <input type="text" name="administrative_area_level_1" placeholder="State"/>
          </div>
          <div className="field">
            <label>Country</label>
              <input type="text" name="country" placeholder="Country"/>
          </div>
          <div className="field">
            <label>City</label>
            <input type="text" name="locality" placeholder="City"/>
          </div>
        </div>
          <div className="field">
            <input type="submit" className="ui button" value="Register Address"/>
          </div>
      </form>
      <div className="ui divider"></div>
  </div>
  );
  }
});
