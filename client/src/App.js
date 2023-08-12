import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PolicyPage from './pages/PolicyPage';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRouter from './components/routes/Private';
import ForgetPassword from './pages/Auth/ForgetPassword';
import AdminRoute from './components/routes/AdminPrivateRoutes';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import AllUsers from './pages/Admin/AllUsers';
import Profile from './pages/user/Profile';
import Order from './pages/user/Order';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
function App() {
  return (
    < >
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:slug' element={<ProductDetail />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/register' element={<Register />} />
        {/* //nested route */}
          <Route path='/dashboard' element={<PrivateRouter />} >
            <Route path='user' element={<Dashboard />} />
            <Route path='user/profile' element={<Profile />} />
            <Route path='user/orders' element={<Order />} />
          </Route>
        {/* //////////////////// */}
         {/* //nested route  for admin dashboard*/}
         <Route path='/dashboard' element={<AdminRoute />} >
            <Route path='admin' element={<AdminDashboard />} />
            <Route path='admin/create-category' element={<CreateCategory />} />
            <Route path='admin/create-product' element={<CreateProduct />} />
            <Route path='admin/update-product/:slug' element={<UpdateProduct />} />
            <Route path='admin/products' element={<Products />} />
            <Route path='admin/create-users' element={<AllUsers/>} />
          </Route>
        {/* //////////////////// */}
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search/>}/>
        <Route path='/about' element={<About />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<PolicyPage />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
