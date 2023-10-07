import { Product } from "@/model/product";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductItem from "../productItem";
import Link from "next/link";

const getListProducts = async (limit: number, offset: number) => {
  const products: Product[] = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/products?limit=${limit}&offset=${offset}`,
    {
      next: {
        revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });

  return products;
};

const getProductCount = async () => {
  const productsCount: { count: number } = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/products/count`, {
    next: {
      revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return { count: 0 };
    });

  return productsCount;
};

const ProductList = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsCount, setProductsCount] = useState<{ count: number }>({ count: 0 });
  const page = searchParams?.get("page") ? Number(searchParams.get("page")) : 1;
  const limit = 8;
  const offset = (page - 1) * limit;
  useEffect(() => {
    (async () => {
      const products: Product[] = await getListProducts(limit, offset);
      const productsCount: { count: number } = await getProductCount();
      setProducts(products);
      setProductsCount(productsCount);
    })();
  }, [page, limit, offset]);

  return (
    <div className="admin-products">
      <div className="product-list">
        {products?.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
      <div className="pagination">
        {Array(Math.ceil(productsCount.count / limit))
          .fill(0)
          .map((_, index) => (
            <a
              href={index === 0 ? `/admin?content=products` : `/admin?content=products&page=${index + 1}`}
              key={index}
              className={index + 1 === page ? "active" : ""}
            >
              {index + 1}
            </a>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
