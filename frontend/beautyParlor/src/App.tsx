import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import DiscountPopup from "./components/DiscountPopup";

import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Locations from "./pages/Locations";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Products from "./pages/Products";

import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminServices from "./pages/AdminServices";
import AdminReviews from "./pages/AdminReviews";

function App() {
  const location = useLocation();

  const isShopPage = location.pathname === "/shop";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isShopPage && !isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />

        <Route path="/locations" element={<Locations />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Products />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="services" element={<AdminServices />} /> 
          <Route path="reviews" element={<AdminReviews />} />
        </Route>
      </Routes>

      {!isShopPage && !isAdminPage && <Footer />}
      {!isShopPage && !isAdminPage && <BackToTop />}
      {!isShopPage && !isAdminPage && <DiscountPopup />}
    </>
  );
}

export default App;