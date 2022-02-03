import express from "express";
import multer from "multer";
import AdminController from "../controllers/AdminController.js";
import UserController from "../controllers/UserController.js";

const router = express.Router();

// for image upload
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/upload");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// user link
router.post("/getdata/:useremail", UserController.GetUserDoc);
router.post("/registration", UserController.CreateUserDoc);
router.post("/adduserorderdetails", UserController.CreateUserOrderDetailsDoc);
router.post("/checklogin", UserController.LoginUserDoc);
router.post("/authentication", UserController.Authentication);
router.get("/logout", UserController.Logout);
router.get("/getsingleuserorderdetails/:useremail", UserController.GetUserSingleOrder);

// admin link
router.post("/admin/authentication", AdminController.Authentication);
router.post(
  "/addproduct",
  upload.single("uploadfile"),
  AdminController.AddProductDoc
);
router.get("/getproductlist", AdminController.GetProductDoc);
router.post("/deleteproduct/:id", AdminController.DeleteProduct);
router.get("/edit/:id", AdminController.GetProductForEdit);
router.post(
  "/updateproduct/:id",
  upload.single("uploadfile"),
  AdminController.UpdateProductDoc
);
router.get("/getorderdetails", AdminController.GetUserOrderDoc);
router.get("/getsingleorderdetails", AdminController.GetUserSingleOrderDoc);

export default router;
