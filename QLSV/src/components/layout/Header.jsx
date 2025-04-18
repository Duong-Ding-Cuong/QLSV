import React, { useContext } from "react";
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Logo from "./Logo";
import "./Header.css"; // Import the CSS file for custom styles

const Header = () => {
  const navigate = useNavigate();
  const { student } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg custom-header px-4">
      <div className="container-fluid">
        {/* Logo Section */}
        <div className="d-flex align-items-center">
          <Logo />
        </div>

        {/* User Section */}
        <div className="d-flex justify-content-end align-items-center flex-grow-1">
          {student ? (
            <div className="fw-bold text-white text-end">
              <Link to="/student" className="text-decoration-none nav-link">
                {student.name}
              </Link>
            </div>
          ) : (
            <Button
              type="primary"
              onClick={() => navigate("/login")}
              className="ms-3"
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;