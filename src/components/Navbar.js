import React from 'react';

export default function Navbar(props) {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: 'linear-gradient(90deg, #ffffff 0%, #f0f4ff 100%)',
        padding: '1rem 2rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        borderBottom: '1px solid #e0e0e0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="/" style={{ fontSize: '1.5rem', color: '#333' }}>
          {props.title || 'Gen AI'}
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ gap: '1rem' }}>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/" style={{ color: '#555' }}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/" style={{ color: '#555' }}>
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: '#555' }}
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="/" aria-disabled="true">
                Disabled
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
                  paddingLeft: '2rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  backgroundColor: '#f9f9f9',
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

