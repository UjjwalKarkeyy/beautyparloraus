import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const testimonials = [
  {
    text: "I've been coming to Brow Beauty Hub for over a year and the results are always flawless. My brow lamination lasts so long and the team really takes the time to shape them perfectly for my face. Absolutely love it!",
    avatar: "S",
    name: "Sophia Anderson",
    service: "Brow Lamination Client — Roselands",
  },
  {
    text: "I had my lash extensions done at the Hurstville branch and I am obsessed! They looked so natural yet full — exactly what I asked for. The therapist was gentle, professional, and explained every step.",
    avatar: "E",
    name: "Emily Chen",
    service: "Lash Extensions Client — Hurstville",
  },
  {
    text: "The deep cleanse facial at Brow Beauty Hub is incredible. My skin was glowing for weeks. The salon is spotlessly clean and the staff are so knowledgeable.",
    avatar: "R",
    name: "Rachel Patel",
    service: "Facial Client — Hornsby",
  },
];

function About() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <section className="page-banner">
        <div className="page-banner-overlay"></div>

        <div className="page-banner-content">
          <span className="section-label light">Who We Are</span>
          <h1>
            About <em>Brow Beauty Hub</em>
          </h1>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                About Us
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-images">
              <div className="about-img-main">
                <img
                  alt="Salon interior"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80"
                />
              </div>

              <div className="about-img-accent">
                <img
                  alt="Stylist at work"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80"
                />

                <div className="about-badge">
                  <span className="badge-number">8+</span>
                  <span className="badge-text">Years of Excellence</span>
                </div>
              </div>
            </div>

            <div className="about-content">
              <span className="section-label">Who We Are</span>

              <h2 className="section-title">
                Dedicated to Beauty, <em>Driven by Precision</em>
              </h2>

              <p className="about-lead">
                At Brow Beauty Hub, we are a dedicated team of experienced
                beauty professionals committed to delivering high-quality,
                results-driven treatments.
              </p>

              <p className="about-body">
                Our focus is on enhancing natural beauty through precision
                techniques, premium products, and personalised care in a clean
                and welcoming environment.
              </p>

              <div className="about-mission">
                <div className="mission-icon">
                  <i className="fa-solid fa-bullseye"></i>
                </div>

                <div>
                  <h4>Our Mission</h4>
                  <p>
                    To enhance every client's natural beauty through precision
                    techniques, premium products, and a deeply personalised
                    experience — delivered consistently across all three of our
                    Sydney locations.
                  </p>
                </div>
              </div>

              <div className="about-values">
                <div className="value-tag">
                  <i className="fa-solid fa-check"></i> Precision Techniques
                </div>
                <div className="value-tag">
                  <i className="fa-solid fa-check"></i> Premium Products
                </div>
                <div className="value-tag">
                  <i className="fa-solid fa-check"></i> Clean & Hygienic
                </div>
                <div className="value-tag">
                  <i className="fa-solid fa-check"></i> Personalised Care
                </div>
                <div className="value-tag">
                  <i className="fa-solid fa-check"></i> Results-Driven
                </div>
                <div className="value-tag">
                  <i className="fa-solid fa-check"></i> Consistent Standards
                </div>
              </div>

              <Link className="btn btn-primary" to="/contact#booking">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-number">5000</span>
            <span className="stat-plus">+</span>
            <p>Happy Clients</p>
          </div>

          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-plus"></span>
            <p>Locations in Sydney</p>
          </div>

          <div className="stat-item">
            <span className="stat-number">10</span>
            <span className="stat-plus">+</span>
            <p>Specialist Therapists</p>
          </div>

          <div className="stat-item">
            <span className="stat-number">20</span>
            <span className="stat-plus">+</span>
            <p>Beauty Treatments</p>
          </div>
        </div>
      </section>

      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Client Love</span>

            <h2 className="section-title">
              What Our Clients <em>Are Saying</em>
            </h2>
          </div>

          <div className="testimonials-slider">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`testimonial-card ${
                  activeSlide === index ? "active" : ""
                }`}
              >
                <div className="stars">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>

                <p className="testimonial-text">"{testimonial.text}"</p>

                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>

                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls">
            <button
              className="slider-btn"
              onClick={() =>
                setActiveSlide(
                  (activeSlide - 1 + testimonials.length) %
                    testimonials.length
                )
              }
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <div className="slider-dots">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  className={`dot ${activeSlide === index ? "active" : ""}`}
                  onClick={() => setActiveSlide(index)}
                ></button>
              ))}
            </div>

            <button
              className="slider-btn"
              onClick={() =>
                setActiveSlide((activeSlide + 1) % testimonials.length)
              }
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;