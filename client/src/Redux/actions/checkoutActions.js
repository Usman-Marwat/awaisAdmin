import { SAVE_PAYMENT_DETAILS, SAVE_SHIPPING_ADDRESS } from "../constants/checkoutConstants";

export const shippingInfo = (data) => (dispatch, getState) => {
    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: data,
    });
    localStorage.setItem("shippingDetails", JSON.stringify(data));
};
export const paymentInfo = (data) => (dispatch, getState) => {
    dispatch({
        type: SAVE_PAYMENT_DETAILS,
        payload: data,
    });
    localStorage.setItem("paymentDetails", JSON.stringify(data));
};
