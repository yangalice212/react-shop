import { NavLink, useLocation } from 'react-router-dom';
import { CartData } from './types/cart';

interface NavbarProps {
  cartData: CartData;
}

function Navbar({ cartData }: NavbarProps) {
  const location = useLocation();

  const active = (current?: string) => {
    return location.pathname === `/${current}` ? 'active' : '';
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <NavLink className="navbar-brand" to="/">
          Navbar
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <NavLink className={`nav-item nav-link me-4 ${active()}`} to="/">
              Home
            </NavLink>
            <NavLink
              className={`nav-item nav-link me-4 ${active('products')}`}
              to="/products"
            >
              Product
            </NavLink>
            {/* <NavLink
              className={`nav-item nav-link me-4 ${active()}`}
              to="/detail"
            >
              Detail
            </NavLink> */}
            <NavLink className="nav-item nav-link position-relative" to="/cart">
              <i className="bi bi-bag"></i>
              <span className="position-absolute start-100 translate-middle badge rounded-pill bg-danger">
                {cartData?.carts?.length}
              </span>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
