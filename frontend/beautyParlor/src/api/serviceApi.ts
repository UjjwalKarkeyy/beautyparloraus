import type { Service } from "../types/service";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${API_BASE_URL}/services`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not load services");
  }

  return data;
}

export async function getServiceBySlug(slug: string): Promise<Service> {
  const response = await fetch(`${API_BASE_URL}/services/${slug}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not load service");
  }

  return data;
}