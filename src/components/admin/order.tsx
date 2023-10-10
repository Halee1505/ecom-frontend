import { Product } from "@/model/product";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductItem from "../productItem";
import Link from "next/link";
import { Order } from "@/model/category";
import { formatNumberWithCommas } from "@/utils/formatMoney";

const getListOrders = async (limit: number, offset: number) => {
  const orders: Order[] = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/orders?limit=${limit}&offset=${offset}`,
    {
      next: {
        revalidate: 0,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });

  return orders;
};

const getOrdersCount = async () => {
  const ordersCount: { count: number } = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/orders-count`, {
    next: {
      revalidate: 0,
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return { count: 0 };
    });

  return ordersCount;
};

const OrderList = () => {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [ordersCount, setOrdersCount] = useState<{ count: number }>({ count: 0 });
  const page = searchParams?.get("page") ? Number(searchParams.get("page")) : 1;
  const limit = 8;
  const offset = (page - 1) * limit;
  useEffect(() => {
    (async () => {
      const orders: Order[] = await getListOrders(limit, offset);
      const ordersCount: { count: number } = await getOrdersCount();
      setOrders(orders);
      setOrdersCount(ordersCount);
    })();
  }, [page, limit, offset]);

  return (
    <div className="admin-order">
      <div className="order-list-overlay">
        <div className="order-list">
          {orders.map((order) => (
            <div
              className="order"
              key={order._id}
              onClick={() => {
                setSelectedOrder(order);
              }}
              style={{
                boxShadow:
                  selectedOrder?._id === order._id
                    ? " 0px 0px 3px 3px rgba(255, 89, 0, 0.832)"
                    : " 0px 0px 6px 0px rgba(158, 158, 158, 0.75)",
              }}
            >
              <div className="order-items">
                {order.products.map((product) => (
                  <div className="order-item" key={product.product._id}>
                    <img src={product.product.image.split(",")[0]} alt="" />
                    <div>
                      <h3>{product.product.name}</h3>
                      {product.classify && <p>Phân loại: {product.classify}</p>}

                      <p>
                        {formatNumberWithCommas(product.product.price)}đ x {product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="price">Tổng tiền: {formatNumberWithCommas(order.total)} đ</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          {Array(Math.ceil(ordersCount.count / limit))
            .fill(0)
            .map((_, index) => (
              <Link
                href={index === 0 ? `/admin?content=products` : `/admin?content=products&page=${index + 1}`}
                key={index}
                className={index + 1 === page ? "active" : ""}
              >
                {index + 1}
              </Link>
            ))}
        </div>
      </div>
      {selectedOrder && (
        <div>
          <em>Đơn hàng: {selectedOrder._id}</em>
          <div className="selected-order">
            <div className="order-user">
              <p>
                Họ tên: {selectedOrder.user.firstName} {selectedOrder.user.lastName}
              </p>
              <p>Email: {selectedOrder.user.email}</p>
              <p>Số điện thoại: {selectedOrder.user.phone}</p>
              <p>Địa chỉ: {selectedOrder.user.address}</p>
            </div>
            <div className="note">
              <p>Ghi chú:</p>
              <p>{selectedOrder.note}</p>
            </div>
            <div
              onClick={() => {
                setSelectedOrder(null);
              }}
              className="back-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                width="800px"
                height="800px"
                viewBox="0 0 1024 1024"
              >
                <path d="M222.927 580.115l301.354 328.512c24.354 28.708 20.825 71.724-7.883 96.078s-71.724 20.825-96.078-7.883L19.576 559.963a67.846 67.846 0 01-13.784-20.022 68.03 68.03 0 01-5.977-29.488l.001-.063a68.343 68.343 0 017.265-29.134 68.28 68.28 0 011.384-2.6 67.59 67.59 0 0110.102-13.687L429.966 21.113c25.592-27.611 68.721-29.247 96.331-3.656s29.247 68.721 3.656 96.331L224.088 443.784h730.46c37.647 0 68.166 30.519 68.166 68.166s-30.519 68.166-68.166 68.166H222.927z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
