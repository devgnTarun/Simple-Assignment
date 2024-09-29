import React from "react"
import { ProductDes } from "../types"
import { Link } from "react-router-dom";


type ProductCardProps = {
    product: ProductDes;
};


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (


        <div className=" max-w-sm bg-white border border-gray-200 rounded-lg shadow w-[47%]  ">
            <Link to="/">
                <img className="p-8 rounded-t-lg" src={product?.images[0]} alt="product image" />
            </Link>
            <div className="px-5 pb-5">
                <a href="#">
                    <h5 className="text-md font-semibold tracking-tight text-gray-900 ">{product.title}</h5>
                </a>
                <div className="my-2">
                    <span className="text-xl font-bold text-gray-900 ">${product.price}</span>
                </div>
                <button className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Add to cart</button>
            </div>
        </div>

    )
}

export default ProductCard