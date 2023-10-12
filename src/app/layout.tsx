import { Category } from "@/model/category";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZENDA Shop",
  description: "Chuyên phân phối hàng công ty",
  manifest:
    "https://res.cloudinary.com/vitamim/image/upload/v1697094532/source/370283076_691847342881109_4494727967326519171_n_znytzb.jpg",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories: Category[] = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/categories?isActive=true`, {
    next: {
      revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE),
    },
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error(err);
      return [];
    });
  return (
    <html lang="vi">
      <body className={inter.className}>
        <header>
          <Header />
          <nav>
            <ul>
              <li key={0}>
                <a href={`/`} className="home">
                  TRANG CHỦ
                </a>
              </li>
              {categories?.length > 0 &&
                categories.map((category) => (
                  <li key={category._id} className="category-item">
                    <a href={`/danh-muc/${category.slug}`}>{category.name}</a>
                    {category?.child?.length > 0 && (
                      <div className="category-child">
                        {category.child?.map((child) => (
                          <a key={child._id} href={`/danh-muc/${child.slug}`}>
                            {child.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </nav>
        </header>
        {children}
        <footer>
          <div className="footer-center">
            <div className="box-footer-column">
              <h3 className="">Thông tin liên hệ:</h3>
              <ul className="footer-list-menu">
                <li className="footer-address"></li>
                <li className="fooer-phone">
                  <label className="mr5">Phone: </label>
                  <span>
                    <a href={`${process.env.NEXT_PUBLIC_HOTLINE}`}>{process.env.NEXT_PUBLIC_HOTLINE}</a>
                  </span>
                </li>
                <li className="footer-email">
                  <label className="mr5">Email: </label>
                  <span>{process.env.NEXT_PUBLIC_EMAIL}</span>
                </li>
              </ul>
            </div>

            <div className="box-footer-column">
              <h3 className="">Chính sách hỗ trợ:</h3>
              <ul className="footer-list-menu">
                <li>
                  <a href="/search" title="Tìm kiếm">
                    Tìm kiếm
                  </a>
                </li>

                <li>
                  <a href="/pages/about-us" title="Giới thiệu">
                    Giới thiệu
                  </a>
                </li>

                <li>
                  <a href="/pages/chinh-sach-doi-tra" title="Chính sách đổi trả">
                    Chính sách đổi trả
                  </a>
                </li>

                <li>
                  <a href="/pages/chinh-sach-bao-mat" title="Chính sách bảo mật">
                    Chính sách bảo mật
                  </a>
                </li>

                <li>
                  <a href="/pages/dieu-khoan-dich-vu" title="Điều khoản dịch vụ">
                    Điều khoản dịch vụ
                  </a>
                </li>
              </ul>
            </div>

            <div className="box-footer-column">
              <h3 className="">Thông tin liên kết:</h3>
              <div className="social">
                <ul className="footer-list-menu">
                  <li>Hãy kết nối với chúng tôi.</li>
                </ul>
              </div>
            </div>

            <div className="box-footer-column">
              <h3 className="">Theo dõi Fanpage chúng tôi để cập nhật xu hướng thời trang hot nhất:</h3>
              <div
                className="fb-page fb_iframe_widget"
                data-href="https://www.facebook.com/Vergency.vn"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
                fb-xfbml-state="rendered"
                fb-iframe-plugin-query="adapt_container_width=true&amp;app_id=&amp;container_width=263&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2FVergency.vn&amp;locale=vi_VN&amp;sdk=joey&amp;show_facepile=true&amp;small_header=false"
              ></div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>©Bản quyền thuộc về {process.env.NEXT_PUBLIC_BRAND_NAME}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
