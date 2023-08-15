import { filterProductsConstant } from "../constants/actionTypes";
import axios from "axios";
export const filterProducts = (cat) => {
  return async (disptach) => {
    disptach({ type: filterProductsConstant.getFilterProductrequest });
    await axios
      .get(`https://fakestoreapi.com/products`)
      .then((res) => {
        if (res.status === 200) {
          let data = res.data;
          if (cat) {
            if (cat === "All") {
              data = res.data;
            } else {
              data = data.filter((item) => {
                return item.category === cat;
              });
            }
          }

          disptach({
            type: filterProductsConstant.getFilterProductSuccess,
            payload: {
              data,
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
