import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import DiscountPopup from "./components/DiscountPopup";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Locations from "./pages/Locations";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";

function App() {
  const location = useLocation();

  const isShopPage = location.pathname === "/shop";

  return (
    <>
      {!isShopPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Products />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/products" element={<AdminProducts />} />
      </Routes>

      {!isShopPage && <Footer />}
      {!isShopPage && <BackToTop />}
      {!isShopPage && <DiscountPopup />}
    </>
  );
}

export default App;