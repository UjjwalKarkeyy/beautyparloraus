import { useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/siteData";

const galleryItems = [
  {
    category: "brows",
    label: "Brow Shaping",
    image:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=500&q=80",
  },
  {
    category: "lashes",
    label: "Lash Extensions",
    image:
      "https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=500&q=80",
  },
  {
    category: "brows",
    label: "Brow Lamination",
    image:
      "https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?w=500&q=80",
  },
  {
    category: "skin",
    label: "Facial Treatment",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&q=80",
  },
  {
    category: "waxing",
    label: "Waxing Service",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=80",
  },
];

function Services() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredGallery =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <main>
      <section className="page-banner">
        <div className="page-banner-overlay"></div>

        <div className="page-banner-content">
          <span className="section-label light">What We Offer</span>
          <h1>
            Our <em>Services</em>
          </h1>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Services
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="svc-overview" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Treatments</span>

            <h2 className="section-title">
              Beauty Services <em>Designed for You</em>
            </h2>

            <p className="section-desc">
              From brows and lashes to facials, henna, waxing and cosmetic
              beauty treatments — explore our full service menu.
            </p>
          </div>

          <div className="svc-ov-grid">
            {services.map((service) => (
              <Link
                key={service.slug}
                className="svc-ov-card fade-up"
                to={`/services/${service.slug}`}
              >
                <div className="svc-ov-img">
                  <img
                    alt={service.title}
                    loading="lazy"
                    src={service.image}
                  />
                  <div className="svc-ov-overlay"></div>
                </div>

                <div className="svc-ov-body">
                  <span className="svc-ov-num">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <span className="svc-ov-cta">
                    Explore Service <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery" id="gallery">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Work</span>

            <h2 className="section-title">
              A Glimpse of <em>Our Artistry</em>
            </h2>

            <p className="section-desc">
              Every look tells a story. Browse our portfolio of transformations.
            </p>
          </div>

          <div className="gallery-filter">
            {["all", "brows", "lashes", "skin", "waxing"].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${
                  activeFilter === filter ? "active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === "all"
                  ? "All"
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredGallery.map((item) => (
              <div className="gallery-item" key={item.label}>
                <img alt={item.label} loading="lazy" src={item.image} />

                <div className="gallery-overlay">
                  <span>{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Services;