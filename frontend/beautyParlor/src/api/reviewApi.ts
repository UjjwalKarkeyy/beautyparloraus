import type { Review } from "../types/review";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function getFeaturedReviews(): Promise<Review[]> {
  const response = await fetch(`${API_BASE_URL}/reviews/featured`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not load reviews");
  }

  return data;
}