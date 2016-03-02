EditManufacturer = React.createClass({


  onSubmit(event){
    event.preventDefault();
    newManufacturerObj = {
      name: event.target.name.value,

    };

    Manufacturers.update({_id: this.props.manufacturer._id}, {$set:
      {
        'name': newCategoryObj.name
      }
    });
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
          <h1>Update Manufacturer</h1>
          <form onSubmit={this.onSubmit} className="ui form" >
            <div className="field">
              <label>Name</label>
              <input type="text" name="name" placeholder="Name" defaultValue={this.props.manufacturer.name}/>
            </div>
            <button className="ui button" type="submit">Update</button>
         </form>
       </div>
      );
  }
});
