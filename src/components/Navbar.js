import React from 'react';
import './Navbar.css';
import './title.css';

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg fantastic-gradient" style={{
  padding: '1rem 2rem 1rem 0.5rem',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  borderBottom: '1px solid #e0e0e0',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
}}>
      <div className="container-fluid" id="Tat">
        <div className="tat">
          <a className="navbar-brand fw-bold" id="Tit" href="/">
          {props.title}
        </a>

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

        </div>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" >
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/" >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" >
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" >
                Pricing
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" >
                About
              </a>
            </li>
          </ul>

          <form className="d-flex align-items-center" role="search" style={{ gap: '0.5rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{
                  paddingLeft: '1rem',
                  borderRadius: '10px',
                  border: '1px solid rgb(35 255 0)',
                  backgroundColor: '#f9f9f9',
                  color: '#333',
                }}
              />
            </div>
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
