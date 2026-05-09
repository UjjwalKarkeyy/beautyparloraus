import { Link } from "react-router-dom";
import { locationCards } from "../data/pageData";

function Locations() {
  return (
    <main>
      <section className="page-banner">
        <div className="page-banner-overlay"></div>

        <div className="page-banner-content">
          <span className="section-label light">Find Us</span>
          <h1>
            Our <em>Locations</em>
          </h1>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Locations
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="locations" id="locations">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Find Us</span>
            <h2 className="section-title">
              Our <em>Locations</em>
            </h2>
            <p className="section-desc">
              Brow Beauty Hub operates across four Sydney locations — each fully
              equipped and staffed with trained professionals to ensure a
              consistent, premium experience.
            </p>
          </div>

          <div className="locations-grid">
            {locationCards.map((location) => (
              <div className="location-card" key={location.name}>
                <div className="location-img">
                  <img src={location.image} alt={location.name} loading="lazy" />

                  {location.badge && (
                    <div className="location-badge">{location.badge}</div>
                  )}
                </div>

                <div className="location-body">
                  <h3>{location.name}</h3>

                  <ul className="location-details">
                    <li>
                      <i className="fa-solid fa-location-dot"></i>{" "}
                      {location.address.split("\n").map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </li>

                    <li>
                      <i className="fa-solid fa-phone"></i>{" "}
                      <a href={`tel:${location.tel}`}>{location.phone}</a>
                    </li>

                    <li>
                      <i className="fa-regular fa-clock"></i> {location.hours}
                    </li>

                    {location.note && (
                      <li>
                        <i className="fa-solid fa-circle-info"></i>{" "}
                        <em>{location.note}</em>
                      </li>
                    )}
                  </ul>

                  <div className="location-actions">
                    <a
                      href={location.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Book Here
                    </a>

                    <a
                      href={location.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-map"
                    >
                      <i className="fa-brands fa-google"></i> Google Maps
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cancellation-policy">
            <h4>Cancellation Policy:</h4>
            <p>
              In the event that you need to cancel your scheduled appointment
              with us, we ask that you please call us in advance as a courtesy
              to the staff member, so that we may possibly accommodate the needs
              of other clients. If you have an appointment for a Beauty Hub
              treatment, this time is reserved exclusively for you. Thank You!
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Locations;