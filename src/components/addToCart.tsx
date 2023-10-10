"use client";
import { Profile } from "@/app/profile/page";
import { Product } from "@/model/product";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const AddToCart = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [classify, setClassify] = useState<string | null>(null);
  const pathName = usePathname();
  useEffect(() => {
    const profile = localStorage.getItem("PROFILE");
    if (profile) {
      setProfile(JSON.parse(profile));
    }
  }, [pathName]);

  const addToCart = async () => {
    if (!profile) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
      return;
    }
    if (product.classify?.split(",").length > 1 && !classify) {
      alert("Vui lòng chọn phân loại sản phẩm");
      return;
    }

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/add-to-cart/${profile._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product,
        quantity,
        classify,
        addMore: true,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          alert("Thêm vào giỏ hàng thất bại");
          return;
        }
        alert("Thêm vào giỏ hàng thành công");
      })
      .catch((err) => {
        console.error(err);
        alert("Thêm vào giỏ hàng thất bại");
      });
  };

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
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
      {product.classify?.split(",").length > 1 && (
        <div className="classify">
          <strong>Phân loại </strong>
          <div>
            {product.classify?.split(",").map((cls) => (
              <button
                key={cls}
                className={cls === classify ? "selected" : ""}
                onClick={() => {
                  setClassify(cls);
                }}
              >
                <label>{cls}</label>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="cart">
        <button
          onClick={() => {
            addToCart();
          }}
        >
          Thêm vào giỏ hàng
        </button>
        <button
          onClick={() => {
            addToCart().then(() => {
              window.location.href = "/gio-hang";
            });
          }}
        >
          Mua ngay
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
