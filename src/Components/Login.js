import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';

export default function Login(props) {

    let navigate = useNavigate();

    let [credentials, setCredentials] = useState({ email: "", password: "" });

    // let email = document.querySelector("#email").value;

    // let password = document.querySelector("#password").value;

    // let error1 = document.querySelector(".error1");
    
    // let error2 = document.querySelector(".error2");

    // let formControl = document.querySelector(".form-control");

    // let setErrorMsg = (inputElement) => {

    //     let formControl = inputElement.parentElement;

    //     formControl.className = "error";

    // };

    // let setSuccessMsg = (inputElement) => {

    //     let formControl = inputElement.parentElement;

    //     formControl.className = "success";

    // };

    let handleSubmit = async (e) => {

        e.preventDefault();

        let response = await fetch("http://localhost:5000/api/auth/login", {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

            },

            body: JSON.stringify({ email: credentials.email, password: credentials.password })

        });

        let json = await response.json();

        if (json.success) {

            localStorage.setItem('token', json.authToken);

            props.showAlert("Have Successfully Logged in", "success");
            
            navigate("/");
            
        } 
        
        else {

            props.showAlert("Have Passed Invalid Details", "danger");

        }

    };

    let onChange = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value });

    };

    return (

        <>

            <div className="container my-5">

                <div className="row align-items-center justify-content-center">

                    <div className="col-12">

                        <div className="card my-5" style={{border: ""}}>

                            <div className="card-header">

                                <h3 className="card-title mt-1">Log in to iNotebook</h3>

                            </div>

                            <form className='' onSubmit={handleSubmit}>

                                <div className="card-body">

                                    <div className="input-group mb-3">

                                        <div className="input-group flex-nowrap">

                                            <span className="input-group-text" id="addon-wrapping"><i className="fas fa-envelope" /></span>

                                            <input

                                                type="email"
                                                value={credentials.email}
                                                className="form-control py-2"
                                                placeholder="Enter Your Email Address"
                                                id='email'
                                                name='email'
                                                onChange={onChange}
                                                aria-label="email"
                                                aria-describedby="addon-wrapping" />

                                                <small className='error1'></small>

                                        </div>

                                    </div>

                                    <div className="input-group mb-3">

                                        <div className="input-group flex-nowrap">

                                            <span className="input-group-text" id="addon-wrapping"><i className="fas fa-key" /></span>

                                            <input

                                                type="password"
                                                value={credentials.password}
                                                className="form-control py-2"
                                                placeholder="Enter Your Pasword"
                                                id='password'
                                                name='password'
                                                onChange={onChange}
                                                aria-label="password"
                                                aria-describedby="addon-wrapping" />

                                                <small className='error2'></small>

                                        </div>

                                    </div>

                                    <div className="link-group">

                                        <div className="login">

                                            <button className="btn btn-outline-info px-3 p-2">Log in</button>

                                        </div>

                                        <div className="signup mt-2">

                                            <Link className='text-decoration-none text-dark' to="/signup"> Don't have an account? </Link> <Link to="/signup" className="btn btn-outline-danger px-3 mx-2 p-2">Sign Up</Link>

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
