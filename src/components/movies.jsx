import React, { Component } from "react";
import _ from "lodash";
import axios from "axios";

class Movies extends Component {
  state = {
    flight: [],
    loading: true,
  };

  async componentDidMount() {
      const res= await axios.get('http://127.0.0.1:8000/api/Flight');
      console.log(res);     
      if(res.status===200)
      {
        console.log(res.flight)
        this.setState({
        flight:res.data.flight,
       loading:false,
      });
    }
  }
  render() {
      var flight_HTML_table="";
   
    if(this.state.loading){
      flight_HTML_table=<h2>loading</h2>
    }
    else{
      
      flight_HTML_table=
      this.state.flight.map((item)=>{
        return(
          <div class="card">
          <div class="card-image">
              <figure class="image is-4by3">
                  <img src='photo1.jpg' alt="Placeholder image"></img>
              </figure>
          </div>
          <div class="card-content">
              <p class="title product-title">From: {item.from} <br></br> To: {item.destination}</p>

              <div class="content">
                  DepartOn: {item.departON}
                  <br></br>
                  ReturnOn: {item.returnOn}
                  <br></br>
                  NumberOfStops: {item.numberOfStops}
              </div>
              <a class="button is-primary" href="product.html" target="_blank">
                  <strong>More Details</strong>
              </a>
          </div>
      </div>
        )
      });
    }
      return (
      <div>
          {flight_HTML_table}
      </div>
  );
      }
    }
export default Movies;
