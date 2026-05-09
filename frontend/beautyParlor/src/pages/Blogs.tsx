import { Link } from "react-router-dom";
import { moreBlogs, sideBlogs } from "../data/pageData";

function Blogs() {
  return (
    <main>
      <section className="page-banner">
        <div className="page-banner-overlay"></div>

        <div className="page-banner-content">
          <span className="section-label light">Beauty Tips &amp; News</span>

          <h1>
            Our <em>Beauty Blog</em>
          </h1>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Blogs
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="blogs" id="blogs">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Beauty Tips &amp; News</span>

            <h2 className="section-title">
              From Our <em>Beauty Blog</em>
            </h2>

            <p className="section-desc">
              Expert advice, brow &amp; lash tips, and beauty guides from the
              Brow Beauty Hub team.
            </p>
          </div>

          <div className="blogs-grid">
            <article className="blog-card featured-blog">
              <div className="blog-img">
                <img
                  src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=80"
                  alt="Brow Lamination Guide"
                  loading="lazy"
                />

                <span className="blog-cat">Brow Care</span>
              </div>

              <div className="blog-body">
                <div className="blog-meta">
                  <span>
                    <i className="fa-regular fa-calendar"></i> March 28, 2026
                  </span>

                  <span>
                    <i className="fa-regular fa-clock"></i> 5 min read
                  </span>
                </div>

                <h3>
                  Brow Lamination vs Brow Tattoo: Which One Is Right for You?
                </h3>

                <p>
                  Two of our most popular brow treatments, but which is the best
                  fit for your lifestyle and goals? Our specialists break down
                  everything you need to know before booking.
                </p>

                <Link to="/blogs" className="blog-link">
                  Read More <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </article>

            <div className="blogs-side">
              {sideBlogs.map((blog) => (
                <article className="blog-card-sm" key={blog.title}>
                  <div className="blog-img-sm">
                    <img src={blog.image} alt={blog.title} loading="lazy" />
                  </div>

                  <div className="blog-body-sm">
                    <span className="blog-cat">{blog.category}</span>

                    <div className="blog-meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i> {blog.date}
                      </span>
                    </div>

                    <h4>{blog.title}</h4>

                    <Link to="/blogs" className="blog-link">
                      Read More <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="row g-4 mt-2">
            {moreBlogs.map((blog) => (
              <div className="col-md-4" key={blog.title}>
                <article className="blog-card">
                  <div className="blog-img">
                    <img src={blog.image} alt={blog.title} loading="lazy" />
                    <span className="blog-cat">{blog.category}</span>
                  </div>

                  <div className="blog-body">
                    <div className="blog-meta">
                      <span>
                        <i className="fa-regular fa-calendar"></i> {blog.date}
                      </span>

                      <span>
                        <i className="fa-regular fa-clock"></i> {blog.readTime}
                      </span>
                    </div>

                    <h3>{blog.title}</h3>
                    <p>{blog.description}</p>

                    <Link to="/blogs" className="blog-link">
                      Read More <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Blogs;