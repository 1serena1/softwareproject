import React, { Component } from "react";
//import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./App.css";
import axios from 'axios';
import { BrowserRouter as Router, Route, NavLink ,Redirect, Switch } from "react-router-dom";
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.withCredentials = true;

class App extends Component {
  render() {
    let navLink = (
    <NavLink exact to="/register" activeClassName="activeLink" className="registerForm">
          Sign Up
        </NavLink>);
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route exact path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}
}

export default App;