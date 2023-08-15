// categoryReducers.js

import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    VENDOR_CATEGORY_REQUEST,
    VENDOR_CATEGORY_SUCCESS,
    VENDOR_CATEGORY_FAIL,
} from "../constants/categoryConstants";

export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return { loading: true, categories: [] };
        case CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload };
        case CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export const VendorCategoryListReducer = (
    state = { categories: [] },
    action
) => {
    switch (action.type) {
        case VENDOR_CATEGORY_REQUEST:
            return { loading: true, categories: [] };
        case VENDOR_CATEGORY_SUCCESS:
            return { loading: false, categories: action.payload };
        case VENDOR_CATEGORY_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Other reducers such as categoryDetailsReducer, createCategoryReducer, updateCategoryReducer, deleteCategoryReducer, createSubcategoryReducer, deleteSubcategoryReducer, categoryWithSubcategoriesReducer can be implemented following a similar pattern.

// ...
