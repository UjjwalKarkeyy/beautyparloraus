export interface AdminOrderItem {
  id?: number;
  name: string;
  qty: number;
  price: number;
}

export interface AdminCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postcode: string;
  notes?: string;
}

export interface AdminOrder {
  id: number;
  orderNumber: string;
  customer: AdminCustomer;
  items: AdminOrderItem[];
  subtotal: number;
  total: number;
  status: string;
  createdAt: string;
}