import { useEffect, useRef, useState } from 'react';
import { Order } from '../../components/types/order';
import { Modal } from 'bootstrap';
import Pagination from '../../components/Pagination';
import axios from 'axios';
import OrderModal from '../../components/OrderModal';
// import DeleteModal from '../../components/DeleteModal';

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState<Pagination>({} as Pagination);
  const [tempOrder, setTempOrder] = useState<Order>({} as Order);

  const orderModal = useRef<Modal | null>(null);
  // const deleteOrderModal = useRef<Modal | null>(null);

  useEffect(() => {
    orderModal.current = new Modal('#orderModal', {
      backdrop: 'static',
    });
    // deleteOrderModal.current = new Modal('#deleteModal', {
    //   backdrop: 'static',
    // });
    getOrders();
  }, []);

  const getOrders = async (page = 1) => {
    const orderRes = await axios.get(
      `/v2/api/${import.meta.env.VITE_API_PATH}/admin/orders?page=${page}`
    );
    setOrders(orderRes.data.orders);
    setPagination(orderRes.data.pagination);
  };

  const openOrderModal = (order?: Order) => {
    if (order) {
      setTempOrder(order);
    }
    orderModal.current?.show();
  };

  const closeOrderModal = () => {
    orderModal.current?.hide();
  };

  // const openDeleteModal = (order: Order) => {
  //   setTempOrder(order);
  //   deleteOrderModal.current?.show();
  // };

  // const closeDeleteModal = () => {
  //   deleteOrderModal.current?.hide();
  // };

  // const deleteOrder = async (id: string) => {
  //   try {
  //     const res = await axios.delete(
  //       `/v2/api/${import.meta.env.VITE_API_PATH}/admin/coupon${id}`
  //     );
  //     if (res.data.success) {
  //       closeDeleteModal();
  //       getOrders();
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="p-3">
      <OrderModal
        closeOrderModal={closeOrderModal}
        getOrders={getOrders}
        tempOrder={tempOrder}
      />
      {/* <DeleteModal
        closeDeleteModal={closeDeleteModal}
        title={tempOrder.id}
        handleDelete={deleteOrder}
        id={tempOrder.id}
      /> */}
      <h3>訂單列表</h3>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">訂單 id</th>
            <th scope="col">購買用戶</th>
            <th scope="col">訂單金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">付款日期</th>
            <th scope="col">留言訊息</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.user?.name}
                  {order.user?.email}
                </td>
                <td>${order.total}</td>
                <td>
                  {order.is_paid ? (
                    <span className="text-success fw-bold">付款完成</span>
                  ) : (
                    '未付款'
                  )}
                </td>
                <td>
                  {order.paid_date
                    ? new Date(order.paid_date * 1000).toLocaleString()
                    : '未付款'}
                </td>
                <td>{order.message}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      openOrderModal(order);
                    }}
                  >
                    查看
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getOrders} />
    </div>
  );
}

export default AdminOrders;
