import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getServiceBySlug, getServices } from "../api/serviceApi";
import type { Service } from "../types/service";

function ServiceDetail() {
  const { slug } = useParams();

  const [service, setService] = useState<Service | null>(null);
  const [otherServices, setOtherServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadService() {
      if (!slug) return;

      try {
        setLoading(true);

        const selectedService = await getServiceBySlug(slug);
        const allServices = await getServices();

        setService(selectedService);
        setOtherServices(
          allServices.filter((item) => item.slug !== selectedService.slug)
        );
      } catch {
        setService(null);
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [slug]);

  if (loading) {
    return (
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay"></div>
          <div className="page-banner-content">
            <h1>Loading...</h1>
          </div>
        </section>
      </main>
    );
  }

  if (!service) {
    return (
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay"></div>

          <div className="page-banner-content">
            <span className="section-label light">Service</span>
            <h1>
              Service <em>Not Found</em>
            </h1>

            <Link className="btn btn-primary" to="/services">
              Back to Services
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="page-banner">
        <div className="page-banner-overlay"></div>

        <div className="page-banner-content">
          <span className="section-label light">{service.label}</span>
          <h1>
            <em>{service.title}</em>
          </h1>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>

              <li className="breadcrumb-item">
                <Link to="/services">Services</Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                {service.title}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="svc-detail" style={{ padding: "96px 0" }}>
        <div className="container">
          <div className="svc-detail-grid">
            <div className="svc-detail-img">
              <img
                alt={service.title}
                loading="lazy"
                src={
                  service.image ||
                  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80"
                }
              />
            </div>

            <div className="svc-detail-content">
              <span className="svc-label">{service.label}</span>

              <h2>{service.title}</h2>

              {service.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {service.includes.length > 0 && (
                <ul className="svc-includes">
                  {service.includes.map((item) => (
                    <li key={item}>
                      <i className="fa-solid fa-check"></i> {item}
                    </li>
                  ))}
                </ul>
              )}

              <Link className="btn-svc-book" to="/contact#booking">
                Book Appointment <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="svc-others">
        <div className="container">
          <h3 className="svc-others-title">Explore Our Other Services</h3>

          <div className="svc-others-grid">
            {otherServices.map((item) => (
              <Link key={item.id} to={`/services/${item.slug}`}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ServiceDetail;