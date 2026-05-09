import type { ShopProduct, ShopCategory } from "../types/shop";

export const PRODUCTS: ShopProduct[] = [
  { id: 1, name: "Eyebrow Gel", cat: "brow", price: 30, tag: "Bestseller", desc: "Professional styling gel for sculpted, defined brows all day long." },
  { id: 2, name: "Brow Kit", cat: "brow", price: 30, tag: null, desc: "Everything you need to shape and style your brows at home." },
  { id: 3, name: "Dark Brown Powder", cat: "brow", price: 20, tag: null, desc: "Pigmented brow powder for bold, defined arches with a soft finish." },

  // paste the remaining old products here from old js/shop.js
];

export const CAT_IMAGES: Record<ShopCategory, string> = {
  brow: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=400&q=80",
  lash: "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=400&q=80",
  skin: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
  wax: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80",
  tattoo: "https://images.unsplash.com/photo-1588776814546-ec7e55c5b7e7?w=400&q=80",
  general: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
};

export const CAT_LABELS: Record<ShopCategory, string> = {
  brow: "Brow",
  lash: "Lash",
  skin: "Skin Care",
  wax: "Wax & Tools",
  tattoo: "Tattoo & PMU",
  general: "General Beauty",
};

export function fmtPrice(price: number | null) {
  if (price === null) return "Enquire";
  if (price === 0) return "POA";
  return `$${price.toFixed(2)}`;
}