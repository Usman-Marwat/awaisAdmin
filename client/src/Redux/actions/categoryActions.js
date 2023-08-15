// categoryActions.js

import axios from 'axios';
import axiosa from '../../api/axiosa';
import {
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_DETAILS_REQUEST,
    CATEGORY_DETAILS_SUCCESS,
    CATEGORY_DETAILS_FAIL,
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,
    CREATE_SUBCATEGORY_REQUEST,
    CREATE_SUBCATEGORY_SUCCESS,
    CREATE_SUBCATEGORY_FAIL,
    DELETE_SUBCATEGORY_REQUEST,
    DELETE_SUBCATEGORY_SUCCESS,
    DELETE_SUBCATEGORY_FAIL,
    CATEGORY_WITH_SUBCATEGORIES_REQUEST,
    CATEGORY_WITH_SUBCATEGORIES_SUCCESS,
    CATEGORY_WITH_SUBCATEGORIES_FAIL,
    VENDOR_CATEGORY_REQUEST,
    VENDOR_CATEGORY_SUCCESS,
    VENDOR_CATEGORY_FAIL,
} from '../constants/categoryConstants';

export const listCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_LIST_REQUEST });

        const { data } = await axiosa.get('/api/v1/categories-with-subcategories');

        dispatch({
            type: CATEGORY_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.message,
        });
    }
};
export const vendorCategories = () => async (dispatch) => {
    try {
        dispatch({ type: VENDOR_CATEGORY_REQUEST });

        const { data } = await axiosa.get('/api/v1/categories');

        dispatch({
            type: VENDOR_CATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: VENDOR_CATEGORY_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.message,
        });
    }
};

export const getCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_DETAILS_REQUEST });

        const { data } = await axiosa.get(`/api/categories/${id}`);

        dispatch({
            type: CATEGORY_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.message,
        });
    }
};

export const createCategory = (name, parentCategory) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CATEGORY_REQUEST });

        const { data } = await axiosa.post('/api/categories', { name, parentCategory });

        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_CATEGORY_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.message,
        });
    }
};

// Other actions such as updateCategory, deleteCategory, createSubcategory, deleteSubcategory, getCategoryWithSubcategories can be implemented following a similar pattern.

// ...

