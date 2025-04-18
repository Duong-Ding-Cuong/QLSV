import React, { useContext, useState } from "react";
import { Avatar, Switch, Modal, Button, message } from "antd";
import { UserOutlined, SettingOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentAccount = () => {
  const { student, logout } = useContext(AuthContext);
  const [notification, setNotification] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    message.success("Đăng xuất thành công!");
    navigate("/");
  };
  
  return (
    <div className="bg-white border p-3 mt-4 shadow-sm h-50" style={{ width: "250px", minHeight: "100%" }}>
      <div className="text-center mb-3">
        <Avatar size={64} icon={<UserOutlined />} />
        <h6 className="mt-2 mb-0">{student?.name || "Guest"}</h6>
        <small className="text-muted">{student?.email || "No Email"}</small>
      </div>
      <hr />
      <div className="d-flex flex-column gap-3">
        <button className="btn btn-outline-primary d-flex align-items-center gap-2" onClick={() => setIsProfileOpen(true)}>
          <UserOutlined /> Thông tin cá nhân
        </button>
        <button className="btn btn-outline-danger d-flex align-items-center gap-2 mt-2" onClick={handleLogout}>
          <LogoutOutlined /> Đăng xuất
        </button>
      </div>

      <Modal title="Thông tin tài khoản" open={isProfileOpen} onCancel={() => setIsProfileOpen(false)} footer={[<Button key="close" onClick={() => setIsProfileOpen(false)}>Close</Button>]} >
        <p>Name: {student?.name || "Guest"}</p>
        <p>Email: {student?.email || "No Email"}</p>
        <p>Student ID: {student?.studentId || "N/A"}</p>
        <p>Class: {student?.studentClas || "N/A"}</p>
      </Modal>
    </div>
  );
};

export default StudentAccount;
