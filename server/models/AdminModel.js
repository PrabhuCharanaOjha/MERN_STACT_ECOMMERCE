import mongoose from "mongoose";

const AuthenticationSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  useremail: { type: String, required: true, trim: true },
  userpassword: { type: String, required: true, trim: true },
  isuser: { type: Boolean, default: true },
  userregistrationdate: { type: Date, default: Date.now },
});

const ProductSchema = new mongoose.Schema({
  productcategory: { type: String, required: true, trim: true },
  productname: { type: String, required: true, trim: true },
  productprice: { type: Number, required: true, trim: true },
  productquantity: { type: Number, required: true, trim: true },
  productimage: { type: String, required: true },
});

const UserOrderDetailsSchema = new mongoose.Schema({
  ProductDetails: [],
  UserDetails: [],
  totalitem: { type: Number, required: true },
  totalprice: { type: Number, required: true },
  orderdate: { type: Date, default: Date.now },
});

const UserOrderedSchema = new mongoose.Schema({
  ProductDetails: [],
  UserDetails: [],
  useremail: { type: String, required: true },
  totalitem: { type: Number, required: true },
  totalprice: { type: Number, required: true },
  orderdate: { type: Date, default: Date.now },
});

const AuthenticationModel = mongoose.model("user", AuthenticationSchema);
const ProductModel = mongoose.model("product", ProductSchema);
const UserOrderDetails = mongoose.model("userorder", UserOrderDetailsSchema);
const UserOrdered = mongoose.model("userordered", UserOrderedSchema);

export { AuthenticationModel, ProductModel, UserOrderDetails, UserOrdered };
