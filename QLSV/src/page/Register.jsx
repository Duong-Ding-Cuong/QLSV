import React, { useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../services/API/LoginApi";
import Logo from "../components/layout/Logo";

const { Link } = Typography;

import "./Register.css";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await registerApi(values);
      message.success("Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login");
    } catch (errorMessage) {
      message.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="register-container">
        <div className="logo-container">
          <Logo />
        </div>
        <Card title="Đăng ký tài khoản" className="register-card">
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              name: "Nguyễn Văn A",
              email: "nguyenvana@gmail.com",
              password: "123456",
              student_id: "2100001",
              class: "CNT2",
            }}
          >
            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item
              label="Mã sinh viên"
              name="student_id"
              rules={[{ required: true, message: "Vui lòng nhập mã sinh viên!" }]}
            >
              <Input placeholder="Nhập mã sinh viên" />
            </Form.Item>

            <Form.Item
              label="Lớp"
              name="class"
              rules={[{ required: true, message: "Vui lòng nhập lớp học!" }]}
            >
              <Input placeholder="Nhập lớp" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} block>
              Đăng ký
            </Button>

            <div className="text-center mt-2">
              Đã có tài khoản?{" "}
              <Link onClick={() => navigate("/login")}>Đăng nhập</Link>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default Register;