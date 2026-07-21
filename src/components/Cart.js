import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../features/cart/cartSlice";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (cartItems.length === 0) return null;

  return (
    <div className="mt-4">
      <h4>Cart</h4>
      <div className="row">
        {cartItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-3">
            <div className="custom-card card">
              <div className="card-body">
                <h4>{item.name}</h4>
                <p>Qty: {item.qty}</p>

                {/* input group for +/- quantity: .input-group-append > .btn */}
                <div className="input-group mt-2">
                  <div className="input-group-append">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => dispatch(decreaseQty(item.id))}
                    >
                      -
                    </button>
                  </div>
                  <div className="input-group-append ml-2">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => dispatch(increaseQty(item.id))}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="btn btn-danger btn-sm mt-2"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
