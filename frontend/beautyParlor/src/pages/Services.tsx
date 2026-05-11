import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getServices } from "../api/serviceApi";
import type { Service } from "../types/service";

function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();
        setServices(data);
      } catch {
        setServices([]);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

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

          {loading ? (
            <p className="section-desc">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="section-desc">No services available right now.</p>
          ) : (
            <div className="svc-ov-grid">
              {services.map((service) => (
                <Link
                  key={service.id}
                  className="svc-ov-card"
                  to={`/services/${service.slug}`}
                >
                  <div className="svc-ov-img">
                    <img
                      alt={service.title}
                      loading="lazy"
                      src={
                        service.image ||
                        "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80"
                      }
                    />
                    <div className="svc-ov-overlay"></div>
                  </div>

                  <div className="svc-ov-body">
                    <span className="svc-ov-num">
                      {service.number || "00"}
                    </span>

                    <h3>{service.title}</h3>
                    <p>{service.description}</p>

                    <span className="svc-ov-cta">
                      Explore Service{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Services;