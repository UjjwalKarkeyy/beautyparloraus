const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const ADMIN_TOKEN_KEY = "bbh_admin_token";

export async function loginAdmin(username: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Admin login failed");
  }

  localStorage.setItem(ADMIN_TOKEN_KEY, data.token);

  return data;
}

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function getAdminAuthHeaders() {
  const token = getAdminToken();

  return {
    Authorization: `Bearer ${token}`,
  };
}

export function isAdminLoggedIn() {
  return Boolean(getAdminToken());
}

export function logoutAdmin() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem("bbh_admin_key");
}