import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

export default function Navbar() {

    let navigate = useNavigate();

    let location = useLocation();

    let handleLogout = () => {

        localStorage.removeItem('token');

        navigate("/login");

    };

    return (

        <>

            <nav className="navbar navbar-danger bg-danger fixed-top">

                <div className="container-fluid">

                    <Link className="navbar-brand text-white fw-bold" to="/">iNotebook App</Link>

                    <button className="navbar-toggler border border-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">

                        <span className="navbar-toggler-icon" />

                    </button>

                    <div className="offcanvas offcanvas-end bg-light" tabIndex={-1} id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">

                        <div className="offcanvas-header">

                            <h5 className="offcanvas-title text-dark fw-bold" id="offcanvasDarkNavbarLabel">iNotebook App</h5>

                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />

                        </div>

                        <div className="offcanvas-body">

                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

                                <li className="nav-item">

                                    <Link className={`nav-link text-success ${location.pathname === "/" ? "active fw-bold" : ""}`} aria-current="page" to="/">Home</Link>

                                </li>

                                <li className="nav-item">

                                    <Link className={`nav-link text-dark ${location.pathname === "/about" ? "active fw-bold" : ""}`} to="/about">About</Link>

                                </li>

                                { !localStorage.getItem('token') ? <div>

                                    <li className="nav-item">

                                        <Link className={`nav-link text-info ${location.pathname === "/login" ? "active fw-bold" : ""}`} to="/login">Login</Link>

                                    </li>

                                    <li className="nav-item">

                                        <Link className={`nav-link text-danger ${location.pathname === "/signup" ? "active fw-bold" : ""}`} to="/signup">Sign up</Link>

                                    </li>

                                </div> :

                                <li className="nav-item">

                                    <Link className="nav-link text-warning" onClick={handleLogout} to="/login">Log out</Link>

                                </li> }

                            </ul>

                        </div>

                    </div>

                </div>

            </nav>

        </>

    );

};
