import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = (props) => {
  const [user, setUser] = useState([]);
  const [crtPN, setCrtPN] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const callAboutPage = async () => {
      const users = await axios.post(
        "http://localhost:8000/authentication",
        null,
        {
          withCredentials: true,
        }
      );
      if (users) {
        if (!users.data.error) {
          setUser(users.data);
        }
      }
    };
    callAboutPage();
  }, [navigate]);

  const logout = async () => {
    const logout = await axios.get("http://localhost:8000/logout", {
      withCredentials: true,
    });
    if (logout) {
      if (logout.data.message) {
        setUser("");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    setCrtPN(props.data);
  }, [props]);

  return (
    <>
      <div className="container-fluid bg-dark">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand text-warning fw-bold" to="/">
              PROJECT ECOM
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shopping">
                    Shopping
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Registration">
                    Registation
                  </Link>
                </li>

                {user.isuser ? (
                  <>
                    <li className="nav-item">
                      <Link to="/getorderdetails" className="nav-link">
                        Orederd
                      </Link>
                    </li>
                    <li className="nav-item">
                      <div
                        className="nav-link btn btn-danger text-white"
                        onClick={logout}
                      >
                        Logout
                      </div>
                    </li>
                  </>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/Login">
                      Login
                    </Link>
                  </li>
                )}
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2 rounded-0"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
              <Link
                to="/Cart"
                className="btn btn-warning ms-2 position-relative"
              >
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {crtPN}
                </span>
                <i className="fas fa-shopping-cart"></i>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
