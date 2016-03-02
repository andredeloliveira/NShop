/*Component for Categories on the Admin view*/
Meteor.subscribe("images");
Meteor.subscribe("manufacturers")
ManufacturersAdmin = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      manufacturers: Manufacturers.find({}).fetch()
    }
  },
  renderManufacturers(){
    return this.data.manufacturers.map((manufacturer) =>{
        return (
          <ManufacturerAdmin key={manufacturer._id} manufacturer={manufacturer} />
        );
    });
  },
  onSubmit(event){
    event.preventDefault();
    var manufacturerObject = {
      name: event.target.name.value,
    };

    Manufacturers.insert(manufacturerObject);
    console.log("sucess!", manufacturerObject);
    event.target.name.value= '';
  },
  render(){
    return(
      <div>
        <h1>Manage Manufacturers</h1>
        <form onSubmit={this.onSubmit} className="ui form">
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name"/>
          </div>
          <button className="ui button" type="submit">Submit</button>
        </form>
        <div>
          <div className="ui divider"></div>
          <h2>Manufacturers</h2>
          <div className="ui divider"></div>
           <div className="ui two column grid">
             {this.renderManufacturers()}
           </div>
        </div>

      </div>
    );
  }
});
