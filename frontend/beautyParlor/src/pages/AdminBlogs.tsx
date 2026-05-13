import { useEffect, useState } from "react";
import {
  createBlog,
  deleteBlog,
  getAdminBlogs,
  updateBlog,
} from "../api/blogApi";
import type { Blog, BlogForm } from "../types/blog";

const emptyForm: BlogForm = {
  slug: "",
  title: "",
  category: "",
  excerpt: "",
  content: "",
  imageUrl: "",
  author: "Brow Beauty Hub",
  readTime: "",
  isFeatured: false,
  isActive: true,
  displayOrder: "0",
};

function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminBlogs();
      setBlogs(data);
    } catch {
      setError("Could not load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;

    setForm({
      ...form,
      [name]: checked,
    });
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setError("");
      setMessage("");

      if (editingId) {
        await updateBlog(editingId, form);
        setMessage("Blog updated.");
      } else {
        await createBlog(form);
        setMessage("Blog added.");
      }

      resetForm();
      loadBlogs();
    } catch {
      setError("Could not save blog. Check required fields or duplicate slug.");
    }
  };

  const startEdit = (blog: Blog) => {
    setEditingId(blog.id);

    setForm({
      slug: blog.slug || "",
      title: blog.title || "",
      category: blog.category || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      imageUrl: blog.imageUrl || "",
      author: blog.author || "Brow Beauty Hub",
      readTime: blog.readTime || "",
      isFeatured: blog.isFeatured,
      isActive: blog.isActive,
      displayOrder: String(blog.displayOrder || 0),
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeBlog = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this blog?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");

      await deleteBlog(id);

      setMessage("Blog removed.");
      loadBlogs();
    } catch {
      setError("Could not remove blog.");
    }
  };

  return (
    <section>
      <div className="admin-product-layout">
        <form className="admin-product-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Blog" : "Add Blog"}</h2>

          <label>Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Blog title"
          />

          <label>Slug</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="blog-url-slug"
          />

          <label>Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Brow Care"
          />

          <label>Excerpt *</label>
          <textarea
            name="excerpt"
            rows={3}
            value={form.excerpt}
            onChange={handleChange}
            required
            placeholder="Short blog summary..."
          />

          <label>Content *</label>
          <textarea
            name="content"
            rows={10}
            value={form.content}
            onChange={handleChange}
            required
            placeholder="Full blog content. Use new lines for paragraphs."
          />

          <label>Image URL</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://..."
          />

          <label>Author</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Brow Beauty Hub"
          />

          <label>Read Time</label>
          <input
            name="readTime"
            value={form.readTime}
            onChange={handleChange}
            placeholder="5 min read"
          />

          <label>Display Order</label>
          <input
            name="displayOrder"
            type="number"
            value={form.displayOrder}
            onChange={handleChange}
          />

          <label className="admin-checkbox-row">
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleCheckboxChange}
            />
            Featured blog
          </label>

          <label className="admin-checkbox-row">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleCheckboxChange}
            />
            Active blog
          </label>

          <div className="admin-product-actions">
            <button type="submit">{editingId ? "Update Blog" : "Add Blog"}</button>

            {editingId && (
              <button type="button" onClick={resetForm}>
                Cancel Edit
              </button>
            )}
          </div>

          {message && <p className="admin-success">{message}</p>}
          {error && <p className="admin-error">{error}</p>}
        </form>

        <div className="admin-products-list">
          <div className="admin-list-header">
            <h2>Blogs</h2>

            <button onClick={loadBlogs} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {blogs.length === 0 ? (
            <div className="admin-empty">
              <i className="fa-solid fa-blog"></i>
              <p>No blogs found.</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <article className="admin-product-card" key={blog.id}>
                <img
                  src={
                    blog.imageUrl ||
                    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&q=80"
                  }
                  alt={blog.title}
                />

                <div>
                  <h3>{blog.title}</h3>
                  <p>{blog.excerpt}</p>

                  <div className="admin-product-meta">
                    {blog.category && <span>{blog.category}</span>}
                    {blog.readTime && <span>{blog.readTime}</span>}
                    <span>{blog.isFeatured ? "Featured" : "Not Featured"}</span>
                    <span>{blog.isActive ? "Active" : "Inactive"}</span>
                  </div>

                  <div className="admin-product-buttons">
                    <button onClick={() => startEdit(blog)}>Edit</button>
                    <button onClick={() => removeBlog(blog.id)}>Remove</button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminBlogs;