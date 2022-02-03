import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/user/partial/Header";
// import Footer from "./components/user/partial/Footer";
import Home from "./components/user/Home";
import Cart from "./components/user/Cart";
import Contact from "./components/user/Contact";
import Shopping from "./components/user/Shopping";
import Registration from "./components/user/Registration";
import Login from "./components/user/Login";
import Dashboard from "./components/admin/Dashboard";
import Edit from "./components/admin/Edit";
import Addproduct from "./components/admin/Addproduct";
import Orderlist from "./components/admin/Orderlist";
import Userorder from "./components/user/Userorder";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/getorderdetails" element={<Userorder />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Shopping" element={<Shopping />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shippingout/:id" element={<Orderlist />} />
          <Route path="/Addproduct" element={<Addproduct />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
