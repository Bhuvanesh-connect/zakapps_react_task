import { Routes, Route, Navigate } from 'react-router-dom';

import ProductPage from './../components/products/index';
import AdminPage from './../components/admin/index';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default AppRoutes;
