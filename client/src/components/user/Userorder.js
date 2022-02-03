import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./partial/Header";

const Userorder = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const callAuthentication = async () => {
      const users = await axios.post(
        "http://localhost:8000/authentication",
        null,
        {
          withCredentials: true,
        }
      );
      if (users) {
        if (users.data.error) {
          navigate("/login");
        } else {
          if (users.data.isuser) {
            setUser(users.data);
          } else {
            navigate("/login");
          }
        }
      }
    };
    callAuthentication();
  }, [navigate]);

  useEffect(() => {
    const callGetOrderData = async () => {
      const orders = await axios.get(
        `http://localhost:8000/getsingleuserorderdetails/${user.useremail}`
      );
      if (orders) {
        if (orders.data.error) {
        } else {
          if (orders.data) {
            setProductDetails(orders.data);
          }
        }
      }
    };
    callGetOrderData();
  }, [user]);

  console.log(productDetails);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <h1 className="alert alert-success text-center shadow shadow-lg my-3 text-cursive">
            Hello Mr/Mrs {user.username}, This Is User Order Details Area...
          </h1>

          <div className="col-sm-12 my-2">
            {productDetails.map((productDetail, index1) => {
              return productDetail.ProductDetails.map(
                (productdetail, index2) => {
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
                }
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Userorder;
