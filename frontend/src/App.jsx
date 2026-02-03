import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product"
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import CreateCategory from "./admin/CreateCategory";
import CreateProduct from "./admin/CreateProduct";
import ManageOrders from "./admin/ManageOrder";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword"; // Keep this import

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />

        {/* ForgotPassword route should be a top-level route */}
        {/* It should match the link in Login.jsx which is likely /admin/forgot-password */}
        <Route path="/admin/forgot-password" element={<ForgotPassword />} /> {/* CORRECTED LINE */}

        <Route path="/admin" element={<AdminLayout />}>
          {/* Admin routes that require AdminLayout (and likely authentication) */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="manage-orders" element={<ManageOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;