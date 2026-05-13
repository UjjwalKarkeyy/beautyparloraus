import { NavLink, Link } from "react-router-dom";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  closeSidebar: () => void;
}

const adminLinks = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: "fa-solid fa-chart-line",
  },
  {
    label: "Orders",
    path: "/admin/orders",
    icon: "fa-solid fa-box",
  },
  {
    label: "Products",
    path: "/admin/products",
    icon: "fa-solid fa-bag-shopping",
  },
  {
    label: "Services",
    path: "/admin/services",
    icon: "fa-solid fa-spa",
  },
  {
    label: "Client Reviews",
    path: "/admin/reviews",
    icon: "fa-solid fa-star",
  },
  {
    label: "Homepage Data",
    path: "/admin/homepage",
    icon: "fa-solid fa-house",
  },
  {
    label: "Blogs",
    path: "/admin/blogs",
    icon: "fa-solid fa-blog",
  },
];

const futureLinks = [
  {
    label: "Homepage Content",
    icon: "fa-solid fa-photo-film",
  },
  {
    label: "Settings",
    icon: "fa-solid fa-gear",
  },
];

function AdminSidebar({ sidebarOpen, closeSidebar }: AdminSidebarProps) {
  return (
    <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="admin-sidebar-top">
        <h2>BBH Admin</h2>
        <p>Management Panel</p>
      </div>

      <nav className="admin-sidebar-nav">
        {adminLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? "admin-side-link active" : "admin-side-link"
            }
          >
            <i className={link.icon}></i>
            <span>{link.label}</span>
          </NavLink>
        ))}

        <div className="admin-sidebar-label">Coming Soon</div>

        {futureLinks.map((link) => (
          <div className="admin-side-link disabled" key={link.label}>
            <i className={link.icon}></i>
            <span>{link.label}</span>
          </div>
        ))}
      </nav>

      <div className="admin-sidebar-bottom">
        <Link to="/" className="admin-back-site">
          <i className="fa-solid fa-arrow-left"></i>
          Back to Website
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;