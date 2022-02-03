import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./partial/Footer";
import Navbar from "./partial/Navbar";

const Dashboard = () => {
  const [admin, setAdmin] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
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
      const orders = await axios.get("http://localhost:8000/getorderdetails");
      if (orders) {
        if (orders.data.error) {
          console.log("No Data Found...");
        } else {
          if (orders.data) {
            setOrderDetails(orders.data);
          }
        }
      }
    };
    callDashboardPage();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <h1 className="alert alert-success text-center shadow shadow-lg my-3 text-cursive">
            Hello Mr/Mrs {admin.username}, This Is Your Dashboard...
          </h1>
          <div className="col-sm-12">
            <ol className="list-group list-group-numbered">
              {orderDetails.map((orderdetail, index1) => {
                return orderdetail.UserDetails.map((userdetail, index2) => {
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between align-items-start list-group-item-action "
                      key={index2}
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          <span className="text-success text-cursive">
                            user id : -
                          </span>
                          {userdetail._id}
                        </div>
                        <span className="text-danger text-cursive">
                          user email : -
                        </span>
                        {userdetail.useremail}
                      </div>
                      <Link
                        to={`/shippingout/${orderdetail._id}`}
                        className="btn btn-outline-info my-auto me-2 shadow"
                      >
                        Procced to Shipping Out
                      </Link>
                      <span className="badge bg-danger rounded-pill">
                        {orderdetail.totalitem}
                      </span>
                    </li>
                  );
                });
              })}
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
