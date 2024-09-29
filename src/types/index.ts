
export interface Action {
    type: string;
    payload?: any;
}

export interface CategoryState {
    loading?: boolean;
    category: string[];
    error?: string | null;
}

export interface Category {
    id: number;
    name: string;
}

export interface ProductState {
    loading?: boolean;
    products: string[];
    error?: string | null;
}

export interface ProductDes {
    title: string,
    price: number,
    images: string[],
    category: string,
    brand: string
}