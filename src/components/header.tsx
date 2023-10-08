"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [profile, setProfile] = useState(null);
  const pathName = usePathname();
  useEffect(() => {
    const profile = localStorage.getItem("PROFILE");
    if (profile) {
      setProfile(JSON.parse(profile));
    }
  }, [pathName]);

  return (
    <header className="header">
      <h1>{process.env.NEXT_PUBLIC_BRAND_NAME}</h1>
      <div className="user">
        <a href="/gio-hang" className="cart">
          <svg
            className="cart-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3.864 16.4552C4.40967 18.6379 4.68251 19.7292 5.49629 20.3646C6.31008 21 7.435 21 9.68486 21H14.3155C16.5654 21 17.6903 21 18.5041 20.3646C19.3179 19.7292 19.5907 18.6379 20.1364 16.4552C20.9943 13.0234 21.4233 11.3075 20.5225 10.1538C19.6217 9 17.853 9 14.3155 9H9.68486C6.14745 9 4.37875 9 3.47791 10.1538C2.94912 10.831 2.87855 11.702 3.08398 13"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M19.5 9.5L18.7896 6.89465C18.5157 5.89005 18.3787 5.38775 18.0978 5.00946C17.818 4.63273 17.4378 4.34234 17.0008 4.17152C16.5619 4 16.0413 4 15 4M4.5 9.5L5.2104 6.89465C5.48432 5.89005 5.62128 5.38775 5.90221 5.00946C6.18199 4.63273 6.56216 4.34234 6.99922 4.17152C7.43808 4 7.95872 4 9 4"
              stroke="#1C274C"
              strokeWidth="1.5"
            />
            <path
              d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4C15 4.55228 14.5523 5 14 5H10C9.44772 5 9 4.55228 9 4Z"
              stroke="#1C274C"
              strokeWidth="1.5"
            />
          </svg>

          <div className="cart-count"></div>
        </a>
        <a href={profile ? "/profile" : "/dang-nhap"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
            version="1.1"
            id="Layer_1"
            width="800px"
            height="800px"
            viewBox="796 796 200 200"
            enableBackground="new 796 796 200 200"
            xmlSpace="preserve"
          >
            <g>
              <path d="M896.003,827.425c-20.538,0-37.187,19.66-37.187,43.921c0,24.258,16.648,43.924,37.187,43.924s37.188-19.667,37.188-43.924   C933.191,847.085,916.541,827.425,896.003,827.425z" />
              <path d="M896,796c-55.141,0-100,44.859-100,99.999C796.001,951.14,840.86,996,896,996c55.139,0,99.999-44.86,99.999-100.001   C995.999,840.859,951.14,796,896,796z M962.014,953.885c-0.029-0.111-0.044-0.223-0.075-0.333   c-4.735-16.523-15.472-30.494-29.687-39.455c-2.805-1.768-6.442-1.48-8.931,0.71c-7.63,6.719-17.069,10.72-27.319,10.72   c-10.45,0-20.061-4.156-27.767-11.113c-2.46-2.222-6.082-2.556-8.91-0.829c-14.407,8.797-25.353,22.689-30.299,39.192   c-13.012-15.325-20.887-35.145-20.887-56.777c0-48.446,39.414-87.86,87.86-87.86c48.445,0,87.859,39.414,87.859,87.86   C983.859,918.159,975.597,938.412,962.014,953.885z" />
            </g>
          </svg>
        </a>
      </div>
    </header>
  );
};
export default Header;
