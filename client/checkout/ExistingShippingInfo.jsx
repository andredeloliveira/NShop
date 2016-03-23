ExistingShippingInfo = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
   var existingInfoHandler = Meteor.subscribe("shipping");
   return {
     isLoading: ! existingInfoHandler.ready(),
     existingInfo: ShippingInfos.find({}).fetch()
   }
  },
  remove(){
    ShippingInfos.remove({_id: infoId}, (err, id) => {
      if(err)
        console.error("problem removing item");
      });
  },
  getExistingInfo(event){
    console.log(event.target.value);
    return event.target.value;
  },
  infoRender(){
    return this.data.existingInfo.map( (info, index) => {
      return (
        <div className="item" key={index}>
          <div className="content">
            <div className="header">
              <h3>{info.firstName + ' ' + info.lastName + ' '}
                <a href="" onClick={this.remove.bind(this, info._id)}>
                  <i className="remove icon" title={'remove address'}></i>
                </a>
              </h3>
            </div>
            <div className="description">
              <p><i className="map marker icon"></i> {info.address.route + ', ' + info.address.street_number + ' - ' +
                info.address.city + ' - ' + info.address.state + ' - ' + info.address.country}
                <br></br>
                <i className="mail outline icon"></i> {info.address.postal_code}
              </p>
            </div>
            <div className="ui radio checkbox">
              <input type="radio" name="thisOne" id="thisOne" value={info._id} onChange={this.getExistingInfo} /> <label>Use this address</label>
            </div>
          </div>
        </div>
      );
    });
  },
  render(){
    if(this.data.isLoading){
      return <LoadingSpinner />
    }
    console.log(this.data.existingInfo);
    return (
      <div>
        <h3>Select an existing shipping information</h3>
        <div className="ui item">
          {this.infoRender()}
        </div>
      </div>
    );
  }
});
