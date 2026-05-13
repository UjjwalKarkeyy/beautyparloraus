import { useLocation, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../api/adminAuthApi";

const pageInfo: Record<string, { title: string; subtitle: string }> = {
  "/admin": {
    title: "Dashboard",
    subtitle: "Manage your beauty parlour website from one place.",
  },
  "/admin/orders": {
    title: "Orders",
    subtitle: "View customer orders, update status, and manage purchases.",
  },
  "/admin/products": {
    title: "Products",
    subtitle: "Add, edit, and remove shop products.",
  },
  "/admin/services": {
    title: "Services",
    subtitle: "Manage the beauty services shown on the website.",
  },
  "/admin/reviews": {
    title: "Client Reviews",
    subtitle: "Add, edit, and manage customer testimonials.",
  },
  "/admin/homepage": {
    title: "Homepage Data",
    subtitle: "Update homepage statistics and visible homepage values.",
  },
  "/admin/blogs": {
    title: "Blogs",
    subtitle: "Add, edit, and manage website blog posts.",
  },
};

interface AdminHeaderProps {
  openSidebar: () => void;
}

function AdminHeader({ openSidebar }: AdminHeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = pageInfo[location.pathname] || {
    title: "Admin Panel",
    subtitle: "Manage website content.",
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <header className="admin-top-header">
      <button className="admin-mobile-menu" onClick={openSidebar}>
        <i className="fa-solid fa-bars"></i>
      </button>

      <div className="admin-header-text">
        <p className="admin-eyebrow">Brow Beauty Hub</p>
        <h1>{currentPage.title}</h1>
        <p>{currentPage.subtitle}</p>
      </div>

      <button className="admin-logout-btn" onClick={handleLogout}>
        <i className="fa-solid fa-right-from-bracket"></i>
        Logout
      </button>
    </header>
  );
}

export default AdminHeader;