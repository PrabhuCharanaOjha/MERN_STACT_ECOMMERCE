import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./partial/Footer";
import Header from "./partial/Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { useremail: email, userpassword: password };
    const user = await axios.post("http://localhost:8000/checklogin", data, {
      withCredentials: true,
    });
    if (Object.keys(user.data).length === 0) {
      alert("Check Email Id And Password...");
    } else {
      if (user.data.useremail === email) {
        if (user.data.isuser) {
          navigate("/Cart");
        } else {
          navigate("/dashboard");
        }
      } else {
        alert("somthing went wrong...");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid my-5">
        <div className="container">
          <h1 className="text-center mt-5 text-cursive">
            WelCome To <span className="text-danger fw-bold">PROJECT ECOM</span>
          </h1>
          <h2 className="text-center mt-3">Login to your account</h2>
          <div className="row">
            <div className="col-sm-6 offset-sm-3">
              <form
                action=""
                className="shadow-lg mt-5 p-4"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div className="text-center">
                  <i className="fa fa-user-secret fa-7x" aria-hidden="true"></i>
                </div>
                <div className="form-group text-center mt-3">
                  <i className="fas fa-user"></i>
                  <label htmlFor="email" className="">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    name="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="form-control rounded-pill"
                    placeholder="Please Enter Your Email...."
                  />
                </div>
                <div className="form-group text-center">
                  <i className="fas fa-key"></i>
                  <label htmlFor="password" className="">
                    Admin Password
                  </label>
                  <input
                    type="password"
                    name="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control rounded-pill"
                    placeholder="Please Enter Your Password...."
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary form-control btn-block mt-5 rounded-pill"
                  name="Login"
                >
                  login
                </button>
                <div className="form-row">
                  <div className="col">
                    <button
                      type="reset"
                      className="btn btn-warning form-control btn-block mt-2 rounded-pill"
                      name="Login"
                    >
                      Reset Fields
                    </button>
                  </div>
                  <div className="col">
                    <Link
                      to="/"
                      className="btn btn-danger form-control btn-block mt-2 rounded-pill"
                    >
                      Back To Home
                    </Link>
                  </div>
                </div>
                <div className="text-center my-2">Forget Password</div>
                <div></div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
