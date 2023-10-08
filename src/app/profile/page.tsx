"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export interface Profile {
  createdAt: string;
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  password: string;
  address: string;
  phone: string;
  role: string;
  updatedAt: string;
  _id: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile>({
    createdAt: "",
    email: "",
    firstName: "",
    isActive: false,
    lastName: "",
    password: "",
    address: "",
    phone: "",
    role: "",
    updatedAt: "",
    _id: "",
  });
  const [curProfile, setCurProfile] = useState<Profile>({
    createdAt: "",
    email: "",
    firstName: "",
    isActive: false,
    lastName: "",
    password: "",
    address: "",
    phone: "",
    role: "",
    updatedAt: "",
    _id: "",
  });
  const pathName = usePathname();
  useEffect(() => {
    const profile = localStorage.getItem("PROFILE");
    if (profile) {
      setProfile({
        createdAt: "",
        email: "",
        firstName: "",
        isActive: false,
        lastName: "",
        password: "",
        address: "",
        phone: "",
        role: "",
        updatedAt: "",
        _id: "",
        ...JSON.parse(profile),
      });
      setCurProfile({
        createdAt: "",
        email: "",
        firstName: "",
        isActive: false,
        lastName: "",
        password: "",
        address: "",
        phone: "",
        role: "",
        updatedAt: "",
        _id: "",
        ...JSON.parse(profile),
      });
    } else {
      window.location.href = "/dang-nhap";
    }
  }, [pathName]);
  return (
    <div className="profile">
      <div className="profile-content">
        <table>
          <tbody>
            <tr>
              <td>Họ</td>
              <td>
                <input
                  type="text"
                  value={profile?.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>Tên</td>
              <td>
                <input
                  type="text"
                  value={profile?.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input
                  type="text"
                  value={profile?.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>Số điện thoại</td>
              <td>
                <input
                  type="text"
                  value={profile?.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </td>
            </tr>
            <tr>
              <td>Địa chỉ</td>
              <td>
                <input
                  type="text"
                  value={profile?.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn-group">
          <button
            onClick={() => {
              localStorage.removeItem("PROFILE");
              window.location.href = "/dang-nhap";
            }}
          >
            Đăng xuất
          </button>
          {Object.keys(profile).some(
            (key: string) =>
              (profile as unknown as Record<string, unknown>)[key as keyof typeof profile] !==
              (curProfile as unknown as Record<string, unknown>)[key as keyof typeof curProfile]
          ) && (
            <button
              className="primary"
              onClick={() => {
                fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/users/${profile._id}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(profile),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.message) {
                      alert("Cập nhật thất bại");
                      return;
                    }
                    localStorage.setItem("PROFILE", JSON.stringify(profile));
                    alert("Cập nhật thành công");
                    window.location.reload();
                  })
                  .catch((err) => {
                    console.error(err);
                    alert("Cập nhật thất bại");
                  });
              }}
            >
              Cập nhật
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
