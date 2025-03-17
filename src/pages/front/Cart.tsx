import { Link, useOutletContext } from 'react-router-dom';
import SwiperComponent from '../../components/Swiper';
import { CartData, CartItem } from '../../components/types/cart';
import axios from 'axios';
import { SetStateAction, useState } from 'react';

function Cart() {
  const { cartData, getCartData } = useOutletContext<{
    cartData: CartData;
    getCartData: () => void;
  }>();
  const [loadingItems, setLoadingItems] = useState<SetStateAction<string>[]>(
    []
  );

  const removeItem = async (id: string) => {
    try {
      await axios.delete(`/v2/api/${import.meta.env.VITE_API_PATH}/cart/${id}`);
      getCartData();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const updateItem = async (cartItem: CartItem, change: number) => {
    try {
      setLoadingItems([...loadingItems, cartItem.id]);
      const updatedCarts = cartData.carts.map((item) => {
        if (item.id === cartItem.id) {
          const newQty = item.qty + change;
          return { ...item, qty: newQty };
        }
        return item;
      });
      const updatedItem = updatedCarts.find((item) => item.id === cartItem.id);
      if (updatedItem) {
        await axios.put(
          `/v2/api/${import.meta.env.VITE_API_PATH}/cart/${cartItem.id}`,
          {
            data: {
              product_id: cartItem.product_id,
              qty: updatedItem.qty,
            },
          }
        );
        getCartData();
      }
    } catch (error) {
      console.error('Error updating item:', error);
    } finally {
      setLoadingItems(
        loadingItems.filter((loadingObject) => loadingObject !== cartItem.id)
      );
    }
  };

  return (
    <div className="container">
      <div className="mt-3">
        <h3 className="mt-3 mb-4">您的商品</h3>
        <div className="row">
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="border-0 ps-0">
                    名稱
                  </th>
                  <th scope="col" className="border-0">
                    數量
                  </th>
                  <th scope="col" className="border-0">
                    金額
                  </th>
                  <th scope="col" className="border-0"></th>
                </tr>
              </thead>
              <tbody>
                {cartData.carts.map((item, id) => {
                  return (
                    <tr
                      className={`border-bottom ${
                        id === 1 ? 'border-top' : ''
                      }`}
                      key={id}
                    >
                      <th
                        scope="row"
                        className="border-0 px-0 font-weight-normal py-4"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt=""
                          style={{
                            width: '72px',
                            height: '72px',
                            objectFit: 'cover',
                          }}
                        />
                        <p className="mb-0 fw-bold ms-3 d-inline-block">
                          {item.product.title}
                        </p>
                      </th>
                      <td
                        className="border-0 align-middle"
                        style={{ maxWidth: '160px' }}
                      >
                        <div className="input-group pe-5">
                          <div className="input-group-prepend">
                            <button
                              className="btn btn-outline-dark border-0 py-2"
                              type="button"
                              id="button-addon1"
                              onClick={() => updateItem(item, -1)}
                              disabled={loadingItems.includes(item.id)}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control border-0 text-center my-auto shadow-none"
                            placeholder=""
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            value={item.qty}
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-dark border-0 py-2"
                              type="button"
                              id="button-addon2"
                              onClick={() => updateItem(item, +1)}
                              disabled={loadingItems.includes(item.id)}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="border-0 align-middle">
                        <p className="mb-0 ms-auto">NT${item.final_total}</p>
                      </td>
                      <td className="border-0 align-middle">
                        <button
                          type="button"
                          className="btn"
                          onClick={() => removeItem(item.id)}
                        >
                          <i className="bi bi-x-lg"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="input-group w-50 mb-3">
              <input
                type="text"
                className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                placeholder="Coupon Code"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                  type="button"
                  id="button-addon2"
                >
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border p-4 mb-4">
              <h4 className="fw-bold mb-4">Order Detail</h4>
              <table className="table text-muted border-bottom">
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-4 font-weight-normal"
                    >
                      Subtotal
                    </th>
                    <td className="text-end border-0 px-0 pt-4">
                      NT${cartData.total}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                    >
                      Payment
                    </th>
                    <td className="text-end border-0 px-0 pt-0 pb-4">
                      ApplePay
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">Total</p>
                <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
              </div>
              <Link to="/checkout" className="btn btn-dark w-100 mt-4">
                確認訂單
              </Link>
            </div>
          </div>
        </div>
        <div className="my-5">
          <SwiperComponent productSwiper={[]} title={'瀏覽更多商品'} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
