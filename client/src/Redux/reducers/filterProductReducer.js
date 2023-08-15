import { filterProductsConstant } from "../constants/actionTypes";

const initialstate = {
  loading: false,
  data: [],
};

export const getFilterProductReducer = (
  state = initialstate,
  { type, payload }
) => {
  switch (type) {
    case filterProductsConstant.getFilterProductrequest: {
      state = {
        ...state,
        loading: true,
      };
      break;
    }
    case filterProductsConstant.getFilterProductSuccess: {
      state = {
        ...state,
        loading: false,
        data: payload.data,
      };
      break;
    }
    case filterProductsConstant.getFilterProductfailure: {
      state = {
        ...state,
        loading: false,
      };
    }
  }
  return state;
};
