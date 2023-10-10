"use client";

import { useCallback, useEffect, useState } from "react";
import AddToCart from "./addToCart";
import { Cart } from "@/model/product";
import { formatNumberWithCommas } from "@/utils/formatMoney";
import DeleteButton from "./deleteBtn";
import { Profile } from "@/app/profile/page";
import { usePathname } from "next/navigation";
import { debounce } from "@/utils/func";

const CartItem = ({ cart, onChange }: { cart: Cart; onChange: () => void }) => {
  const [quantity, setQuantity] = useState(cart.quantity);
  const [profile, setProfile] = useState<Profile | null>(null);
  const pathName = usePathname();
  useEffect(() => {
    const profile = localStorage.getItem("PROFILE");
    if (profile) {
      setProfile(JSON.parse(profile));
    }
  }, [pathName]);
  const [ready, setReady] = useState(false);
  const addToCart = async (quantity: number, cart: Cart, profile: Profile | null) => {
    if (!profile) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/add-to-cart/${profile._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: cart.product,
        quantity,

        addMore: false,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          alert("Thêm vào giỏ hàng thất bại");
          return;
        }
        onChange();
      })
      .catch((err) => {
        console.error(err);
        alert("Thêm vào giỏ hàng thất bại");
      });
  };

  useEffect(() => {
    if (!ready) {
      setReady(true);
      return;
    }
    handleAddToCart(quantity, cart, profile);
  }, [quantity]);

  const handleAddToCart = useCallback(
    debounce((quantity: number, cart: Cart, profile: Profile | null) => {
      addToCart(quantity, cart, profile);
    }, 500),
    []
  );

  return (
    <div className="cart-item">
      <img src={cart.product.image.split(",")[0]} alt="" />
      <div>
        <h3>
          <a href={`/san-pham/${cart.product.slug}`}>{cart.product.name}</a>
        </h3>
        <p>{formatNumberWithCommas(cart.product.price)}đ</p>
        {cart.classify && <p>Phân loại: {cart.classify}</p>}
        <div>
          <div className="button-box">
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();

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
                  setQuantity(quantity + 1);
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteButton
        propsText="Xóa sản phẩm khỏi giỏ hàng?"
        denyText="Huỷ"
        confirmText="Đồng ý"
        onConfirm={() => {
          if (!profile) {
            alert("Vui lòng đăng nhập để xóa sản phẩm khỏi giỏ hàng");
            return;
          }
          fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/remove-from-cart/${profile._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product: cart.product,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.message) {
                alert("Xóa sản phẩm khỏi giỏ hàng thất bại");
                return;
              }
              onChange();
            })
            .catch((err) => {
              console.error(err);
              alert("Xóa sản phẩm khỏi giỏ hàng thất bại");
            });
        }}
      />
    </div>
  );
};

export default CartItem;
