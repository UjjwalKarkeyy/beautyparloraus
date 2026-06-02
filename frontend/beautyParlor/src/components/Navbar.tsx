import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src={logo} alt="Brow Beauty Hub" className="nav-logo-img" />
        </Link>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`} id="nav-links">
          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-nav" : "")}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-nav" : "")}
            >
              About Us
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/services"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-nav" : "")}
            >
              Services
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/locations"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-nav" : "")}
            >
              Locations
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/shop"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-nav" : "")}
            >
              Shop
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/blogs"
              onClick={closeMenu}
              className={({ isActive }) => (isActive ? "active-nav" : "")}
            >
              Blogs
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                `nav-contact-link ${isActive ? "active-nav" : ""}`
              }
            >
              Contact
            </NavLink>
          </li>

          <li>
            <Link to="/contact#booking" className="nav-cta" onClick={closeMenu}>
              Book Now
            </Link>
          </li>
        </ul>

        <button
          aria-label="Toggle menu"
          className={`hamburger ${menuOpen ? "open" : ""}`}
          id="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;