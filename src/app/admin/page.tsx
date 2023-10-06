"use client";

import AdminCategory from "@/components/admin/category";
import AdminProduct from "@/components/admin/product";
import ProductList from "@/components/admin/productsList";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const AdminPage = () => {
  const router = useRouter();
  const content = useSearchParams().get("content") || "category";
  return (
    <div className="admin">
      <h1>Quản lý trang web</h1>
      <div className="admin-menu">
        <button
          onClick={() => {
            router.push("/admin?content=category");
          }}
          className={content === "category" ? "active" : ""}
        >
          Danh mục
        </button>
        <button
          onClick={() => {
            router.push("/admin?content=products");
          }}
          className={content === "products" ? "active" : ""}
        >
          Sản phẩm
        </button>
        <button
          onClick={() => {
            router.push("/admin?content=new-product");
          }}
          className={content === "new-product" ? "active" : ""}
        >
          Thêm mới
        </button>
      </div>
      {content === "category" && <AdminCategory />}
      {content === "products" && <ProductList />}
      {content === "new-product" && <AdminProduct />}
    </div>
  );
};

export default AdminPage;
