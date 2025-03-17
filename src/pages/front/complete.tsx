import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Order } from '../../components/types/order';

function Complete() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order>({} as Order);

  const getOrder = async (id: string) => {
    try {
      const orderRes = await axios.get(
        `/v2/api/${import.meta.env.VITE_API_PATH}/order/${id}`
      );
      setOrder(orderRes.data.order);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, [id]);

  return (
    <div className="container">
      <div
        style={{
          minHeight: '400px',
          backgroundImage: `url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)`,
          backgroundPosition: 'center center',
        }}
      ></div>
      <div className="mt-5 mb-7">
        <div className="row">
          <div className="col-md-6">
            <h2>Checkout Success</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              ullam odit, illo sed delectus cum. Assumenda, illo pariatur!
              Tenetur, est!
            </p>
            <Link to="/" className="btn btn-outline-dark me-2 rounded-0 mb-4">
              Back To Home
            </Link>
          </div>
          <div className="col-md-6">
            <div className="card rounded-0 py-4">
              <div className="card-header border-bottom-0 bg-white px-4 py-0">
                <h2>Order Detail</h2>
              </div>
              <div className="card-body px-4 py-0">
                <ul className="list-group list-group-flush">
                  {Object.values(order?.products || {}).map((product) => (
                    <li className="list-group-item px-0">
                      <div className="d-flex mt-2">
                        <img
                          src={product.product.imageUrl}
                          alt=""
                          className="me-2 object-cover"
                          style={{ width: '60px', height: '60px' }}
                        />
                        <div className="w-100 d-flex flex-column">
                          <div className="d-flex justify-content-between fw-bold">
                            <h5>{product.product.title}</h5>
                            <p className="mb-0">x{product.qty}</p>
                          </div>
                          <div className="d-flex justify-content-between mt-auto">
                            <p className="text-muted mb-0">
                              <small>NT${product.total}</small>
                            </p>
                            <p className="mb-0">NT${product.final_total}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                  <li className="list-group-item px-0 pb-0">
                    <table className="table text-muted">
                      <tbody>
                        <tr>
                          <th
                            scope="row"
                            className="border-0 px-0 font-weight-normal"
                          >
                            Subtotal
                          </th>
                          <td className="text-end border-0 px-0">
                            NT${order.total}
                          </td>
                        </tr>
                        <tr>
                          <th
                            scope="row"
                            className="border-0 px-0 pt-0 font-weight-normal"
                          >
                            Payment
                          </th>
                          <td className="text-end border-0 px-0 pt-0">
                            ApplePay
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between mt-2">
                      <p className="mb-0 h4 fw-bold">總金額</p>
                      <p className="mb-0 h4 fw-bold">NT$ {order.total}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complete;
