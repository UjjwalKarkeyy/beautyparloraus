export type ShopCategory =
  | "brow"
  | "lash"
  | "skin"
  | "wax"
  | "tattoo"
  | "general";

export interface ShopProduct {
  id: number;
  name: string;
  cat: ShopCategory;
  price: number | null;
  tag: string | null;
  desc: string;
  imageUrl?: string | null;
}

export interface ShopCartItem {
  id: number;
  qty: number;
}

export interface CheckoutCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  notes: string;
}

export interface CreateShopOrderPayload {
  customer: CheckoutCustomer;
  items: {
    id: number;
    name: string;
    qty: number;
    price: number;
  }[];
  subtotal: number;
  total: number;
}