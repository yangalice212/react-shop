import { useForm } from 'react-hook-form';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { CartData } from '../../components/types/cart';
import { Input, TextArea } from '../../components/FormElement';
import axios from 'axios';

interface FormData {
  name: string;
  email: string;
  tel: string;
  address: string;
  note?: string;
}

function Checkout() {
  const { cartData, getCartData } = useOutletContext<{
    cartData: CartData;
    getCartData: () => void;
  }>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormData) => {
    const { name, email, tel, address, note } = data;
    try {
      const checkoutRes = await axios.post(
        `/v2/api/${import.meta.env.VITE_API_PATH}/order`,
        {
          data: {
            user: {
              name,
              email,
              tel,
              address,
            },
            message: note,
          },
        }
      );
      getCartData();
      navigate(`/complete/${checkoutRes.data.orderId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h3 className="fw-bold mb-4 pt-3">Checkout</h3>
        </div>
      </div>
      <div className="row flex-row-reverse justify-content-center pb-5">
        <div className="col-md-4">
          <div className="border p-4 mb-4">
            {cartData.carts.map((item, i) => {
              return (
                <div
                  className={`d-flex ${i === 0 ? '' : 'mt-2'}`}
                  key={item.id}
                >
                  <img
                    src={item.product.imageUrl}
                    alt=""
                    className="me-2 object-cover"
                    style={{
                      width: '48px',
                      height: '48px',
                    }}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <p className="mb-0 fw-bold">{item.product.title}</p>
                      <p className="mb-0">NT${item.final_total}</p>
                    </div>
                    <p className="mb-0 fw-bold">x{item.qty}</p>
                  </div>
                </div>
              );
            })}
            <table className="table mt-4 border-top border-bottom text-muted">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-4 font-weight-normal"
                  >
                    Subtotal
                  </th>
                  <td className="text-end border-0 px-0 pt-4">
                    NT$ {cartData.total}
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                  >
                    Payment
                  </th>
                  <td className="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between mt-4">
              <p className="mb-0 h4 fw-bold">Total</p>
              <p className="mb-0 h4 fw-bold">NT$ {cartData.final_total}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Contact information</p>
            <div className="mb-0">
              <Input
                id="email"
                labelText="Email"
                errors={errors}
                register={register}
                rules={{
                  required: 'Email 為必填',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email 格式不正確',
                  },
                }}
              ></Input>
            </div>
            <div className="mb-2">
              <Input
                id="name"
                labelText="姓名"
                errors={errors}
                register={register}
                rules={{
                  required: '姓名為必填',
                  maxLength: {
                    value: 10,
                    message: '姓名長度不超過 10',
                  },
                }}
              ></Input>
            </div>
            <div className="mb-2">
              <Input
                id="tel"
                labelText="電話"
                type="tel"
                errors={errors}
                register={register}
                rules={{
                  required: '電話為必填',
                  minLength: {
                    value: 6,
                    message: '電話不少於 6 碼',
                  },
                  maxLength: {
                    value: 12,
                    message: '電話不超過 12 碼',
                  },
                }}
              ></Input>
            </div>
            <div className="mb-2">
              <Input
                id="address"
                labelText="地址"
                errors={errors}
                register={register}
                rules={{
                  required: '地址為必填',
                }}
              ></Input>
            </div>
            <div className="mb-2">
              <TextArea
                id="note"
                labelText="備註"
                errors={errors}
                register={register}
              ></TextArea>
            </div>
            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              <Link to="/cart" className="text-dark mt-md-0 mt-3">
                <i className="bi bi-chevron-left me-2"></i> 上一步
              </Link>
              <button type="submit" className="btn btn-dark py-3 px-7">
                前往付款
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
