import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Coupon } from '../pages/admin/AdminCoupons';
import { dateFormatter } from '../utils/dateFormatter';
import { MessageContext } from '../store/messageStore';

interface CouponModalProps {
  closeCouponModal: () => void;
  getCoupons: () => void;
  type: 'create' | 'edit';
  tempCoupon: Coupon;
}

interface CouponPayload {
  title: string;
  is_enabled: number;
  percent: number;
  due_date: number;
  code: string;
}

function CouponModal({
  closeCouponModal,
  getCoupons,
  type,
  tempCoupon,
}: CouponModalProps) {
  const [tempData, setTempData] = useState<CouponPayload>({
    title: '',
    is_enabled: 0,
    percent: 0,
    due_date: 0,
    code: '',
  });
  const [date, setDate] = useState<Date>(new Date());
  const { handleSuccessMessage, handleErrorMessage } =
    useContext(MessageContext);

  useEffect(() => {
    setTempData(
      type === 'create'
        ? {
            title: '',
            is_enabled: 0,
            percent: 0,
            due_date: new Date().getTime(),
            code: '',
          }
        : tempCoupon
    );
  }, [type, tempCoupon]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newData: string | number | null = value;
    switch (name) {
      case 'percent': {
        newData = Number(value);
        break;
      }
      case 'due_date': {
        setDate(new Date(value));
        newData = new Date(value).getTime();
        break;
      }
      case 'is_enabled': {
        newData = +(e.target as HTMLInputElement).checked;
        break;
      }
    }
    setTempData((prev) => ({
      ...prev,
      [name]: newData,
    }));
  };

  const submit = async () => {
    try {
      const method = type === 'create' ? 'post' : 'put';
      const api =
        `/v2/api/${import.meta.env.VITE_API_PATH}/admin/coupon` +
        (type === 'edit' ? `/${tempCoupon.id}` : '');
      const res = await axios[method](api, {
        data: tempData,
      });
      if (res.data.success) {
        closeCouponModal();
        handleSuccessMessage(res.data.message);
        getCoupons();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleErrorMessage(error?.response?.data?.message ?? 'Error');
    }
  };
  return (
    <div
      className="modal fade"
      id="couponModal"
      tabIndex={-1}
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="couponModalLabel">
              {type === 'create' ? '新增優惠卷' : `編輯 ${tempCoupon.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeCouponModal}
            />
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label className="w-100" htmlFor="title">
                標題
                <input
                  type="text"
                  id="title"
                  placeholder="請輸入標題"
                  name="title"
                  className="form-control mt-1"
                  onChange={handleInputChange}
                  value={tempData.title}
                />
              </label>
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="percent">
                  折扣（%）
                  <input
                    type="text"
                    name="percent"
                    id="percent"
                    placeholder="請輸入折扣（%）"
                    className="form-control mt-1"
                    onChange={handleInputChange}
                    value={tempData.percent}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="due_date">
                  到期日
                  <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    placeholder="請輸入到期日"
                    className="form-control mt-1"
                    onChange={handleInputChange}
                    value={`${dateFormatter(date)}`}
                  />
                </label>
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="code">
                  優惠碼
                  <input
                    type="text"
                    id="code"
                    name="code"
                    placeholder="請輸入優惠碼"
                    className="form-control mt-1"
                    onChange={handleInputChange}
                    value={tempData.code}
                  />
                </label>
              </div>
            </div>
            <label className="form-check-label" htmlFor="is_enabled">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="is_enabled"
                name="is_enabled"
                onChange={handleInputChange}
                checked={!!tempData.is_enabled}
              />
              是否啟用
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeCouponModal}
            >
              關閉
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponModal;
