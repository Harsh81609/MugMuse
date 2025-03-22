import { createBrowserRouter } from "react-router-dom";
import Login from './components/auth/Login'
import Register from "./components/auth/Register";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProductList from "./components/product/ProductList";
import ProductDetail from "./components/product/ProductDetail";
import OrderList from "./components/order/OrderList";
import PlaceOrder from "./components/order/PlaceOrder";
import Setting from "./components/user/Setting";
import PaymentStatus from "./components/payment/PaymentStatus";

export const routes = createBrowserRouter([
    {path:"/login",element:<Login />},
    { path: "/register", element: <Register /> },
    {
        path: "/", element: <Layout />, children: [
            { path: "/", element: <Home /> },
            { path: "/product", element: <Product /> },
            { path: "/about", element: <AboutUs /> },
            { path: "/contact", element: <ContactUs /> },
            { path: "/payment", element: <PaymentStatus /> },
            {
                element: <ProtectedRoute />,
                children: [
                    {path:"/product/list",element:<ProductList />},
                    { path: "/product/detail/:productId", element: <ProductDetail /> },
                    { path: "/order/list", element: <OrderList /> },
                    { path: "/order/place-order/:productId", element: <PlaceOrder /> },
                    {path:"/user/setting",element:<Setting />},
                ]
            }
    ] },
])