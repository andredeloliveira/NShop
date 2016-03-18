Shipping = React.createClass({

  /*Shipping address, shipping method, documents needed, listinha só com nome e preço dos itens..
  tem que por um nome em color.. senão vai ser dificil saber qual cor foi pedida!*/
  render(){
    return(
      <form className="ui form">
        <h4 className="ui dividing header">Shipping Information</h4>
        <div className="field">
          <label>Name</label>
          <div className="two fields">
            <div className="field">
              <input type="text" name="first-name" placeholder="First Name" />
            </div>
            <div className="field">
              <input type="text" name="last-name" placeholder="Last Name" />
            </div>
          </div>
        </div>
        <div className="field">
          <label>Billing Address</label>
          <div className="fields">
            <div className="twelve wide field">
              <input type="text" name="adress" placeholder="Street Address" />
            </div>
            <div className="four wide field">
              <input type="text" name="details" placeholder="Details" />
            </div>
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>State</label>
            <select className="ui fluid dropdown">
              <option value="">State/Province</option>
            </select>
          </div>
          <div className="field">
            <label>Country</label>
            <div className="ui fluid search selection dropdown">
              <input type="hidden" name="country" />
              <i className="dropdown icon"></i>
              <div className="default text">Select Country</div>
              <div className="menu">
                <div className="item" data-value="af"><i className="af flag"></i>Afghanistan</div>
              </div>
            </div>
          </div>
        </div>
      </form>
  );
  }
});
