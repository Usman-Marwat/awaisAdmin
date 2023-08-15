import { toast } from "react-toastify";
import {
    SAVE_PAYMENT_DETAILS,
    SAVE_SHIPPING_ADDRESS,
} from "../constants/checkoutConstants";

export const shippingDetailsReducer = (
    state = { shippingDetails: {}, paymentDetails: {} },
    { type, payload }
) => {
    switch (type) {
        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingDetails: payload,
            };
        case SAVE_PAYMENT_DETAILS:
            return {
                ...state,
                paymentDetails: payload,
            };
        default:
            return state;
    }
};

// export const paymentDetailsReducer = (
//     state = { paymentDetails: {} },
//     { type, payload }
// ) => {
//     switch (type) {

//         case SAVE_PAYMENT_DETAILS:
//             return {
//                 ...state,
//                 paymentDetails: payload,
//             };

//         default:
//             return state;
//     }
// };
