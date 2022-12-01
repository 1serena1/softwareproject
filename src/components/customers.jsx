import React, { Component } from "react";
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
 
  function onClick() {
    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post("http://127.0.0.1:8000/api/add-to-cart",options)
        .then((response) => {
         console.log(response);
          if (response.status === 401) {
           console.log("ERRRORRR");
          }
          else if (response.status === 201) {
           console.log("SUCCESS")
            setTimeout(() => {
            }, 2000);
          }
        });
      });
  }


class Customers extends Component{
  render() {
    return (
      <div><button onClick={onClick()}> CLICK HERE </button></div>
  )
}
}
export default Customers;