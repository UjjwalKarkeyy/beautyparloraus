import { getAdminAuthHeaders } from "./adminAuthApi";
import type { Blog, BlogForm } from "../types/blog";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function getBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_BASE_URL}/blogs`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not load blogs");
  }

  return data;
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not load blog");
  }

  return data;
}

export async function getAdminBlogs(): Promise<Blog[]> {
  const response = await fetch(`${API_BASE_URL}/blogs/admin/all`, {
    headers: {
      ...getAdminAuthHeaders(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not load admin blogs");
  }

  return data;
}

export async function createBlog(payload: BlogForm) {
  const response = await fetch(`${API_BASE_URL}/blogs/admin`, {
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
    throw new Error(data.error || "Could not create blog");
  }

  return data;
}

export async function updateBlog(id: number, payload: BlogForm) {
  const response = await fetch(`${API_BASE_URL}/blogs/admin/${id}`, {
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
    throw new Error(data.error || "Could not update blog");
  }

  return data;
}

export async function deleteBlog(id: number) {
  const response = await fetch(`${API_BASE_URL}/blogs/admin/${id}`, {
    method: "DELETE",
    headers: {
      ...getAdminAuthHeaders(),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not delete blog");
  }

  return data;
}