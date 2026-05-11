import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedReviews } from "../api/reviewApi";
import type { Review } from "../types/review";

function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await getFeaturedReviews();
        setTestimonials(data);
      } catch {
        setTestimonials([]);
      } finally {
        setReviewsLoading(false);
      }
    }

    loadReviews();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-up");

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    fadeElements.forEach((element) => fadeObserver.observe(element));

    document
      .querySelectorAll(
        ".service-card, .gallery-item, .stat-item, .about-content, .about-images, .contact-item"
      )
      .forEach((element) => {
        element.classList.add("fade-up");
        fadeObserver.observe(element);
      });

    return () => fadeObserver.disconnect();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <i
        key={index}
        className={index < rating ? "fa-solid fa-star" : "fa-regular fa-star"}
      ></i>
    ));
  };

  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="hero-subtitle fade-up">Welcome to Brow Beauty Hub</p>

          <h1 className="hero-title fade-up">
            Precision Brows.
            <br />
            <em>Flawless Results.</em>
          </h1>

          <p className="hero-tagline fade-up">
            Expert brow & lash treatments, advanced skin care, and premium
            beauty services — delivered with precision and care across Sydney.
          </p>

          <div className="hero-buttons fade-up">
            <Link className="btn btn-primary" to="/contact#booking">
              Book Now
            </Link>

            <Link className="btn btn-outline" to="/services">
              Our Services
            </Link>
          </div>
        </div>

        <div className="hero-scroll">
          <a href="#about">
            <i className="fa-solid fa-chevron-down"></i>
          </a>
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
                and welcoming environment. We pride ourselves on consistency,
                attention to detail, and creating a relaxing experience for every
                client who walks through our doors.
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

              <Link className="btn btn-primary" to="/about">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="salon-treatments" id="services-preview">
        <div className="container">
          <div className="st-header">
            <p className="st-eyebrow">THE EXPERIENCE</p>
            <h2 className="st-title">Salon Treatments</h2>
          </div>

          <div className="row justify-content-center g-4">
            <div className="col-lg-3 col-md-6">
              <div className="st-card">
                <div className="st-card-img">
                  <img
                    alt="Eyelash Lifts and Extensions"
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=600&q=80"
                  />
                </div>

                <div className="st-card-body">
                  <h3 className="st-card-title">
                    Eyelash Lifts & Extensions
                  </h3>
                  <p className="st-card-desc">
                    Classic, wet, hybrid, volume, ombre and more — tailored to
                    the look you desire.
                  </p>
                  <Link className="st-know-more" to="/services">
                    KNOW MORE
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="st-card">
                <div className="st-card-img">
                  <img
                    alt="Brows"
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=600&q=80"
                  />
                </div>

                <div className="st-card-body">
                  <h3 className="st-card-title">Brows</h3>
                  <p className="st-card-desc">
                    Threading, shaping, lamination, deluxe brow treatments and
                    more — for perfect arches every day.
                  </p>
                  <Link className="st-know-more" to="/services">
                    KNOW MORE
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="st-card">
                <div className="st-card-img">
                  <img
                    alt="Facials"
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80"
                  />
                </div>

                <div className="st-card-body">
                  <h3 className="st-card-title">Facials</h3>
                  <p className="st-card-desc">
                    Hydrafacials, Ultra Ceuticals, Dermaplaning, LED Light
                    Therapy, Dermapen Skin Needling & more.
                  </p>
                  <Link className="st-know-more" to="/services">
                    KNOW MORE
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="st-card">
                <div className="st-card-img">
                  <img
                    alt="Cosmetic Tattooing"
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1588776814546-ec7e55c5b7e7?w=600&q=80"
                  />
                </div>

                <div className="st-card-body">
                  <h3 className="st-card-title">Cosmetic Tattooing</h3>
                  <p className="st-card-desc">
                    Trained professionals offering cosmetic tattooing — wake up
                    with perfect brows every day.
                  </p>
                  <Link className="st-know-more" to="/services">
                    KNOW MORE
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link className="btn btn-primary" to="/services">
              View All Services
            </Link>
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

          {reviewsLoading ? (
            <p className="section-desc text-center">Loading client reviews...</p>
          ) : testimonials.length === 0 ? (
            <p className="section-desc text-center">
              No featured reviews available yet.
            </p>
          ) : (
            <>
              <div className="testimonials-slider" id="testimonials-slider">
                {testimonials.map((testimonial, index) => (
                  <div
                    className={`testimonial-card ${activeSlide === index ? "active" : ""
                      }`}
                    key={testimonial.id}
                  >
                    <div className="stars">{renderStars(testimonial.rating)}</div>

                    <p className="testimonial-text">
                      "{testimonial.reviewText}"
                    </p>

                    <div className="testimonial-author">
                      <div className="author-avatar">
                        {testimonial.avatarLetter ||
                          testimonial.clientName.charAt(0)}
                      </div>

                      <div>
                        <strong>{testimonial.clientName}</strong>

                        <span>
                          {testimonial.serviceName || "Beauty Client"}
                          {testimonial.location
                            ? ` — ${testimonial.location}`
                            : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="slider-controls">
                <button
                  aria-label="Previous"
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

                <div className="slider-dots" id="slider-dots">
                  {testimonials.map((testimonial, index) => (
                    <button
                      key={testimonial.id}
                      aria-label={`Slide ${index + 1}`}
                      className={`dot ${activeSlide === index ? "active" : ""}`}
                      onClick={() => setActiveSlide(index)}
                    ></button>
                  ))}
                </div>

                <button
                  aria-label="Next"
                  className="slider-btn"
                  onClick={() =>
                    setActiveSlide((activeSlide + 1) % testimonials.length)
                  }
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="shop" id="shop-preview">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Products</span>

            <h2 className="section-title">
              Shop <em>Premium</em> Beauty
            </h2>

            <p className="section-desc">
              Take the Brow Beauty Hub experience home. Carefully selected brow,
              lash, and skin care products to maintain your results.
            </p>

            <Link className="shop-cta-btn" to="/shop">
              <span>Visit Full Shop</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="shop-grid">
            <div className="product-card">
              <div className="product-img">
                <img
                  alt="Eyebrow Gel"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80"
                />
                <div className="product-tag">Bestseller</div>
              </div>

              <div className="product-info">
                <span className="product-category">Brow</span>
                <h4>Eyebrow Gel</h4>
                <p>
                  Professional styling gel for sculpted, defined brows all day.
                </p>

                <div className="product-footer">
                  <span className="product-price">$30.00</span>
                  <div className="product-stars">
                    <i className="fa-solid fa-star"></i> 4.8
                  </div>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-img">
                <img
                  alt="Lash Serum"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1583241475880-083f84372725?w=400&q=80"
                />
              </div>

              <div className="product-info">
                <span className="product-category">Lash</span>
                <h4>Lash Growth Serum</h4>
                <p>
                  Strengthen, lengthen and condition lashes overnight with this
                  nourishing serum.
                </p>

                <div className="product-footer">
                  <span className="product-price">$89.00</span>
                  <div className="product-stars">
                    <i className="fa-solid fa-star"></i> 4.9
                  </div>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-img">
                <img
                  alt="Vitamin C Serum"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80"
                />
              </div>

              <div className="product-info">
                <span className="product-category">Skin Care</span>
                <h4>Vitamin C Brightening Serum</h4>
                <p>
                  High-potency Vitamin C serum for radiant, even-toned skin.
                </p>

                <div className="product-footer">
                  <span className="product-price">$129.00</span>
                  <div className="product-stars">
                    <i className="fa-solid fa-star"></i> 4.9
                  </div>
                </div>
              </div>
            </div>

            <div className="product-card">
              <div className="product-img">
                <img
                  alt="SPF Sunscreen"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=400&q=80"
                />
              </div>

              <div className="product-info">
                <span className="product-category">Skin Care</span>
                <h4>50+ SPF Hydrating Defence 75ml</h4>
                <p>
                  Daily broad-spectrum SPF50+ sunscreen with lightweight
                  hydrating formula.
                </p>

                <div className="product-footer">
                  <span className="product-price">$75.00</span>
                  <div className="product-stars">
                    <i className="fa-solid fa-star"></i> 4.9
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link className="btn btn-primary" to="/shop">
              Browse All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="booking" id="booking-cta">
        <div className="container">
          <div className="booking-grid">
            <div className="booking-info">
              <span className="section-label light">Book With Us</span>

              <h2 className="section-title light">
                Ready to Book Your <em>Appointment?</em>
              </h2>

              <p>
                Booking is simple and convenient. Select your preferred
                location, service, and date online — or call us directly.
                Walk-ins welcome, subject to availability.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <i className="fa-solid fa-phone"></i>

                  <div>
                    <strong>Call Us</strong>
                    <span>Roselands: 0426 962 461</span>
                    <span>Hurstville: 0414 205 503</span>
                    <span>Hornsby: 02 8417 0814</span>
                  </div>
                </div>

                <div className="contact-item">
                  <i className="fa-solid fa-location-dot"></i>

                  <div>
                    <strong>3 Locations</strong>
                    <span>Roselands · Hurstville · Hornsby</span>
                  </div>
                </div>

                <div className="contact-item">
                  <i className="fa-regular fa-clock"></i>

                  <div>
                    <strong>Opening Hours</strong>
                    <span>Mon–Sat: 9am – 7pm | Sun: 10am – 5pm</span>
                  </div>
                </div>
              </div>

              <Link className="btn btn-primary mt-4" to="/contact#booking">
                Book an Appointment
              </Link>
            </div>

            <div className="booking-form-wrap">
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <i
                  className="fa-solid fa-calendar-check"
                  style={{
                    fontSize: "3.5rem",
                    color: "var(--rose)",
                    display: "block",
                    marginBottom: "20px",
                  }}
                ></i>

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--dark)",
                    fontSize: "1.5rem",
                    marginBottom: "12px",
                  }}
                >
                  Easy Online Booking
                </h3>

                <p
                  style={{
                    color: "var(--mid)",
                    fontSize: "0.95rem",
                    marginBottom: "28px",
                    lineHeight: "1.7",
                  }}
                >
                  Visit our contact page to fill in your booking request with
                  your preferred location, service and date — we'll confirm
                  within 24 hours.
                </p>

                <Link className="btn btn-primary full-width" to="/contact#booking">
                  Go to Booking Form
                </Link>

                <p
                  style={{
                    marginTop: "18px",
                    fontSize: "0.82rem",
                    color: "var(--mid)",
                  }}
                >
                  Or find us across 3 Sydney locations —{" "}
                  <Link
                    to="/locations"
                    style={{ color: "var(--rose)", fontWeight: 600 }}
                  >
                    view all locations
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;