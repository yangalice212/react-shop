import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import CouponModal from '../../components/CouponModal';
import { dateFormatter } from '../../utils/dateFormatter';

export interface Coupon {
  id: string;
  title: string;
  is_enabled: number;
  percent: number;
  due_date: number;
  num: number;
  code: string;
}

function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [pagination, setPagination] = useState<Pagination>({} as Pagination);
  const [type, setType] = useState<'create' | 'edit'>('create');
  const [tempCoupon, setTempCoupon] = useState<Coupon>({} as Coupon);

  const couponModal = useRef<Modal | null>(null);
  const deleteCouponModal = useRef<Modal | null>(null);

  useEffect(() => {
    couponModal.current = new Modal('#couponModal', {
      backdrop: 'static',
    });
    deleteCouponModal.current = new Modal('#deleteModal', {
      backdrop: 'static',
    });
    getCoupons();
  }, []);

  const getCoupons = async (page = 1) => {
    const couponRes = await axios.get(
      `/v2/api/${import.meta.env.VITE_API_PATH}/admin/coupons?page=${page}`
    );
    setCoupons(couponRes.data.coupons);
    setPagination(couponRes.data.pagination);
  };

  const openCouponModal = (type: 'create' | 'edit', coupon?: Coupon) => {
    setType(type);
    if (coupon) {
      setTempCoupon(coupon);
    }
    couponModal.current?.show();
  };

  const closeCouponModal = () => {
    couponModal.current?.hide();
  };

  const openDeleteModal = (coupon: Coupon) => {
    setTempCoupon(coupon);
    deleteCouponModal.current?.show();
  };

  const closeDeleteModal = () => {
    deleteCouponModal.current?.hide();
  };

  const deleteCoupon = async (id: string) => {
    try {
      const res = await axios.delete(
        `/v2/api/${import.meta.env.VITE_API_PATH}/admin/coupon/${id}`
      );
      if (res.data.success) {
        closeDeleteModal();
        getCoupons();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3">
      <CouponModal
        closeCouponModal={closeCouponModal}
        getCoupons={getCoupons}
        type={type}
        tempCoupon={tempCoupon}
      />
      <DeleteModal
        closeDeleteModal={closeDeleteModal}
        title={tempCoupon.title}
        handleDelete={deleteCoupon}
        id={tempCoupon.id}
      />
      <h3>優惠卷列表</h3>
      <hr />
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => openCouponModal('create')}
        >
          建立新優惠卷
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">標題</th>
            <th scope="col">折扣</th>
            <th scope="col">到期日</th>
            <th scope="col">優惠碼</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => {
            return (
              <tr key={coupon.id}>
                <td>{coupon.title}</td>
                <td>{coupon.percent}%</td>
                <td>{`${dateFormatter(new Date(coupon.due_date))}`}</td>
                <td>{coupon.code}</td>
                <td>{coupon.is_enabled === 1 ? '啟用' : '未啟用'}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openCouponModal('edit', coupon)}
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => openDeleteModal(coupon)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pagination={pagination} changePage={getCoupons} />
    </div>
  );
}

export default AdminCoupons;
