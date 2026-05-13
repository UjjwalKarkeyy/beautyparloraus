import { useEffect, useState } from "react";
import {
  createHomepageStat,
  deleteHomepageStat,
  getAdminHomepageStats,
  updateHomepageStat,
} from "../api/homepageApi";
import type { HomepageStat, HomepageStatForm } from "../types/homepage";

const emptyForm: HomepageStatForm = {
  value: "",
  suffix: "",
  label: "",
  displayOrder: "0",
  isActive: true,
};

function AdminHomepage() {
  const [stats, setStats] = useState<HomepageStat[]>([]);
  const [form, setForm] = useState<HomepageStatForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadStats = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminHomepageStats();
      setStats(data);
    } catch {
      setError("Could not load homepage stats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
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
    setForm({
      ...form,
      isActive: event.target.checked,
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
        await updateHomepageStat(editingId, form);
        setMessage("Homepage stat updated.");
      } else {
        await createHomepageStat(form);
        setMessage("Homepage stat added.");
      }

      resetForm();
      loadStats();
    } catch {
      setError("Could not save homepage stat.");
    }
  };

  const startEdit = (stat: HomepageStat) => {
    setEditingId(stat.id);

    setForm({
      value: stat.value,
      suffix: stat.suffix || "",
      label: stat.label,
      displayOrder: String(stat.displayOrder || 0),
      isActive: stat.isActive,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeStat = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this homepage stat?"
    );

    if (!confirmDelete) return;

    try {
      setError("");
      setMessage("");

      await deleteHomepageStat(id);

      setMessage("Homepage stat removed.");
      loadStats();
    } catch {
      setError("Could not remove homepage stat.");
    }
  };

  return (
    <section>
      <div className="admin-product-layout">
        <form className="admin-product-form" onSubmit={handleSubmit}>
          <h2>{editingId ? "Edit Homepage Stat" : "Add Homepage Stat"}</h2>

          <label>Value *</label>
          <input
            name="value"
            value={form.value}
            onChange={handleChange}
            required
            placeholder="5000"
          />

          <label>Suffix</label>
          <input
            name="suffix"
            value={form.suffix}
            onChange={handleChange}
            placeholder="+"
          />

          <label>Label *</label>
          <input
            name="label"
            value={form.label}
            onChange={handleChange}
            required
            placeholder="Happy Clients"
          />

          <label>Display Order</label>
          <input
            name="displayOrder"
            type="number"
            value={form.displayOrder}
            onChange={handleChange}
            placeholder="1"
          />

          <label className="admin-checkbox-row">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={handleCheckboxChange}
            />
            Active stat
          </label>

          <div className="admin-product-actions">
            <button type="submit">
              {editingId ? "Update Stat" : "Add Stat"}
            </button>

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
            <h2>Homepage Stats</h2>

            <button onClick={loadStats} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {stats.length === 0 ? (
            <div className="admin-empty">
              <i className="fa-solid fa-chart-simple"></i>
              <p>No homepage stats found.</p>
            </div>
          ) : (
            <div className="admin-home-stats-grid">
              {stats.map((stat) => (
                <article className="admin-home-stat-card" key={stat.id}>
                  <div>
                    <h3>
                      {stat.value}
                      {stat.suffix}
                    </h3>
                    <p>{stat.label}</p>
                  </div>

                  <div className="admin-product-meta">
                    <span>Order: {stat.displayOrder}</span>
                    <span>{stat.isActive ? "Active" : "Inactive"}</span>
                  </div>

                  <div className="admin-product-buttons">
                    <button onClick={() => startEdit(stat)}>Edit</button>
                    <button onClick={() => removeStat(stat.id)}>Remove</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminHomepage;