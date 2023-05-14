import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';

export default function Signup(props) {

  let navigate = useNavigate();

  let [credentials, setCredentials] = useState(
    
    { 
      
      name: "", 
      
      email: "", 
      
      password: "", 
      
      confirmPassword: "" 
    
    });

  let handleSubmit = async (e) => {

    e.preventDefault();

    let response = await fetch("http://localhost:5000/api/auth/createuser", {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify(
        
        { 
          
          name: credentials.name, 
          
          email: credentials.email, 
          
          password: credentials.password, 
          
          confirmPassword: credentials.confirmPassword 
        
        })

    });

    let json = await response.json();

    if (json.success) {

      localStorage.setItem('token', json.authToken);

      navigate("/login");

      props.showAlert("Have Successfully Created Your Account", "success");

    } 
    
    else {

      props.showAlert("Invalid Credentials", "danger");

    };

  };

  let onChange = (e) => {

    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  };

  return (

    <>

      <div className="container my-5">

        <div className="row align-items-center justify-content-center">

          <div className="col-12">

            <div className="card my-5">

              <div className="card-header">

                <h3 className="card-title mt-1">Create a new account</h3>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="card-body">

                  <div className="input-group mb-3">

                    <div className="input-group flex-nowrap">

                      <span className="input-group-text" id="addon-wrapping"><i className="fas fa-user" /></span>

                      <input

                        type="text"
                        className="form-control py-2"
                        placeholder="Enter Your Full Name"
                        id='name'
                        name='name'
                        onChange={onChange}
                        required
                        aria-label="text"
                        aria-describedby="addon-wrapping" />

                    </div>

                  </div>

                  <div className="input-group mb-3">

                    <div className="input-group flex-nowrap">

                      <span className="input-group-text" id="addon-wrapping"><i className="fas fa-envelope" /></span>

                      <input

                        type="email"
                        className="form-control py-2"
                        placeholder="Enter Your Email Address"
                        id='email'
                        name='email'
                        onChange={onChange}
                        required
                        aria-label="email"
                        aria-describedby="addon-wrapping" />

                    </div>

                  </div>

                  <div className="input-group mb-3">

                    <div className="input-group flex-nowrap">

                      <span className="input-group-text" id="addon-wrapping"><i className="fas fa-key" /></span>

                      <input

                        type="password"
                        className="form-control py-2"
                        placeholder="Enter Your Password"
                        id='password'
                        name='password'
                        onChange={onChange}
                        required
                        minLength={5}
                        aria-label="email"
                        aria-describedby="addon-wrapping" />

                    </div>

                  </div>

                  <div className="input-group mb-3">

                    <div className="input-group flex-nowrap">

                      <span className="input-group-text" id="addon-wrapping"><i className="fas fa-key" /></span>

                      <input

                        type="password"
                        className="form-control py-2"
                        placeholder="Enter Your Confirm Password"
                        id='confirmPassword'
                        name='confirmPassword'
                        onChange={onChange}
                        required
                        minLength={5}
                        aria-label="email"
                        aria-describedby="addon-wrapping" />

                    </div>

                  </div>

                  <div className="link-group">

                    <div className="signup">

                      <button className="btn btn-outline-danger px-3 py-2">Sign Up</button>

                    </div>

                    <div className="login mt-2">

                      <Link className='text-decoration-none text-dark' to="/login"> Already have an account? </Link> <Link to="/login" className="btn btn-outline-info px-3 mx-2 py-2">Log in</Link>

                    </div>

                  </div>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </>

  );

};
