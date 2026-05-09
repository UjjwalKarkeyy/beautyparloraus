import type { CreateShopOrderPayload, ShopProduct } from "../types/shop";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function getShopProducts(): Promise<ShopProduct[]> {
  const response = await fetch(`${API_BASE_URL}/products`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not load products");
  }

  return data.map((product: ShopProduct) => ({
    ...product,
    price: product.price === null ? null : Number(product.price),
  }));
}

export async function createShopOrder(payload: CreateShopOrderPayload) {
  const response = await fetch(`${API_BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not place order");
  }

  return data;
}