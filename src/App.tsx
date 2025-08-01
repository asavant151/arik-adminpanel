import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Layout from "./pages/admin/Layout.tsx";
import AllProduct from "./pages/admin/AllProduct.tsx";
import OrderList from "./pages/admin/OrderList.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import OrderDetails from "./pages/admin/OrderDetails.tsx";
import AddProduct from "./pages/admin/AddProduct.tsx";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="listProduct" element={<AllProduct />} />
        <Route path="orderList" element={<OrderList />} />
        <Route path="orderList/:orderId" element={<OrderDetails />} />
        <Route path="addProduct" element={<AddProduct />} />
      </Route>
    </Routes>
  );
};

export default App;
