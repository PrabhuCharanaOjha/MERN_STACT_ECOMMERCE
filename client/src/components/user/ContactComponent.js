import React from "react";
import Iframe from "react-iframe";

const ContactComponent = () => {
  return (
    <>
      <div className="container-fluid my-5">
        <div className="container">
          <div className="row">
            <h1 className="text-center text-warning fw-bold text-cursive">
              <u>Contact Us</u>
            </h1>
            <div className="col-sm-6 p-5">
              <Iframe
                url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59797.23137623824!2d85.92026823263028!3d20.49281869040798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19139db385524d%3A0xaf3450376375ba0e!2sCodetofuture!5e0!3m2!1sen!2sin!4v1642262817499!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
              />
            </div>
            <div className="col-sm-6 p-5">
              <form action="" method="post">
                <div className="form-group mt-3">
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    name="Name"
                    id=""
                    className="form-control shadow"
                    placeholder="Please Enter Your Name..."
                    aria-describedby="helpId"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    name="Email"
                    id=""
                    className="form-control shadow"
                    placeholder="Please Enter Your Email..."
                    aria-describedby="helpId"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="Message">Message</label>
                  <textarea
                    name="Message"
                    id=""
                    className="form-control shadow"
                    placeholder=""
                    aria-describedby="helpId"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-success form-control shadow btn-block my-5"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactComponent;
