import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Scsss/Header.scss";
import { useGetDetailsQuery } from "../app/services/auth/authService";
import { logout, setCredentials } from "../features/auth/authSlice";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { GiArchiveRegister } from "react-icons/gi";

import { Link } from "react-router-dom";
import { logoutUser } from "../Redux/actions/userActions";
const Header = () => {
  const { loading, isAuthenticated, error, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch]);

  return (
    <header>
      <div className="header-parent">
        <div className="contact-parent"></div>
        <div className="pay">
          <img src="./images/3.png" alt="" />
        </div>
        <div className="search-parent">
          <div style={{ margin: "auto" }}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <h2>ASE SHOPPING</h2>
            </Link>
          </div>
          <div className="search-button" style={{ margin: "auto" }}>
            <input
              type="search"
              placeholder="search here brand, category, products"
            />
            <button>Search</button>
          </div>
          <nav className="container navigation">
            <div className="login">
              {isAuthenticated && (
                <div className="icon">
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <ul className="nav-links">
                      <li>
                        <Link to="" className="desktop-item">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px ",
                            }}
                          >
                            <span>
                              <AiOutlineUser />{" "}
                            </span>
                            <span>{user?.name}</span>
                          </div>
                        </Link>
                        <input
                          type="checkbox"
                          id="showDrop"
                          style={{ display: "none" }}
                        />
                        <label
                          htmlFor="showDrop"
                          className="mobile-item"
                        ></label>
                        <ul className="drop-menu">
                          <li style={{ margin: "0" }}>
                            <Link to="/account">Profile</Link>
                          </li>

                          {!user?.vendor ? (
                            <>
                              <li style={{ margin: "0" }}>
                                <Link to="/vendor/register">
                                  {" "}
                                  Become a Seller
                                </Link>
                              </li>
                            </>
                          ) : (
                            <>
                              <li style={{ margin: "0" }}>
                                <Link to="/vendor/dashboard">
                                  {" "}
                                  Seller
                                </Link>
                              </li>
                            </>
                          )}
                          <li
                            onClick={() => {
                              dispatch(logoutUser());
                              window.location.reload();
                            }}
                            style={{ margin: "0" }}
                          >
                            <Link to="">Logout</Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Link>
                </div>
              )}
              {!isAuthenticated && (
                <div className="icon">
                  <span>
                    <GiArchiveRegister />
                  </span>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {" "}
                    <span>Signup/Login</span>{" "}
                  </Link>
                </div>
              )}
              <div className="icon">
                <span>
                  <AiOutlineShoppingCart />
                </span>
                <Link
                  to="/cart"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <span>Cart</span>{" "}
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
