import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-dark">
        <div className="container">
          <div className="row text-center">
            <div className="col-sm-3">
              <h5 className="text-white text-center my-4">Main Menu</h5>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Home
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Shopping
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Services
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="col-sm-3">
              <h5 className="text-white text-center my-4">Knowledge Base</h5>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Home
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Shopping
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Services
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="col-sm-3">
              <h5 className="text-white text-center my-4">Useful Links</h5>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Home
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Shopping
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Services
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="col-sm-3">
              <h5 className="text-white text-center my-4">Contact Us</h5>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Home
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Shopping
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Services
                </Link>
              </div>
              <div>
                <Link
                  to="/"
                  className="text-light text-decoration-none text-center"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-12 text-light text-center">
              Copyright ©2022 All rights reserved | This template is made with
              by CodeToFuture.com
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
