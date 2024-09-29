// This reducer file is combination of both categoryReducer and productReducer - Handled together because there is no much things to do haha
import { CLEAR_ERROR, GET_CATEGORY_FAIL, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, GET_PRODUCT_FAIL, GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "../constants";
import { CategoryState, Action, ProductState } from "../types";

const initialState: CategoryState = {
    category: [],
    loading: false,
    error: null
};

const productInitials: ProductState = {
    products: [],
    loading: false,
    error: null
}
// Category Reducer
export const categoryReducer = (state = initialState, action: Action): CategoryState => {
    switch (action.type) {
        case GET_CATEGORY_REQUEST:
            return {
                ...state,
                loading: true,
                category: []
            }
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                category: action.payload
            }
        case GET_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
// Product Reducer
export const productReducer = (state = productInitials, action: Action): ProductState => {
    switch (action.type) {
        case GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                products: []
            }
        case GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}