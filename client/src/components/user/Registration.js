import React from "react";
import axios from "axios";
import { useState } from "react";
import Header from "./partial/Header";
import Footer from "./partial/Footer";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // registration process
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data = {
        username: name,
        useremail: email,
        userpassword: Number(password),
      };
      const user = await axios.post(
        `http://localhost:8000/getdata/${data.useremail}`
      );
      if (Object.keys(user.data).length === 0) {
        await axios
          .post("http://localhost:8000/registration", data)
          .then(
            setName(""),
            setEmail(""),
            setPassword(""),
            setSuccessMessage("Thank You....Register successfully")
          );
      } else {
        if (data.useremail === user.data[0].useremail) {
          alert("email exist...");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              {successMessage ? (
                <h1 className="alert alert-success fw-bold text-center my-2 shadow-lg">
                  {successMessage} <br />
                  You Can LogIn Now...
                </h1>
              ) : null}
              <div className="container mb-4" id="registratrion">
                <h1 className="text-center text-cursive fw-bold mt-5 mb-4">
                  Create an Account
                </h1>
                <div className="row">
                  <div className="col-sm-6 offset-sm-3">
                    <form
                      action=""
                      className="shadow-lg p-4"
                      method="POST"
                      onSubmit={handleSubmit}
                    >
                      <div className="form-group mt-3">
                        <i className="fas fa-user"></i>
                        <label htmlFor="name" className="font-weight-bold">
                          Name
                        </label>
                        <input
                          type="text"
                          name="Name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          className="form-control rounded-pill"
                          placeholder="Plz Enter Your Name...."
                        />
                      </div>
                      <div className="form-group mt-3">
                        <i className="fas fa-envelope-open-text"></i>
                        <label htmlFor="email" className="font-weight-bold">
                          Email
                        </label>
                        <input
                          type="email"
                          name="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          className="form-control rounded-pill"
                          placeholder="Plz Enter Your email...."
                        />
                        <small>
                          We'll never share your email with anyone else.
                        </small>
                      </div>
                      <div className="form-group mt-3">
                        <i className="fas fa-key"></i>
                        <label htmlFor="password" className="font-weight-bold">
                          Password
                        </label>
                        <input
                          type="password"
                          name="Password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          className="form-control rounded-pill"
                          placeholder="Plz Enter Your Password...."
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-danger form-control btn-block mt-5 font-weight-bold rounded-pill"
                        name="signup"
                      >
                        Sign Up
                      </button>
                      <small>
                        <i>
                          Note - By clicking Sign Up, you agree to our Terms,
                          Data Policy and Cookie Policy.
                        </i>
                      </small>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Registration;
