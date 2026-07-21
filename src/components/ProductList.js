import React from "react";
import ProductCard from "./ProductCard";

const products = [
  { id: 1, name: "Black Chino Pants", price: 1500 },
  { id: 2, name: "Blue Denim Jeans", price: 2000 },
  { id: 3, name: "White Casual Shirt", price: 1200 },
  { id: 4, name: "Running Shoes", price: 3000 },
];

const ProductList = () => {
  return (
    <>
      {products.map((product) => (
        <div key={product.id} className="col-md-3">
          <ProductCard product={product} />
        </div>
      ))}
    </>
  );
};

export default ProductList;

