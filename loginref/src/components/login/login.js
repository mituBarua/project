import React from "react";
import ReactDOM from 'react-dom';
import loginImg from "../../login.svg";
import {Button} from '@material-ui/core';
import axios from 'axios';

export class Login extends React.Component {
//   constructor(props) {
//     super(props);
//   }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt='log in image' />
          </div>
          <div className="form">

          <form>
             <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="text" id="emailInputId" name="email" placeholder="email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="passwordId" name="password" placeholder="password" />
              </div>
              <div className="footer">
                <Button onClick={(e)=> {login(e)}} className="btn" variant="contained" color="primary">
                  Login
                </Button>
              </div>
        </form>
        </div>
          {/* <button type="button" className="btn">
            Login
          </button> */}
        </div>
      </div>
    );
  }
}

function login(e)  {
  e.preventDefault();
  let request = {
    email: document.getElementById('emailInputId').value,
    password: document.getElementById('passwordId').value
  }
  axios.post('http://localhost:5000/login', request)
  .then( resp => {
    alert(resp.data.message);
  })
  .catch( err => {
    console.log(err);
  })
}
