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
/*function to render all the layouts with the main Component (Layout)*/
function renderLayoutWith(component){
  ReactLayout.render(Main,{
    header: <Header/>,
    content: component,
    footer: <Footer/>
  });
};
