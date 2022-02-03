import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const logout = await axios.get("http://localhost:8000/logout", {
      withCredentials: true,
    });
    if (logout) {
      if (logout.data.message) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="container-fluid bg-dark">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
            <h1 className="text-cursive">Admin Area</h1>
          </Link>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Addproduct">
                  Add Product
                </Link>
              </li>
            </ul>
            <div className="dropdown me-2">
              <Link
                to="/"
                className="d-flex align-items-center justify-content-center p-2 link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser3"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/profile.png"}
                  alt="profile.jpg"
                  width="34"
                  height="34"
                  className="rounded-circle"
                />
              </Link>
              <ul
                className="dropdown-menu text-small shadow"
                aria-labelledby="dropdownUser3"
              >
                <li>
                  <Link className="dropdown-item" to="/">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="btn btn-danger dropdown-item"
                    onClick={logout}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
