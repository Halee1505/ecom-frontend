import { Product } from "@/model/product";
import { formatNumberWithCommas } from "@/utils/formatMoney";
import Link from "next/link";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Link className="product-item" href={`/san-pham/${product.slug}`} title={product.name}>
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>Đã bán: {product.sold}</p>

        <div>
          <p className="price">{formatNumberWithCommas(product.price)}đ</p>
          <del>{formatNumberWithCommas(product.price * 1.2)} đ</del>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
