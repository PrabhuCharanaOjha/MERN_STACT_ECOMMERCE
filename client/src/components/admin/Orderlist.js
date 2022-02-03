import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./partial/Navbar";

const Orderlist = () => {
  const { id } = useParams();
  const [admin, setAdmin] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const callAdminAuthentication = async () => {
      const admins = await axios.post(
        "http://localhost:8000/admin/authentication",
        null,
        {
          withCredentials: true,
        }
      );
      if (admins) {
        if (admins.data.error) {
          navigate("/login");
        } else {
          if (admins.data.isuser) {
            navigate("/cart");
          } else {
            setAdmin(admins.data);
          }
        }
      }
    };
    callAdminAuthentication();
  }, [navigate]);

  useEffect(() => {
    const callDashboardPage = async () => {
      const orders = await axios.get(
        `http://localhost:8000/getsingleorderdetails/${id}`
      );
      if (orders) {
        if (orders.data.error) {
        } else {
          if (orders.data) {
            setOrderDetails(orders.data);
            setProductDetails(orders.data.ProductDetails);
            setUserDetails(orders.data.UserDetails);
          }
        }
      }
    };
    callDashboardPage();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <h1 className="alert alert-success text-center shadow shadow-lg my-3 text-cursive">
            Hello Mr/Mrs {admin.username}, This Is User Order Details Area...
          </h1>

          {userDetails.map((userdetail, index1) => {
            return (
              <div
                className="col-sm-6 offset-sm-3 my-2 text-cursive"
                key={index1}
              >
                <div className="card text-center bg-secondary shadow">
                  <div className="card-header">User Details</div>
                  <div className="card-body">
                    <h5 className="card-title">{userdetail.username}</h5>
                    <p className="card-text">{userdetail.useremail}</p>
                    <button to="/" className="btn btn-outline-dark">
                      {orderDetails.orderdate}
                    </button>
                  </div>
                  <div className="card-footer text-light">{userdetail._id}</div>
                </div>
              </div>
            );
          })}

          <div className="col-sm-12 my-2">
            {productDetails.map((productdetail, index2) => {
              return (
                <div className="card mb-3 fw-bold shadow-lg" key={index2}>
                  <div className="row g-0 bg-light">
                    <div className="col-md-4">
                      <img
                        src={`http://localhost:8000/public/upload/${productdetail.productimage}`}
                        className="img-fluid rounded-start"
                        height={170}
                        width={170}
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          <span className="text-success text-cursive">
                            Product Name :-
                          </span>
                          {productdetail.productname}
                        </h5>
                        <p className="card-text">
                          <span className="text-success text-cursive">
                            Product Id :-
                          </span>
                          {productdetail._id} <br />
                          <span className="text-success text-cursive">
                            Product Price :-
                          </span>
                          {productdetail.productprice}
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            <span className="text-success text-cursive">
                              Product Quantity :-
                            </span>
                            {productdetail.productquantity}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row mt-5">
            <div className="col-sm-6 offset-sm-3 table-responsive">
              <table className="table table-borderless shadow">
                <thead>
                  <tr>
                    <th scope="row">
                      <h1>CART TOTALS</h1>
                    </th>
                  </tr>
                  <tr>
                    <th>Subtotal</th>
                    <th className="text-end">{orderDetails.totalprice}</th>
                  </tr>
                  <tr>
                    <th>Delivery</th>
                    <th className="text-end">40</th>
                  </tr>
                  <tr>
                    <th>Discount</th>
                    <th className="text-end">0</th>
                  </tr>
                </thead>
                <tbody className="border-dark border-top">
                  <tr>
                    <th>Total {orderDetails.totalitem} items proce : -</th>
                    <th scope="col" className="text-end">
                      {orderDetails.totalprice + 40}
                    </th>
                  </tr>
                </tbody>
              </table>
              <button
                type="submit"
                className="btn btn-primary form-control btn-block my-3 rounded-pill"
                // onClick={handleCheckOut}
              >
                Poceed to Checkout
              </button>
              <Link
                to="/dashboard"
                className="btn btn-outline-info form-control btn-block my-3 rounded-pill"
              >
                Back To Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderlist;
