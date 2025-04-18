import React, { useEffect } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordApi } from "../services/API/LoginApi";

const ForgotPsWord = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");
  const [form] = Form.useForm();

  useEffect(() => {
    if (!email) {
      message.error("Email không hợp lệ!");
      navigate("/login");
    }
  }, [email, navigate]);

  const handleResetPassword = async (values) => {
    try {
      await resetPasswordApi(email, values.otp, values.newPassword);
      message.success("✅ Đổi mật khẩu thành công!");
      navigate("/login");
    } catch (error) {
      message.error(
        error.response?.data?.message || "❌ Mã OTP không đúng hoặc đã hết hạn!"
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card title="Xác nhận mã OTP" style={{ width: 400 }}>
        <p>Email: <strong>{email}</strong></p>
        <Form form={form} layout="vertical" onFinish={handleResetPassword}>
          <Form.Item
            label="Mã OTP"
            name="otp"
            rules={[{ required: true, message: "Vui lòng nhập mã OTP!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đổi mật khẩu
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPsWord;
