import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="navbar-brand fw-bold text-success text-uppercase text-light"
    >
      Diễn Đàn Sinh Viên
    </Link>
  );
};

export default Logo;