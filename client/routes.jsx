/*Routers are needed to make the pages flow between each other. Keep that in mind*/
FlowRouter.route("/",{
  name: "Home",
  action(params){
    renderLayoutWith(<Home/>);
  }
});
FlowRouter.route("/login", {
  name: "LoginForm",
  action(params){
    renderLayoutWith(<LoginForm/>)
  }
});
FlowRouter.route("/register", {
  name: "RegisterForm",
  action(params){
    renderLayoutWith(<RegisterForm/>);
  }
});
FlowRouter.route("/admin",{
    name: "Admin",
    action(params){
      renderLayoutWith(<Admin/>);
    }
});
FlowRouter.route("/admin/products", {
  name: "ProductsAdmin",
  action(params){
    renderLayoutWith(<ProductsAdmin></ProductsAdmin>);
  }
});
FlowRouter.route("/admin/categories",{
  name: "CategoriesAdmin",
  action(params){
    renderLayoutWith(<CategoriesAdmin></CategoriesAdmin>)
  }
});
FlowRouter.route("/admin/manufacturers", {
  name: "ManufacturersAdmin",
  action(params){
    renderLayoutWith(<ManufacturersAdmin />);
  }
});
FlowRouter.route("/products/:productId", {
  name: "ProductDetails",
  action(params){
    renderLayoutWith(<ProductDetails product={params.productId} />);
  }
});
FlowRouter.route("/admin/brands", {
  name: "BrandsAdmin",
  action(params){
    renderLayoutWith(<BrandsAdmin />);
  }
});
FlowRouter.route("/shoppingCart", {
  name: "shoppingCart",
  action(params){
    renderLayoutWith(<MyCart />)
  }
});
FlowRouter.route("/checkout",{
  name: "Checkout",
  action(params){
    renderLayoutWith(<Checkout />);
  }
});
/*function to render all the layouts with the main Component (Layout)*/
function renderLayoutWith(component){
  ReactLayout.render(Main,{
    header: <Header/>,
    content: component,
    footer: <Footer/>
  });
};
