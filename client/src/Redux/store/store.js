import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import Thunk from "redux-thunk";
import RootReducer from "../reducers/index";
const cartItemsFromLC = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromLC = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const checkoutInfoFromLC = localStorage.getItem("shippingDetails")
  ? JSON.parse(localStorage.getItem("shippingDetails"))
  : null;
const paymentDetailsFromLC = localStorage.getItem("paymentDetails")
  ? JSON.parse(localStorage.getItem("paymentDetails"))
  : null;
const initialState = {
  Cart: {
    cartItems: cartItemsFromLC,
  },
  UserLogin: {
    userInfo: userInfoFromLC,
  },
  Checkout: {
    shippingDetails: checkoutInfoFromLC,
    paymentDetails: paymentDetailsFromLC,
  },
};
const Store = createStore(
  RootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(Thunk))
);

export default Store;
