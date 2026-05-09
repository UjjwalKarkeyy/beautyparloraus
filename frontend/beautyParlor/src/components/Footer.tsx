import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="footer-logo" to="/">
              <img
                alt="Brow Beauty Hub"
                className="footer-logo-img"
                src={logo}
              />
            </Link>

            <p>
              Precision brow, lash, and skin treatments across four Sydney
              locations — Roselands, Hurstville Level 2 & 3, and Hornsby —
              consistently beautiful results, every visit.
            </p>

            <div className="social-links">
              <a
                aria-label="Instagram"
                href="https://www.instagram.com/eyebrowbeautyhub/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a
                aria-label="Facebook"
                href="https://www.facebook.com/eyebrowbeautyhub/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>

              <a
                aria-label="TikTok"
                href="https://www.tiktok.com/tag/browbeautyhub"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/locations">Locations</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/blogs">Blogs</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/contact#booking">Book Now</Link>
              </li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li>
                <Link to="/services">Eyebrow Services</Link>
              </li>
              <li>
                <Link to="/services">Eyelash Treatments</Link>
              </li>
              <li>
                <Link to="/services">Facials & Skin</Link>
              </li>
              <li>
                <Link to="/services">Waxing Services</Link>
              </li>
              <li>
                <Link to="/shop">Shop Products</Link>
              </li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>
              <i className="fa-solid fa-location-dot"></i> Roselands ·
              Hurstville · Hornsby
            </p>
            <p>
              <i className="fa-solid fa-phone"></i> Roselands: 0426 962 461
            </p>
            <p>
              <i className="fa-solid fa-phone"></i> Hurstville: 0414 205 503
            </p>
            <p>
              <i className="fa-solid fa-phone"></i> Hornsby: 02 8417 0814
            </p>
            <p>
              <i className="fa-solid fa-envelope"></i>{" "}
              eyebrowbeautyhub@gmail.com
            </p>
            <p>
              <i className="fa-regular fa-clock"></i> Mon–Sat: 9am–7pm
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Brow Beauty Hub. All rights reserved.</p>
          <p>
            Designed with <i className="fa-solid fa-heart"></i> for beauty
            lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;