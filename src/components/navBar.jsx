import axios from "axios";
import React from "react";
import { Link, NavLink, Redirect, withRouter} from "react-router-dom";


const NavBar = () => {

  const logoutSubmit = (e) =>{
    e.preventDefault();

    axios.post("http://127.0.0.1:8000/api/logout").then(res =>{
      if(res.data.status ===200)
      {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        window.location.assign("/movies");
        
      }
      else{

      }

    })
  }

  var AuthButtons = '';
  if(!localStorage.getItem('auth_token')){
    AuthButtons=(
      <ul className="navbar-nav">
        <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink>
      </ul>
    );
  }
  else{
    AuthButtons=(<button type="button" onClick={logoutSubmit} className="nav-item btn btn-danger btn-sm text-white" >
    Logout
  </button>);
  }



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/movies">
            Tickets
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            Profile
          </NavLink>
          {AuthButtons}
          
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
