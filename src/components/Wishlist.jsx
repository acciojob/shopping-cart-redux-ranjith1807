// src/components/Wishlist.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/actions";

function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="wishlist-grid">
      {wishlist.map((p) => (
        <div className="custom-card card" key={p.id}>
          {/* h3 must be a direct child of custom-card */}
          <h3>{p.name}</h3>
          <div className="card-body">
            <p>₹{p.price}</p>

            {/* SINGLE .btn */}
            <button
              className="btn"
              onClick={() => dispatch(removeFromWishlist(p.id))}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Wishlist;