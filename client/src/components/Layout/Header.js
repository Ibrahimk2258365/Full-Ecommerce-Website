import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdShoppingBasket } from "react-icons/md";
import { useAuth } from "../Context/Auth";
import { toast } from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "./../../Hooks/useCategory";
import { useCart } from "../Context/Cart";

const Header = () => {
  const [logout, setlogout] = useState(false);
  const [auth, setAuth] = useAuth();
  const categoryHook = useCategory();
  const [cart] = useCart()
  const logouthandler = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout SuccessFully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            <MdShoppingBasket /> Shopping Store
          </Link>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button> */}
          {/* <SearchInput /> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link" aria-current="page">
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  to={"/categories"}
                >
                  Categories
                </Link>

                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to={`/categories`}>
                      All Category
                    </Link>
                  </li>
                  {categoryHook?.map((c) => (
                    <li>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link ">
                      Sign up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link fa fa-sign-in">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"
                            }`}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <Link
                          to={"/login"}
                          onClick={logouthandler}
                          className="nav-link"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item m-2">
                
                <Link to={"/cart"} type="button"  className="fa fa-shopping-cart position-relative ">
                 
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                   {cart.length}
                  
                  </span>
                </Link>
               

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
