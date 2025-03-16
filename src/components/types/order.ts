import Pagination from '../Pagination';

export interface Orders {
  orders: Order[];
  pagination: Pagination;
  messages: [];
}

export interface OrderPayload {
  create_at: number;
  is_paid: boolean;
  message: string;
  products: {
    [key: string]: OrderProduct;
  };
  user: OrderUser;
  num: number;
  status: number;
}

export interface Order extends OrderPayload {
  id: string;
  total: number;
  paid_date: number;
}

export interface OrderProduct {
  id: string;
  product_id: string;
  qty: string;
}

export interface OrderUser {
  address: string;
  email: string;
  name: string;
  tel: string;
}
