import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CartData } from '../../components/types/cart';

function FrontLayout() {
  const location = useLocation();
  const [navbar, setNavbar] = useState<boolean>(true);
  const [cartData, setCartData] = useState<CartData>({
    carts: [],
    total: 0,
    final_total: 0,
  });

  const getCartData = async () => {
    try {
      const cartRes = await axios.get(
        `/v2/api/${import.meta.env.VITE_API_PATH}/cart`
      );
      setCartData(cartRes.data.data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    setNavbar(location.pathname !== '/');
  }, [location]);

  return (
    <>
      {navbar && (
        <div className="container">
          <Navbar cartData={cartData} />
        </div>
      )}
      <Outlet context={{ getCartData, cartData }} />
      <div className="bg-light py-4">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start">
            <p className="mb-0 fw-bold">Lorem ipsum dolor sit amet.</p>
            <div className="input-group w-md-50 mt-md-0 mt-3">
              <input
                type="text"
                className="form-control rounded-0"
                placeholder=""
              />
              <div className="input-group-append">
                <button
                  className="btn btn-dark rounded-0"
                  type="button"
                  id="search"
                >
                  Lorem ipsum
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-dark py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
            <a className="text-white h4" href="./index.html">
              LOGO
            </a>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white ms-3">
                  <i className="fab fa-line"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
            <div className="mb-md-0 mb-1">
              <p className="mb-0">02-3456-7890</p>
              <p className="mb-0">service@mail.com</p>
            </div>
            <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FrontLayout;
