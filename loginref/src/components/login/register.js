import React, { useState, useRef } from "react";
import loginImg from "../../login.svg";
import {Button} from '@material-ui/core';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';

function Register()  {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    
    
    // const [abc, setAbc] = useState('');


    const validator = useRef(new SimpleReactValidator({
      

      validators: {
        pass: {
          message: 'Should have match',
          rule: (val, params, validator) => {
           // console.log(document.getElementById('pass'))
            return val === (document.getElementById('pass')) && params.indexOf(val) === -1;
          },
          messageReplace: (message, params) => message.replace(':values', this.helpers.toSentence(params)),  // optional
          required: true  // optional
        }
      }
    }));

    const submitForm = (e)=> {
      e.preventDefault();
      if (validator.current.allValid()) {
            let request = {
              UserName : name,
              Email: email,
              Password: password,
              ConfirmPassword: confirmPassword
            }
          console.log(request)
          //  if(request.Password === request.ConfirmPassword){
              axios.post('http://localhost:5000/reg', request)
              
              .then( resp => {
                console.log(resp);
              })
              .catch( err => {
                console.log(err);
              })
           // } 
          // //  else {
          //     return "Password doesnt match";
          //     console.log('0--------------------------------------------------------')
           
          //    validator.current.showMessages();
          // //  }
      } 
      else {
        console.log('if not valid')
        validator.current.showMessages();
      }
    }
    return (
      <div className="base-container">
        <div className="header">Register</div>
            <div className="content">
            <div className="image">
              <img src={loginImg} />
            </div>
          <div className="form">
            <form id="FormSub" >
              <div className="form-group">
                <label htmlFor="username">Username</label>
                < input 
                  type="text" 
                  value={name}
                  placeholder="name" 
                  onChange={e => setName(e.target.value)}
                  onBlur={() => validator.current.showMessageFor('name')}
                />
                {validator.current.message('name', name, 'required', { className: 'text-danger' })}
             </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                < input
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email"
                    onBlur={() => validator.current.showMessageFor('email')}
                  />
                  {validator.current.message('email', email, 'required|email', { className: 'text-danger' })}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  id="pass"
                  type="password" 
                  placeholder="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onBlur={() => validator.current.showMessageFor('password')}
                />
                {validator.current.message('password', password, 'required|alpha_num', { className: 'text-danger--------' })}
              </div>

              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  placeholder="confirm password"
                  value={confirmPassword}
                  onChange={e => setconfirmPassword(e.target.value)}
                  onBlur={() => validator.current.showMessageFor('confirmPassword')}
                  id="confirmpass"
                />
                {validator.current.message('confirmPassword', confirmPassword, 'required|pass', { className: 'text-danger' })}
              </div>





              {/* <div className="form-group">
                <label htmlFor="abc">Confirm Password</label>
                <input
                  type="text"
                  placeholder="type abc"
                  value={abc}
                  onChange={e => setAbc(e.target.value)}
                  onBlur={() => validator.current.showMessageFor('abc')}
                  id="abc"
                />
                {validator.current.message('abc', abc, 'required|abcVal', { className: 'text-danger' })}
              </div> */}






              <div className="footer">
                <Button  type="submit" className="btn" onClick={submitForm} variant="contained" color="primary">
                    Register
                </Button>
             </div>
          </form>
         </div>
        </div>
      </div>
    );
}

export default Register;



  

