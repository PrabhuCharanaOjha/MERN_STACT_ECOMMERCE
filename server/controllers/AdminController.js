import {
  ProductModel,
  AuthenticationModel,
  UserOrderDetails,
} from "../models/AdminModel.js";
import jwt from "jsonwebtoken";
import fs from "fs";

class AdminController {
  // user authentication
  static Authentication = async (req, res) => {
    try {
      const token = req.cookies.jwtoken;
      if (token) {
        const verifyToken = jwt.verify(token, "secret123");
        const result = await AuthenticationModel.findOne({
          useremail: verifyToken.useremail,
          userpassword: verifyToken.userpassword,
        });
        res.send(result);
      } else {
        res.send({ error: "Please Login In First..." });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // adding product
  static AddProductDoc = async (req, res) => {
    try {
      const doc = new ProductModel({
        productcategory: req.body.productcategory,
        productname: req.body.productname,
        productprice: req.body.productprice,
        productquantity: req.body.productquantity,
        productimage: req.file ? req.file.filename : null,
      });
      const result = await doc.save();
    } catch (error) {
      console.log(error);
    }
  };

  // get product
  static GetProductDoc = async (req, res) => {
    try {
      const result = await ProductModel.find();
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };

  // product delete
  static DeleteProduct = async (req, res) => {
    try {
      const deletefile = await ProductModel.findById(req.params.id);
      const path = `public/upload/${deletefile.productimage}`;
      fs.unlinkSync(path);
      await ProductModel.findByIdAndDelete(req.params.id);
    } catch (error) {
      console.log(error);
    }
  };

  // get product for edit
  static GetProductForEdit = async (req, res) => {
    try {
      const result = await ProductModel.findById(req.params.id);
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };

  // update product
  static UpdateProductDoc = async (req, res) => {
    try {
      const deletefile = await ProductModel.findById(req.params.id);
      const path = `public/upload/${deletefile.productimage}`;
      fs.unlinkSync(path);

      const result = await ProductModel.findByIdAndUpdate(req.params.id, {
        productcategory: req.body.productcategory,
        productname: req.body.productname,
        productprice: req.body.productprice,
        productquantity: req.body.productquantity,
        productimage: req.file ? req.file.filename : null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // get user order details
  static GetUserOrderDoc = async (req, res) => {
    try {
      const result = await UserOrderDetails.find();
      if (result) {
        res.send(result);
      } else {
        res.send({ error: "Please Login In First..." });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get single order details
  static GetUserSingleOrderDoc = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await UserOrderDetails.findById(id);
      if (result) {
        res.send(result);
      } else {
        res.send({ error: "Please Login In First..." });
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default AdminController;
