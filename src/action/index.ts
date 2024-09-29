import axios from "axios";
import { GET_CATEGORY_FAIL, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "../constants"
import { Category } from "../types";


export const getCategory = () => async (dispatch: any) => {
    try {
        dispatch({ type: GET_CATEGORY_REQUEST });

        const response = await axios.get<{ category: Category[] }>('https://dummyjson.com/products/category-list');
        const data = response.data;
        dispatch({
            type: GET_CATEGORY_SUCCESS,
            payload: data
        });
    } catch (error: any) {
        dispatch({
            type: GET_CATEGORY_FAIL,
            payload: error?.response?.data || "Failed to fetch category!"
        })
    }
}

export const getProducts = (params: { query?: string; category?: string; page: number; limit: number }) => async (dispatch: any) => {
    try {
        dispatch({ type: GET_PRODUCT_REQUEST });

        let url = 'https://dummyjson.com/products';
        const { query, category, page, limit } = params;

        if (query) {
            url += `/search?q=${query}`;
        }

        else if (category) {
            url += `/category/${category}`;
        }

        if (!query) {
            const skip = (page - 1) * limit;
            url += `?limit=${limit}&skip=${skip}`;
        } // Because search api does not support this limit and skip

        const response = await axios.get<{ products: any[] }>(url);
        const data = response.data;

        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: data.products,
        });
    } catch (error: any) {
        dispatch({
            type: GET_PRODUCT_FAIL,
            payload: error?.response?.data?.message || 'Failed to fetch products!',
        });
    };
};


