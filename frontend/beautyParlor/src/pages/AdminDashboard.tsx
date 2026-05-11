import { Link } from "react-router-dom";

const activeCards = [
  {
    title: "Orders",
    description: "View customer orders, update order status, and later notify users by email.",
    path: "/admin/orders",
    icon: "fa-solid fa-box",
  },
  {
    title: "Products",
    description: "Add, edit, and remove beauty products from the shop.",
    path: "/admin/products",
    icon: "fa-solid fa-bag-shopping",
  },
  {
    title: "Services",
    description: "Manage beauty services shown on the website and service detail pages.",
    path: "/admin/services",
    icon: "fa-solid fa-spa",
  },
  {
  title: "Client Reviews",
  description: "Add and manage customer testimonials for the homepage.",
  path: "/admin/reviews",
  icon: "fa-solid fa-star",
  },
];

const futureCards = [
  {
    title: "Homepage Content",
    description: "Manage homepage videos, banners, gallery images, and promotional sections.",
    icon: "fa-solid fa-photo-film",
  },
  {
    title: "Settings",
    description: "Update business info, contact details, social links, and general website settings.",
    icon: "fa-solid fa-gear",
  },
];

function AdminDashboard() {
  return (
    <section className="admin-dashboard-page">
      <div className="admin-dashboard-grid">
        {activeCards.map((card) => (
          <Link to={card.path} className="admin-dashboard-card" key={card.title}>
            <div className="admin-dashboard-icon">
              <i className={card.icon}></i>
            </div>

            <h2>{card.title}</h2>
            <p>{card.description}</p>

            <span>
              Manage <i className="fa-solid fa-arrow-right"></i>
            </span>
          </Link>
        ))}

        {futureCards.map((card) => (
          <div className="admin-dashboard-card coming-soon" key={card.title}>
            <div className="admin-dashboard-icon">
              <i className={card.icon}></i>
            </div>

            <h2>{card.title}</h2>
            <p>{card.description}</p>

            <span>Coming Soon</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AdminDashboard;