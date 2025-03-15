import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState<LoginProps>({
    username: '',
    password: '',
  });
  const [loginState, setLoginState] = useState<AxiosError>({} as AxiosError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    try {
      const res = await axios.post(`/v2/admin/signin`, data);
      const { token, expired } = res.data;
      document.cookie = `admin_token=${token}; expires=${new Date(expired)};`;
      if (res.data.success) {
        navigate('/admin/products');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setLoginState(error.response?.data);
      }
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>登入帳號</h2>
          <div
            className={`alert alert-danger ${
              loginState.message ? 'd-block' : 'd-none'
            }`}
            role="alert"
          >
            {loginState.message}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label w-100">
              Email
              <input
                id="email"
                className="form-control"
                name="username"
                type="email"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label w-100">
              密碼
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="button" className="btn btn-primary" onClick={submit}>
            登入
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
