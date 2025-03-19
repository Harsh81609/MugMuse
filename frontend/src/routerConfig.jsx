import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Product from "./pages/Product";
import Order from "./pages/Order";
import User from "./pages/User";
import Layout from "./layout/Layout";
import ProductForm from "./components/product/ProductForm";
import ProductList from "./components/product/ProductList";
import OrderForm from "./components/order/OrderForm";
import OrderList from "./components/order/OrderList";
import UserForm from "./components/user/UserForm";
import UserList from "./components/user/UserList";
import Register from "./components/auth/Registor";
import Login from "./components/auth/Login";
import ProductDetail from "./components/product/ProductDetail";
import PlaceOrder from "./components/order/PlaceOrder";
import PaymentSuccess from "./components/payment/PaymentSuccess";
import PaymentFail from "./components/payment/PaymentFail";
import PaymentVerify from "./components/payment/PaymentVerify";
import PaymentCancel from "./components/payment/PaymentCancel";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Setting from "./components/user/Setting";

export const routes = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/product", element: <Product /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/payment/cancel", element: <PaymentCancel /> },
      { path: "/payment/verify", element: <PaymentVerify /> },
      { path: "/payment/success", element: <PaymentSuccess /> },
      { path: "/payment/fail", element: <PaymentFail /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/product/form", element: <ProductForm /> },
          { path: "/product/list", element: <ProductList /> },
          { path: "/product/detail/:productId", element: <ProductDetail /> },
          { path: "/order", element: <Order /> },
          { path: "/order/form", element: <OrderForm /> },
          { path: "/order/list", element: <OrderList /> },
          { path: "/order/place-order/:productId", element: <PlaceOrder /> },
          { path: "/user", element: <User /> },
          { path: "/user/form", element: <UserForm /> },
          { path: "/user/list", element: <UserList /> },
          { path: "/user/setting", element: <Setting /> },
        ],
      },
    ],
  },
]);
