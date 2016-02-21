/*Meteor subscribe is necessary to get the data from MiniMongo to the UI*/

Home = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    let query = {};
    /*all the properties returned by this method, work like a helper, being
    avaliable into this.data.[property]*/
    return {
      products: Products.find(query).fetch()
    }
  },
  render(){
    return(
      <h1>Welcome home, my son!</h1>
    );
  }
});
