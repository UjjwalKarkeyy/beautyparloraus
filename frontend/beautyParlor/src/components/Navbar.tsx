import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const serviceLinks = [
  { label: "Threading", path: "/services/threading" },
  { label: "Tinting", path: "/services/tinting" },
  { label: "Eyelash Extension", path: "/services/eyelash-extension" },
  { label: "Lash Lift / Perm", path: "/services/lash-lift" },
  { label: "Facial", path: "/services/facial" },
  { label: "Henna Tattoo", path: "/services/henna-tattoo" },
  { label: "Brow Henna", path: "/services/brow-henna" },
  { label: "Oil Head Massage", path: "/services/oil-massage" },
  { label: "Face & Body Waxing", path: "/services/waxing" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
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

          <li className={`nav-dropdown ${dropdownOpen ? "open" : ""}`}>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `nav-dropdown-toggle ${isActive ? "active-nav" : ""}`
              }
              onClick={(event) => {
                if (!dropdownOpen) {
                  event.preventDefault();
                  setDropdownOpen(true);
                }
              }}
            >
              Services{" "}
              <i className="fa-solid fa-chevron-down nav-chevron"></i>
            </NavLink>

            <ul className="nav-dropdown-menu">
              {serviceLinks.map((service) => (
                <li key={service.path}>
                  <Link to={service.path} onClick={closeMenu}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
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