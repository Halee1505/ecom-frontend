"use client";

import CartItem from "@/components/cartItem";
import { useEffect, useState } from "react";
import { Profile } from "../profile/page";
import { usePathname } from "next/navigation";
import { Cart } from "@/model/product";
import { formatNumberWithCommas } from "@/utils/formatMoney";

const Cart = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cart, setCart] = useState<Cart[]>([]); // [Product
  const pathName = usePathname();
  const [change, setChange] = useState(false);
  useEffect(() => {
    const profile = localStorage.getItem("PROFILE");
    if (profile) {
      setProfile(JSON.parse(profile));
    }
  }, [pathName]);

  useEffect(() => {
    const getCart = async () => {
      if (!profile) {
        return;
      }

      await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/cart/${profile._id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            alert("Lấy giỏ hàng thất bại");
            return;
          }
          setCart(res.products);
        })
        .catch((err) => {
          console.error(err);
          alert("Lấy giỏ hàng thất bại");
        });
    };
    getCart();
  }, [profile, change]);
  return (
    <div>
      <div className="cart-content">
        <div className="cart-items">
          <h1>Giỏ hàng</h1>

          {cart.map((item) => (
            <CartItem
              key={item.product._id}
              cart={item}
              onChange={() => {
                setChange(!change);
              }}
            />
          ))}
          <textarea placeholder="Ghi chú"></textarea>
        </div>
        <div className="cart-total">
          <strong>
            Tổng đơn hàng:{" "}
            {formatNumberWithCommas(cart.reduce((total, item) => total + item.product.price * item.quantity, 0))}đ
          </strong>
          <button>Thanh toán</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
