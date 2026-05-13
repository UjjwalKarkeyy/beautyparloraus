import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../api/blogApi";
import type { Blog } from "../types/blog";

function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, []);

  const categories = Array.from(
    new Set(blogs.map((blog) => blog.category).filter(Boolean))
  );

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      categoryFilter === "all" || blog.category === categoryFilter;

    const searchText = `${blog.title} ${blog.excerpt} ${blog.category || ""}`
      .toLowerCase();

    const matchesSearch = searchText.includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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
              Expert advice, brow and lash tips, and beauty guides from the Brow
              Beauty Hub team.
            </p>
          </div>

          <div className="blog-filter-bar">
            <input
              type="search"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="all">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category || ""}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <p className="section-desc text-center">Loading blogs...</p>
          ) : filteredBlogs.length === 0 ? (
            <p className="section-desc text-center">No blogs found.</p>
          ) : (
            <div className="row g-4">
              {filteredBlogs.map((blog) => (
                <div className="col-md-4" key={blog.id}>
                  <article className="blog-card">
                    <div className="blog-img">
                      <img
                        src={
                          blog.imageUrl ||
                          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=80"
                        }
                        alt={blog.title}
                        loading="lazy"
                      />

                      {blog.category && (
                        <span className="blog-cat">{blog.category}</span>
                      )}
                    </div>

                    <div className="blog-body">
                      <div className="blog-meta">
                        <span>
                          <i className="fa-regular fa-calendar"></i>{" "}
                          {new Date(blog.publishedAt).toLocaleDateString()}
                        </span>

                        {blog.readTime && (
                          <span>
                            <i className="fa-regular fa-clock"></i>{" "}
                            {blog.readTime}
                          </span>
                        )}
                      </div>

                      <h3>{blog.title}</h3>
                      <p>{blog.excerpt}</p>

                      <Link to={`/blogs/${blog.slug}`} className="blog-link">
                        Read More <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Blogs;