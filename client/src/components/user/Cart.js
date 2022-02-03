import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./partial/Footer";
import Header from "./partial/Header";

const Cart = () => {
  const [successMessage, setSuccessMessage] = useState("");

  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  let i = 1;

  let initcart;
  if (localStorage.getItem("cartList") === null) {
    initcart = [];
  } else {
    initcart = JSON.parse(localStorage.getItem("cartList"));
  }
  const [cartList, setCartList] = useState(initcart);
  const [totalitem, setTotalitem] = useState(0);
  const [totalprice, setTotalprice] = useState(0);

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
    if (localStorage.getItem("cartList")) {
      setCartList(JSON.parse(localStorage.getItem("cartList")));
    }
  }, []);

  // increment
  const increment = (quantity) => {
    if (quantity) {
      let updatecart = cartList.map((crntitm) => {
        if (crntitm._id === quantity) {
          let pdctprc = crntitm.productprice / crntitm.productquantity;
          return {
            ...crntitm,
            productquantity: crntitm.productquantity + 1,
            productprice: crntitm.productprice + pdctprc,
          };
        }
        return crntitm;
      });

      return setCartList(updatecart);
    }
  };

  // decrement
  const decrement = (quantity) => {
    if (quantity) {
      let updatecart = cartList
        .map((crntitm) => {
          if (crntitm._id === quantity) {
            let pdctprc = crntitm.productprice / crntitm.productquantity;

            return {
              ...crntitm,
              productquantity: crntitm.productquantity - 1,
              productprice: crntitm.productprice - pdctprc,
            };
          }
          return crntitm;
        })
        .filter((crntitm) => {
          return crntitm.productquantity !== 0;
        });

      return setCartList(updatecart);
    }
  };

  // delete //
  const handleDelete = (product) => {
    setCartList(
      cartList.filter((e) => {
        return e !== product;
      })
    );
  };

  // define total item and total price
  useEffect(() => {
    let totalitems = cartList.reduce((accum, crntval) => {
      return (accum += crntval.productquantity);
    }, 0);
    setTotalitem(totalitems);

    let totalprices = cartList.reduce((accum, crntval) => {
      return (accum += crntval.productprice);
    }, 0);
    setTotalprice(totalprices);

    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  const handleCheckOut = async () => {
    const productcheckout = {
      userdetails: user,
      productdetails: cartList,
      totalprice: totalprice,
      totalitem: totalitem,
    };
    await axios
      .post("http://localhost:8000/adduserorderdetails", productcheckout)
      .then(
        setSuccessMessage("Thank You For Buying The Product..."),
        setCartList([])
      );
  };

  return (
    <>
      <Header />
      <div className="container-fluid my-5">
        <div className="container">
          <div className="row">
            {successMessage ? (
              <h1 className="alert alert-success fw-bold text-center my-2 shadow-lg">
                {successMessage}
              </h1>
            ) : null}
            <h3 className="text-center text-success fw-bold">
              Welcome mr/mrs {user.username}, this is your cart
            </h3>
            <div className="col-12 table-responsive">
              <table className="table table-striped table-hover text-center table-hover">
                <thead className="table-dark text-light">
                  <tr>
                    <th scope="col">SL. NO.</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">PRODUCT NAME</th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col">REMOVE</th>
                  </tr>
                </thead>
                <tbody>
                  {cartList.map((product, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{i++}</th>
                        <td>
                          <img
                            src={`http://localhost:8000/public/upload/${product.productimage}`}
                            alt=""
                            height="130"
                            width="100"
                          />
                        </td>
                        <td>{product.productname}</td>
                        <td>
                          <form className="d-flex">
                            <button
                              type="button"
                              className="btn btn-warning rounded-0"
                              onClick={() => {
                                decrement(product._id);
                              }}
                            >
                              <i className="fas fa-minus"></i>
                            </button>

                            <input
                              type="number"
                              style={{ width: 50 }}
                              placeholder={product.productquantity}
                              readOnly={true}
                            />
                            <button
                              type="button"
                              className="btn btn-primary rounded-0"
                              onClick={() => {
                                increment(product._id);
                              }}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </form>
                        </td>

                        <td>
                          {product.productprice}
                        </td>
                        <td>
                          <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={() => {
                              handleDelete(product);
                            }}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
                    <th className="text-end">{totalprice}</th>
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
                    <th>Total {totalitem} items proce : -</th>
                    <th scope="col" className="text-end">
                      {totalprice + 40}
                    </th>
                  </tr>
                </tbody>
              </table>
              <button
                type="submit"
                className="btn btn-primary form-control btn-block my-3 rounded-pill"
                onClick={handleCheckOut}
              >
                Poceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
