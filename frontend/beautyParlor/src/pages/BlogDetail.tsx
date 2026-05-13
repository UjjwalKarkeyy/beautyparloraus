import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug } from "../api/blogApi";
import type { Blog } from "../types/blog";

function BlogDetail() {
  const { slug } = useParams();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await getBlogBySlug(slug);
        setBlog(data);
      } catch {
        setBlog(null);
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
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

  if (!blog) {
    return (
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay"></div>

          <div className="page-banner-content">
            <span className="section-label light">Blog</span>
            <h1>
              Blog <em>Not Found</em>
            </h1>

            <Link className="btn btn-primary" to="/blogs">
              Back to Blogs
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
          <span className="section-label light">
            {blog.category || "Beauty Blog"}
          </span>

          <h1>
            <em>{blog.title}</em>
          </h1>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>

              <li className="breadcrumb-item">
                <Link to="/blogs">Blogs</Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                {blog.title}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      <section className="blog-detail-section">
        <div className="container">
          <article className="blog-detail-card">
            <img
              src={
                blog.imageUrl ||
                "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80"
              }
              alt={blog.title}
              className="blog-detail-image"
            />

            <div className="blog-detail-meta">
              {blog.category && <span>{blog.category}</span>}

              <span>
                <i className="fa-regular fa-calendar"></i>{" "}
                {new Date(blog.publishedAt).toLocaleDateString()}
              </span>

              {blog.readTime && (
                <span>
                  <i className="fa-regular fa-clock"></i> {blog.readTime}
                </span>
              )}

              {blog.author && <span>By {blog.author}</span>}
            </div>

            <h2>{blog.title}</h2>

            <p className="blog-detail-excerpt">{blog.excerpt}</p>

            <div className="blog-detail-content">
              {blog.content.split("\n").map((paragraph, index) => {
                if (!paragraph.trim()) return null;

                return <p key={index}>{paragraph}</p>;
              })}
            </div>

            <Link to="/blogs" className="btn btn-primary">
              Back to Blogs
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}

export default BlogDetail;