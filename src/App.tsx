import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />}>
          <Route path="products" element={<AdminProducts />} />
          {/* <Route path="/coupons" element={<div>Coupons</div>} /> */}
          {/* <Route path="/orders" element={<div>Orders</div>} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
