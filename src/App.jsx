import { Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Category from "./pages/categorys/Category";
import CreateCategory from "./pages/categorys/create-category/CreateCategory";
import UpdateCategory from './pages/categorys/update-category/UpdateCategory';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Order from "./pages/order/order";
import OrderDetail from "./pages/orderDetail/OrderDetail";
import Products from "./pages/products/Products";
import CreateProduct from "./pages/products/create-product/CreateProduct";
import UpdateProduct from "./pages/products/update-product/UpdateProduct";
import Register from "./pages/register/Register";
import Statistical from "./pages/statistical/statistical";
import User from "./pages/users/User";
import CreateUser from "./pages/users/create-user/createUser";
import UpdateUser from "./pages/users/update-user/updateUser";

function App() {
  return (
    <main className="flex items-start w-full gap-10">
      <Sidebar />
      <div className="wrapper__content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/category" element={<Category />} />
          <Route path="/user" element={<User />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/user/update/:id" element={<UpdateUser />} />
          <Route path="/product/update/:id" element={<UpdateProduct />} />
          <Route path="/statistical" element={<Statistical />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/:id" element={<OrderDetail />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
