import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/about/About";
import Clothes from "../pages/clothes/Clothes";
import CustomerService from "../pages/customerService/CustomerService";
import Login from "../pages/login/Login";
import ProductPage from "../pages/product/Product";
import Register from "../pages/register/Register";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UserProfile from "../pages/userProfile/UserProfile";
const ShopRoutes = () => {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/customerservice" element={<CustomerService />} />
      <Route path="/products" element={<Clothes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:productId" element={<ProductPage />} />
      <Route path="/" element={<AuthenticatedRoute />}>
        <Route path="/userprofile" element={<UserProfile />} />
      </Route>
    </Routes>
  );
};

export default ShopRoutes;
