import { toast } from "react-toastify";
import { CART_ADD_ITEM, CART_CLEAR_ITEMS, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM:
      // chk if product already exist in cart
      const exist = state.cartItems.find((x) => x.product == payload.product);
      console.log(exist);
      if (exist) {
        toast.warning("Item is already in your Cart!");
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product == exist.product ? payload : x
          ),
        };
      } else {
        toast.success("Item added to your Cart");
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }
      break;

    case CART_REMOVE_ITEM:
      toast.success("Item removed");
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== payload),
      };
    case CART_CLEAR_ITEMS:
      toast.success("Item cleared");
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
