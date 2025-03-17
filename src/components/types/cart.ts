import { Coupon } from '../../pages/admin/AdminCoupons';
import { Product } from './product';

export interface CartData {
  carts: CartItem[];
  total: number;
  final_total: number;
}

export interface CartItem {
  coupon: Coupon;
  final_total: number;
  id: string;
  product: Product;
  product_id: string;
  qty: number;
  total: number;
}
