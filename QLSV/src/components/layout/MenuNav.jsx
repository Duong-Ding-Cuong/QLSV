import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuNav.css";

const MenuNav = () => {
  // Kiểm tra trạng thái đăng nhập bằng accessToken trong localStorage
  const isLoggedIn = !!localStorage.getItem("accessToken");

  // Lấy thông tin người dùng từ localStorage (giả sử dữ liệu người dùng được lưu dưới dạng JSON)
  const user = localStorage.getItem("student")
    ? JSON.parse(localStorage.getItem("student"))
    : null;

  // Kiểm tra xem người dùng có email cụ thể hay không
  const isSpecificUser = user?.email === "phamhang51123@gmail.com";

  return (
    <nav className="navbar navbar-expand navbar-light bg-white shadow-sm px-4">
      <div className="container-fluid">
        <div className="d-flex justify-content-center justify-content-lg-start flex-grow-1">
          <ul className="navbar-nav justify-content-between">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " fw-bold text-dark " : "")
                }
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item mx-5">
              <NavLink
                to="/forum"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " fw-bold text-dark " : "")
                }
              >
                Diễn đàn
              </NavLink>
            </li>
            {/* Chỉ hiển thị "Tài khoản" nếu đã đăng nhập */}
            {isLoggedIn && (
              <li className="nav-item me-4">
                <NavLink
                  to="/student"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " fw-bold text-dark " : "")
                  }
                >
                  Tài khoản
                </NavLink>
              </li>
            )}
            {/* Chỉ hiển thị "Quản lý" nếu là người dùng có email cụ thể */}
            {isLoggedIn && isSpecificUser && (
              <li className="nav-item">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    "nav-link" + (isActive ? " fw-bold text-dark " : "")
                  }
                >
                  Quản lý
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MenuNav;