import React from 'react';
import { Link } from 'react-router-dom';
import 'tachyons';
/**
 * @author Ting-chun Pan
 * @refernce https://tachyons.io/components/forms/sign-in/index.html
 * @refernce https://github.com/basir/amazona/blob/master/frontend/src/components/Product.js
 * @param {*} props 
 * @returns 
 */

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="product-card">
      <Link to={`/product/${product._id}`}>
        <img className="middle" src={product.image} alt={product.name} />
      </Link>
      <div className="product-card body">
        <Link to={`/product/${product._id}`}>
          <h4>{product.name}</h4>
        </Link>

        <div className="brand">Brand: {product.brand}</div>
        <div className="price">Price: £{product.price}/day</div>
        <div className="deposit">Deposit: £{product.deposit}</div>
        <div className="surface">Surface: {product.surface}</div>
      </div>
    </div>



  );
}
