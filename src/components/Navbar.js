import React from 'react';
import './Navbar.css';
import './title.css';
import { Link } from 'react-router-dom';
import Logo from '../Assests/Logo.png';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fantastic-gradient" style={{
      padding: '1rem 2rem 1rem 0.5rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  borderBottom: '1px solid #e0e0e0',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
}}>
      <div className="container-fluid d-flex align-items-center" id="Tat" >
        <div className="tat">
          <Link className="navbar-brand fw-bold" to="/">
          <img
            src={Logo} 
            alt="GenAi Logo"
            style={{
            height: '99%',}}
          />
           <span id="tit">Progen Ai</span>
        </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item-1">
              <Link id="hello" className="nav-link" aria-current="page" to="/" >
                Home
              </Link>
            </li>
            <li className="nav-item-2">
              <Link id="hello" className="nav-link" to="/Features" >
                Features
              </Link>
            </li>
            <li className="nav-item-3">
              <Link id="hello" className="nav-link" to="/About" >
                About
              </Link>
            </li>
          </ul>


        </div>
      </div>
    </nav>
  );
}

