import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";

import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import Login from './components/User/Login';
import Register from './components/User/Register';
import ProtectedRoute from "./routing/ProtectedRoute";
import "./App.css";
import Category from "./components/Category/Category";
import VendorRegister from "./components/User/VendorRegister";
import Dashboard from "./components/Admin/Dashboard";
import MainData from "./components/Admin/MainData.jsx";
import OrderTable from "./components/Admin/OrderTable.jsx";
import UpdateOrder from "./components/Admin/UpdateOrder.jsx";
import ProductTable from "./components/Admin/ProductTable.jsx";
import NewProduct from "./components/Admin/NewProduct.jsx";
import UpdateProduct from "./components/Admin/UpdateProduct.jsx";
import UserTable from "./components/Admin/UserTable.jsx";
import UpdateUser from "./components/Admin/UpdateUser.jsx";
import ReviewsTable from "./components/Admin/ReviewsTable.jsx";
import ProductDetail from './components/ProductDetail/ProductDetail'
import ProductDetailMain from "./components/ProductDetail/ProductDetailMain";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";

function App() {
  return (
    <div>


      <main className="container content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vendor/register" element={<VendorRegister />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/vendor/dashboard" element={

            <Dashboard activeTab={0}>
              <MainData />
            </Dashboard>

          } ></Route>

          <Route path="/admin/orders" element={

            <Dashboard activeTab={1}>
              <OrderTable />
            </Dashboard>

          } ></Route>

          <Route path="/admin/order/:id" element={

            <Dashboard activeTab={1}>
              <UpdateOrder />
            </Dashboard>

          } ></Route>

          <Route path="/vendor/products" element={

            <Dashboard activeTab={2}>
              <ProductTable />
            </Dashboard>


          } ></Route>

          <Route path="/vendor/new_product" element={

            <Dashboard activeTab={3}>
              <NewProduct />
            </Dashboard>

          } ></Route>

          <Route path="/admin/product/:id" element={


            <Dashboard activeTab={2}>
              <UpdateProduct />
            </Dashboard>


          } ></Route>

          <Route path="/admin/users" element={


            <Dashboard activeTab={4}>
              <UserTable />
            </Dashboard>


          } ></Route>

          <Route path="/admin/user/:id" element={

            <Dashboard activeTab={4}>
              <UpdateUser />
            </Dashboard>

          } ></Route>

          <Route path="/admin/reviews" element={

            <Dashboard activeTab={5}>
              <ReviewsTable />
            </Dashboard>

          } ></Route>
          <Route path="/detail/:id" element={<ProductDetailMain />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/products" element={<Category />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user-profile" element={<ProfileScreen />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
