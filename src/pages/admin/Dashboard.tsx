import axios from 'axios';
import { useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Message, { MessageRef } from '../../components/Message';
import { MessageContext } from '../../store/messageStore';

function Dashboard() {
  const navigate = useNavigate();
  const msgRef = useRef<MessageRef | null>(null);

  const handleSuccessMessage = (content: string, title: string = '成功') => {
    msgRef.current?.handleSuccessMessage(content, title);
  };

  const handleErrorMessage = (
    content: string | string[],
    title: string = '失敗'
  ) => {
    msgRef.current?.handleErrorMessage(content, title);
  };

  const contextValue = {
    handleSuccessMessage,
    handleErrorMessage,
  };

  const logout = () => {
    document.cookie = 'admin_token=;';
    navigate('/login');
  };

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('admin_token='))
    ?.split('=')[1];
  axios.defaults.headers.common['Authorization'] = token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    } else {
      (async () => {
        try {
          await axios.post('/v2/api/user/check');
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && !error.response?.data.success) {
            navigate('/login');
          }
        }
      })();
    }
  }, [navigate, token]);

  return (
    <MessageContext.Provider value={contextValue}>
      <Message ref={msgRef} />
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <p className="text-white mb-0">後台管理系統</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            data-bs-theme="dark"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={logout}
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <div className="bg-light" style={{ width: '200px' }}>
          <ul className="list-group list-group-flush">
            <Link
              className="list-group-item list-group-item-action py-3"
              to="/admin/products"
            >
              <i className="bi bi-box me-2" />
              產品列表
            </Link>
            <Link
              className="list-group-item list-group-item-action py-3"
              to="/admin/coupons"
            >
              <i className="bi bi-ticket-perforated me-2" />
              優惠卷列表
            </Link>
            <Link
              className="list-group-item list-group-item-action py-3"
              to="/admin/orders"
            >
              <i className="bi bi-clipboard me-2" />
              訂單列表
            </Link>
          </ul>
        </div>
        <div className="w-100">{token && <Outlet />}</div>
      </div>
    </MessageContext.Provider>
  );
}

export default Dashboard;
