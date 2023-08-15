import { combineReducers } from "redux";
import { getFilterProductReducer } from "./filterProductReducer";
import { cartReducer } from "./cartReducer";
import {
  allProductsReducer,
  newProductReducer,
  productCreateReviewReducer,
  productReducer,
  singleProductReducer,
} from "./productReducers";
import {
  forgotPasswordReducer,
  profileReducer,
  userLoginReducer,
  userReducer,
  userRegisterReducer,
  userUpdateReducer,
  vendorReducer,
} from "./userReducers";
import { shippingDetailsReducer } from "./checkoutReducer";
import {
  allOrdersReducer,
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./orderReducers";
import {
  VendorCategoryListReducer,
  categoryListReducer,
} from "./categoryReducers";
const RootReducer = combineReducers({
  Products: allProductsReducer,
  ProductDetails: singleProductReducer,

  Cart: cartReducer,
  Checkout: shippingDetailsReducer,
  user: userReducer,
  vendor: vendorReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  OrderCreate: orderCreateReducer,
  OrderDetails: orderDetailsReducer,
  OrderPay: orderPayReducer,
  Orders: allOrdersReducer,
  filterData: getFilterProductReducer,
  Categories: categoryListReducer,
  VendorCategories: VendorCategoryListReducer,
  NewProduct: newProductReducer,
});

export default RootReducer;
