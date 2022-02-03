import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "./partial/Footer";
import Header from "./partial/Header";

const Shopping = () => {
  let i = 1;
  const [productList, setProductList] = useState([]);
  let initcart;
  if (localStorage.getItem("cartList") === null) {
    initcart = [];
  } else {
    initcart = JSON.parse(localStorage.getItem("cartList"));
  }
  const [cartList, setCartList] = useState(initcart);

  useEffect(() => {
    async function getProductList() {
      try {
        const productLists = await axios.get(
          "http://localhost:8000/getproductlist"
        );
        setProductList(productLists.data);
      } catch (error) {
        console.log(error);
      }
    }
    getProductList();
  }, []);

  const handleaddcart = (product) => {
    setCartList([...cartList, product]);
  };
  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cartList));
  }, [cartList]);

  cartList.map(() => {
    return i++;
  });

  return (
    <>
      <Header data={i} />
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body bg-warning">
              <span className="text-cursive text-danger fw-bold">
                Thank You For Buying Product
              </span>
              <button
                type="button"
                className="btn-close float-end"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="container">
          <div className="row">
            <h1 className="text-center text-warning fw-bold">Best Sellers</h1>
            {productList.map((product, index) => {
              return (
                <div className="col-sm-6 col-lg-3" key={index}>
                  <div className="card imgzoomin m-3 shadow shadow">
                    <img
                      src={`http://localhost:8000/public/upload/${product.productimage}`}
                      className="card-img-top imgzoomin shadow"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        {product.productname}
                      </h5>
                      <h5 className="text-success text-center">
                        Product Price ${product.productprice}
                      </h5>
                      <div className="form-row">
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-warning form-control btn-block mt-2 rounded-pill shadow"
                            onClick={() => {
                              handleaddcart(product);
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Add To Cart
                          </button>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-danger form-control btn-block mt-2 rounded-pill shadow"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}{" "}
          </div>
          <hr />
          <hr />
          <div className="row">
            {productList.map((product, index) => {
              return (
                <div className="col-sm-6 col-lg-3" key={index}>
                  <div className="card imgzoomin m-3 shadow shadow">
                    <img
                      src={`http://localhost:8000/public/upload/${product.productimage}`}
                      className="card-img-top imgzoomin shadow"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center">
                        {product.productname}
                      </h5>
                      <h5 className="text-success text-center">
                        Product Price ${product.productprice}
                      </h5>
                      <div className="form-row">
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-warning form-control btn-block mt-2 rounded-pill shadow"
                            onClick={() => {
                              handleaddcart(product);
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Add To Cart
                          </button>
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-danger form-control btn-block mt-2 rounded-pill shadow"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shopping;
