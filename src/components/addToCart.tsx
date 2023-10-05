"use client";
import { Product } from "@/model/product";
import { useState } from "react";

const AddToCart = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <div>
      <div className="button-box">
        <div>
          <button
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => {
              if (quantity < product.inventory) {
                setQuantity(quantity + 1);
              }
            }}
          >
            +
          </button>
        </div>
        <span>Tồn kho: {product.inventory}</span>
      </div>
      <div className="cart">
        <button>Thêm vào giỏ hàng</button>
        <button>Mua ngay</button>
      </div>
    </div>
  );
};

export default AddToCart;
