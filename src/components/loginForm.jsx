import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import axios from "axios";

const options = {
  headers: {
       'content-type': 'application/json',
       'Accept':'application/json',
       'xsrfHeaderName': 'X-CSRF-TOKEN',
       },
  data: {gcm_id: 1}
  };
  
  
  
class LoginForm extends Form {
  
  state = {
    data: { email: "", password: "" },
    errors: {},
    extra:{msg: "", isLoading: false,redirect: false,
    errMsgEmail: "",
    errMsgPwd: "",
    errMsg: "" }
  };
  

 schema = {
    email: Joi.string()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // Call the server
    console.log("Submitted");
    // e.preventDefault();
     this.setState({ isLoading: true });
     axios.get('/sanctum/csrf-cookie').then(response => {
     axios
       .post("http://127.0.0.1:8000/api/login", this.state.data,  options)
       .then((response) => {
        console.log(response);
         this.setState({ isLoading: false });
         if (response.status === 401) {
          alert("Can't Log in");
          console.log("ERRRORRR");
         }
         if (response.status === 201) {
          window.location.assign("/movies");
          console.log("logged in")
        //  redirect: true;
          alert("Logged in");
           localStorage.setItem('auth_token', response.data.token);
           localStorage.setItem('auth_name', response.data.customer);
           localStorage.setItem("isLoggedIn", true);
           localStorage.setItem("userData", JSON.stringify(response.data.data));
           this.setState({
             msg: response.data.message,
             data: {
               email: "",
               password: ""
             },
           });
           setTimeout(() => {
             this.setState({ msg: "" });
           }, 2000);
         }
 
         if (response.status === "failed") {
           this.setState({ msg: response.data.message });
           setTimeout(() => {
             this.setState({ msg: "" });
           }, 2000);
         }
       });
       
     });
  
    
   
   };

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
