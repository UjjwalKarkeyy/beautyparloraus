import { getAdminAuthHeaders } from "./adminAuthApi";
import type { HomepageStat, HomepageStatForm } from "../types/homepage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function getHomepageStats(): Promise<HomepageStat[]> {
  const response = await fetch(`${API_BASE_URL}/homepage/stats`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not load homepage stats");
  }

  return data;
}

export async function getAdminHomepageStats(): Promise<HomepageStat[]> {
  const response = await fetch(`${API_BASE_URL}/homepage/stats/admin/all`, {
    headers: {
      ...getAdminAuthHeaders(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not load admin homepage stats");
  }

  return data;
}

export async function createHomepageStat(payload: HomepageStatForm) {
  const response = await fetch(`${API_BASE_URL}/homepage/stats/admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAdminAuthHeaders(),
    },
    body: JSON.stringify({
      ...payload,
      displayOrder: Number(payload.displayOrder),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not create homepage stat");
  }

  return data;
}

export async function updateHomepageStat(id: number, payload: HomepageStatForm) {
  const response = await fetch(`${API_BASE_URL}/homepage/stats/admin/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAdminAuthHeaders(),
    },
    body: JSON.stringify({
      ...payload,
      displayOrder: Number(payload.displayOrder),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not update homepage stat");
  }

  return data;
}

export async function deleteHomepageStat(id: number) {
  const response = await fetch(`${API_BASE_URL}/homepage/stats/admin/${id}`, {
    method: "DELETE",
    headers: {
      ...getAdminAuthHeaders(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not delete homepage stat");
  }

  return data;
}