/*Component for Categories on the Admin view*/
Meteor.subscribe("categories");
CategoriesAdmin = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      categories: Categories.find({}).fetch()
    }
  },
  renderCategoriesOptions(){
    return this.data.categories.map((category) =>{
      return (
        <option key={category._id} value={category._id}>{category.name}</option>
      );
    });
  },
  renderCategories(){
    return this.data.categories.map((category) =>{
        return (
          <CategoryAdmin key={category._id} category={category}/>
        );
    });
  },
  onSubmit(event){
    event.preventDefault();
    var categoryObject = {
      name: event.target.name.value,
      description: event.target.description.value,
      parentCategory: event.target.category.value
    };
    Categories.insert(categoryObject);
    event.target.name.value= '';
    event.target.description.value= '';
    event.target.category.value= '';
  },
  render(){
    return(
      <div>
        <h1>Manage Categories</h1>
        <form onSubmit={this.onSubmit} className="ui form">
          <div className="field">
            <label>Name</label>
            <input type="text" name="name" placeholder="Name"/>
          </div>
          <div className="field">
            <label>Description</label>
            <input type="text" name="description" placeholder="Description"/>
          </div>
          <div className="field">
            <label>Parent Category</label>
            <select className="ui fluid dropdown" name="category">
              <option value=''>Choose your parent category</option>
              {this.renderCategoriesOptions()}
            </select>
          </div>
          <button className="ui button" type="submit">Submit</button>
        </form>
        <div>
          <div className="ui divider"></div>
          <h2>Categories</h2>
          <div className="ui divider"></div>
           <div className="ui two column grid">
             {this.renderCategories()}
           </div>
        </div>

      </div>
    );
  }
});
