import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "./partial/Navbar";

const Addproduct = () => {
  const ref = React.useRef();
  const [admin, setAdmin] = useState([]);
  const navigate = useNavigate();

  const [productCategory, setProductCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [filename, setFilename] = useState(null);
  const [productList, setProductList] = useState([]);
  const [status, setStatus] = useState("nothings");

  var i = 1;

  useEffect(() => {
    const callAboutPage = async () => {
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
    callAboutPage();
  }, [navigate]);

  const handleSubmit = async (e) => {
    try {
      if (
        !productCategory ||
        !productName ||
        !productPrice ||
        !productQuantity ||
        !filename
      ) {
        alert("Please fill all field....");
      } else {
        e.preventDefault();
        const formData = new FormData();

        formData.append("productcategory", productCategory);
        formData.append("productname", productName);
        formData.append("productprice", Number(productPrice));
        formData.append("productquantity", Number(productQuantity));
        formData.append("uploadfile", filename, filename.name);

        await axios
          .post("http://localhost:8000/addproduct", formData)
          .then(
            setProductCategory(""),
            setProductName(""),
            setProductPrice(""),
            setProductQuantity(""),
            ref.current.value = "" ,
            setStatus("somthings")
          );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getProductList() {
      try {
        const productLists = await axios.get(
          "http://localhost:8000/getproductlist"
        );
        setProductList(productLists.data);
        setStatus("dones");
      } catch (error) {
        console.log(error);
      }
    }
    getProductList();
  }, [status]);

  const handleDelete = async (id) => {
    await axios.post(`http://localhost:8000/deleteproduct/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <h1 className="alert alert-success text-center text-cursive fw-bold shadow shadow-lg m-2">
            This Is {admin.username} DashBoard
          </h1>
          <div className="col-sm-6">
            <form
              action=""
              method="post"
              encType="multipart/form-data"
              className="p-5 my-2 border shadow shadow-lg bg-dark text-white"
              onSubmit={handleSubmit}
            >
              <div className="form-group my-2">
                <label htmlFor="productcategory">Poduct Category</label>
                <input
                  type="text"
                  name="productcategory"
                  value={productCategory}
                  onChange={(e) => {
                    setProductCategory(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Please enter product category..."
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="productname">Poduct Name</label>
                <input
                  type="text"
                  name="productname"
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Please enter product Name..."
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="productprice">Poduct Price</label>
                <input
                  type="number"
                  name="productprice"
                  value={productPrice}
                  onChange={(e) => {
                    setProductPrice(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Please enter product price..."
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="productquantity">Poduct Quantity</label>
                <input
                  type="number"
                  name="productquantity"
                  value={productQuantity}
                  onChange={(e) => {
                    setProductQuantity(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Please enter product Quantity..."
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="productimage">Poduct Image</label>
                <input
                  type="file"
                  ref={ref}
                  name="uploadfile"
                  onChange={(e) => {
                    setFilename(e.target.files[0]);
                  }}
                  className="form-control"
                />
              </div>
              <div className="form-group d-grid my-3">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-sm-6 table-responsive">
            <table className="table table-striped table hover text-center">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Product Image</th>
                  <th>Product Category</th>
                  <th>Product Name</th>
                  <th>Product Quantity</th>
                  <th>Product Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td>{i++}</td>
                      <td>
                        <img
                          src={`http://localhost:8000/public/upload/${product.productimage}`}
                          alt={product.uploadimage}
                          height="80"
                          width="80"
                        />
                      </td>
                      <td>{product.productcategory}</td>
                      <td>{product.productname}</td>
                      <td>{product.productquantity}</td>
                      <td>{product.productprice}</td>
                      <td>
                        <form action="" className="d-inline">
                          <Link to={`/edit/${product._id}`} className="btn">
                            <i className="fas fa-pen-square text-info"></i>
                          </Link>
                        </form>
                        <form action="" className="d-inline">
                          <button
                            type="submit"
                            onClick={() => {
                              handleDelete(product._id);
                            }}
                          >
                            <i className="fas fa-trash text-danger"></i>
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addproduct;
