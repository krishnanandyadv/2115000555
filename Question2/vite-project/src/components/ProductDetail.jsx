// import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products }) => {
    const { id } = useParams();
    const product = products[id];

    if (!product) return <p>Product not found</p>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Company: {product.company}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Discount: {product.discount}</p>
            <p>Availability: {product.availability}</p>
        </div>
    );
};

export default ProductDetail;
