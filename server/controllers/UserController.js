import {
  AuthenticationModel,
  UserOrderDetails,
  UserOrdered,
} from "../models/AdminModel.js";
import jwt from "jsonwebtoken";

class UserController {
  // user registration
  static CreateUserDoc = async (req, res) => {
    try {
      const doc = new AuthenticationModel({
        username: req.body.username,
        useremail: req.body.useremail,
        userpassword: req.body.userpassword,
      });
      await doc.save();
      res.json({ message: "Register Successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  // add userorder details
  static CreateUserOrderDetailsDoc = async (req, res) => {
    try {
      console.log(req.body.userdetails.useremail);
      const doc1 = new UserOrderDetails({
        ProductDetails: req.body.productdetails,
        UserDetails: req.body.userdetails,
        totalitem: req.body.totalitem,
        totalprice: req.body.totalprice,
      });
      const doc2 = new UserOrdered({
        ProductDetails: req.body.productdetails,
        UserDetails: req.body.userdetails,
        useremail: req.body.userdetails.useremail,
        totalitem: req.body.totalitem,
        totalprice: req.body.totalprice,
      });
      await doc1.save();
      await doc2.save();
      res.json({ message: "Add Successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  // get user
  static GetUserDoc = async (req, res) => {
    try {
      const email = req.params.useremail;
      const result = await AuthenticationModel.findOne({ useremail: email });
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Login user
  static LoginUserDoc = async (req, res) => {
    try {
      const { useremail, userpassword } = req.body;
      if (!useremail || !userpassword) {
        res.status(400).json({ error: "please fill all field..." });
      } else {
        const result = await AuthenticationModel.findOne({
          useremail: useremail,
          userpassword: userpassword,
        });
        if (result) {
          const token = jwt.sign(
            {
              id: result._id,
              username: result.username,
              useremail: result.useremail,
              userpassword: result.userpassword,
              isuser: result.isuser,
            },
            "secret123"
          );
          res.cookie("jwtoken", token);
          res.send(result);
        } else {
          res.send(result);
          res.status(400).json({ error: "this Email is not exist..." });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  // logout
  static Logout = async (req, res) => {
    try {
      res.clearCookie("jwtoken");
      res.send({ message: "logout successfully" });
    } catch (error) {
      console.log(error);
    }
  };

  // get single user order
  static GetUserSingleOrder = async (req, res) => {
    try {
      const result = await UserOrdered.find({
        useremail: req.params.useremail,
      });
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

export default UserController;
