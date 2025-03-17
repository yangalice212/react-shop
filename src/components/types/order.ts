import Pagination from '../Pagination';
import { Product } from './product';

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
  final_total: number;
  id: string;
  product: Product;
  product_id: string;
  qty: number;
  total: number;
}

export interface OrderUser {
  address: string;
  email: string;
  name: string;
  tel: string;
}
