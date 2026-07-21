import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { addToWishlist } from "../features/wishlist/wishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="custom-card card mb-3">
      <div className="card-body">
        <h4>{product.name}</h4>
        <p>₹{product.price}</p>

        <button
          className="btn btn-primary"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>

        <button
          className="btn btn-secondary ms-2"
          onClick={() => dispatch(addToWishlist(product))}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
