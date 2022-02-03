import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./partial/Navbar";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productList, setProductList] = useState({
    productcategory: "",
    productname: "",
    productprice: "",
    productquantity: "",
    filename: "",
  });

  // get data for edit
  useEffect(() => {
    async function getStudent() {
      try {
        const productlists = await axios.get(
          `http://localhost:8000/edit/${id}`
        );
        setProductList(productlists.data);
      } catch (error) {
        console.log(error);
      }
    }
    getStudent();
  }, [id]);

  // catch text data from form...
  function ontextFieldChange(e) {
    setProductList({
      ...productList,
      [e.target.name]: e.target.value,
    });
  }
  // catch image data from form...
  function onFileFieldChange(e) {
    setProductList({
      ...productList,
      filename: e.target.files[0],
    });
  }

  const handleSubmit = async (e) => {
    try {
      if (
        !productList.productcategory ||
        !productList.productname ||
        !productList.productprice ||
        !productList.productquantity ||
        !productList.filename
      ) {
        if (!productList.filename) {
          alert("Please fill image field....");
        } else {
          alert("Please fill all field....");
        }
      } else {
        e.preventDefault();
        const formData = new FormData();

        formData.append("productcategory", productList.productcategory);
        formData.append("productname", productList.productname);
        formData.append("productprice", Number(productList.productprice));
        formData.append("productquantity", Number(productList.productquantity));
        formData.append(
          "uploadfile",
          productList.filename,
          productList.filename.name
        );

        await axios
          .post(`http://localhost:8000/updateproduct/${id}`, formData)
          .then(navigate("/Addproduct"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mt-5 offset-sm-3">
            <form
              action=""
              onSubmit={handleSubmit}
              className="border shadow p-3 me-2 d-grid"
              encType="multipart/form-data"
            >
              <h2 className="alert alert-success text-center shadow shadow-lg">
                Update Student
              </h2>
              <div className="form-group my-2">
                <label htmlFor="productcategory">Poduct Category</label>
                <input
                  type="text"
                  name="productcategory"
                  value={productList.productcategory}
                  onChange={(e) => ontextFieldChange(e)}
                  className="form-control"
                  placeholder="Please enter product category..."
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="productname">Poduct Name</label>
                <input
                  type="text"
                  name="productname"
                  value={productList.productname}
                  onChange={(e) => ontextFieldChange(e)}
                  className="form-control"
                  placeholder="Please enter product Name..."
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="productprice">Poduct Price</label>
                <input
                  type="number"
                  name="productprice"
                  value={productList.productprice}
                  onChange={(e) => ontextFieldChange(e)}
                  className="form-control"
                  placeholder="Please enter product price..."
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="productquantity">Poduct Quantity</label>
                <input
                  type="number"
                  name="productquantity"
                  value={productList.productquantity}
                  onChange={(e) => ontextFieldChange(e)}
                  className="form-control"
                  placeholder="Please enter product Quantity..."
                />
              </div>
              <div className="form-group my-2">
                <label htmlFor="productimage">Poduct Image</label>
                <input
                  type="file"
                  // filename={filename}
                  name="filename"
                  onChange={(e) => onFileFieldChange(e)}
                  className="form-control"
                />
              </div>
              <div className="form-row">
                <div className="col">
                  <button
                    type="submit"
                    className="btn btn-success form-control mt-2 rounded-pill shadow shadow-lg"
                  >
                    Submit
                  </button>
                </div>
                <div className="col">
                  <Link
                    to="/"
                    className="btn btn-warning form-control mt-2 rounded-pill shadow shadow-lg"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
