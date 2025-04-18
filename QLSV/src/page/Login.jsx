import React, { useContext, useState } from "react";
import { Form, Input, Button, Card, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { forgotPasswordApi, loginApi } from "../services/API/LoginApi";
import { AuthContext } from "../context/AuthContext";
import Logo from "../components/layout/Logo";
const { Link } = Typography;
import "./Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await loginApi(values.email, values.password);
      if (response?.data?.token) {
        login(response.data);
        message.success(`Chào mừng ${response.data.name}!`);
        navigate("/");
      } else {
        message.error("Dữ liệu trả về không hợp lệ!");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Email hoặc mật khẩu không đúng!");
    }
    setLoading(false);
  };

  const handleForgotPassword = async (values) => {
    setLoading(true);
    try {
      await forgotPasswordApi(values.email);
      message.success(`Mã OTP đã được gửi tới ${values.email}`);
      navigate(`/forgot?email=${values.email}`);
    } catch (error) {
      console.error("Forgot password error:", error);
      message.error("Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="logo-container">
          <Logo />
        </div>
        <Card
          title={forgotPassword ? "Quên mật khẩu" : "Đăng nhập"}
          className="login-card"
        >
          {forgotPassword ? (
            <Form layout="vertical" onFinish={handleForgotPassword}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input placeholder="Nhập email của bạn" />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Gửi yêu cầu đặt lại mật khẩu
              </Button>
              <Button
                type="link"
                onClick={() => setForgotPassword(false)}
                block
              >
                Quay lại đăng nhập
              </Button>
            </Form>
          ) : (
            <Form layout="vertical" onFinish={onFinish}>
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
              <Button type="primary" htmlType="submit" loading={loading} block>
                Đăng nhập
              </Button>
              <div className="text-center mt-2">
                <Link onClick={() => setForgotPassword(true)}>
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="text-center mt-2">
                Chưa có tài khoản?{" "}
                <Link onClick={() => navigate("/register")}>Đăng ký ngay</Link>
              </div>
            </Form>
          )}
        </Card>
      </div>
    </>
  );
};

export default Login;