import { Navigate, Outlet } from "react-router-dom";
import { isAdminLoggedIn } from "../../api/adminAuthApi";

function AdminProtectedRoute() {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default AdminProtectedRoute;