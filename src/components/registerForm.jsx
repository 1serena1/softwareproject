import React, { Component } from "react";
import Joi from "joi-browser";
//import Form from "./common/form";
import {Link, useHistory} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

const options = {
  headers: {
       //'Authorization': this.state.Authorization,
       'content-type': 'application/json',
       'Accept':'application/json',
       'xsrfHeaderName': 'X-CSRF-TOKEN',
       },
  data: {gcm_id: 1}
  };
  //const history = useHistory();
export default class RegisterForm extends Component {

  userData;
  constructor(props) {
    super(props);
    this.state = {
      signupData: {
        name: "",
        dateOfBirth: "",
        email: "",
        number: "",
        county: "",
        city: "",
        address: "",
        password: "",
        pass_conf: "",
        //isLoading: "",
      },
      msg: "",
    };
  }
  onChangehandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    axios.get('/sanctum/csrf-cookie').then(response => {
    axios
      .post("http://127.0.0.1:8000/api/register", this.state.signupData,  options)
      .then((response) => {
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
          localStorage.setItem('auth_token', response.data.token);
          localStorage.setItem('auth_name', response.data.customer);
          this.setState({
            msg: response.data.message,
            signupData: {
              name: "",
              dateOfBirth: "",
              email: "",
              number: "",
              county: "",
              city: "",
              address: "",
              password: "",
              pass_conf: "",
            },
          });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);

          
        }

        if (response.data.status === "failed") {
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
        <Form className="containers shadow">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="name"
              name="name"
              placeholder="Enter name"
              value={this.state.signupData.name}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="dateofbirth"> date of birth</Label>
            <Input
              type="dateofbirth"
              name="dateOfBirth"
              placeholder="Enter date of birth"
              value={this.state.signupData.dateOfBirth}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email id</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.signupData.email}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="number">Phone Number</Label>
            <Input
              type="number"
              name="number"
              placeholder="Enter phone number"
              value={this.state.signupData.number}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="county">county</Label>
            <Input
              type="county"
              name="county"
              placeholder="Enter county"
              value={this.state.signupData.county}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">city</Label>
            <Input
              type="city"
              name="city"
              placeholder="Enter city"
              value={this.state.signupData.city}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">address</Label>
            <Input
              type="address"
              name="address"
              placeholder="Enter address"
              value={this.state.signupData.address}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.signupData.password}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="pass_conf">PasswordConfirmation</Label>
            <Input
              type="pass_conf"
              name="pass_conf"
              placeholder="Enter password confirmation"
              value={this.state.signupData.pass_conf}
              onChange={this.onChangehandler}
            />
          </FormGroup>
          <p className="text-white">{this.state.msg}</p>
          <Button
            className="text-center mb-4"
            color="success"
            onClick={this.onSubmitHandler}
          >
            Sign Up
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm ml-5"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <span></span>
            )}
          </Button>
          <Link to="/register" className="text-white ml-5">I'm already member</Link>
        </Form>
      </div>
    );
  }


  // state = {
  //   data: { username: "", password: "", name: "", newname:"" },
  //   errors: {}
  // };

  // schema = {
  //   username: Joi.string()
  //     .required()
  //     .email()
  //     .label("Username"),
  //   password: Joi.string()
  //     .required()
  //     .min(5)
  //     .label("Password"),
  //   name: Joi.string()
  //     .required()
  //     .label("Name"),
  //   newname:Joi.string()
  //     .required()
  //     .label("New Name")
  // };

  // doSubmit = () => {
  //   // Call the server
  //   console.log("Submitted");
  // };

  // render() {
  //   return (
  //     <div>
  //       <h1>Register</h1>
  //       <form onSubmit={this.handleSubmit}>
  //         {this.renderInput("username", "Username")}
  //         {this.renderInput("password", "Password", "password")}
  //         {this.renderInput("name", "Name")}
  //         {this.renderInput("newname", "New Name")}
  //         {this.renderButton("Register")}
  //       </form>
  //     </div>
  //   );
  // }
}

//export default RegisterForm;
