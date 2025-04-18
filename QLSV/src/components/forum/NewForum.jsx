import React, { useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { createForumApi } from "../../services/API/ForumApi";
import { useNavigate } from "react-router-dom";

const NewForum = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    const forumData = {
      title: values.title,
      description: values.description || "",
      expireInHours: values.expireInHours || 1,
    };

    try {
      const response = await createForumApi(forumData);
      console.log("📝 Chủ đề mới:", forumData);
      console.log("Phản hồi từ server:", response.data);

      // Hiển thị thông báo thành công
      notification.success({
        message: "🎉 Tạo chủ đề thành công!",
        description: `Chủ đề "${values.title}" đã được tạo thành công.`,
        duration: 10, 
      });
      const forumId = response.data?.topic._id; 
      if (forumId) {
        navigate(`/forum/${forumId}`);
      }

      handleCancel();
    } catch (error) {
      console.error("Lỗi khi tạo chủ đề:", error);

      // Hiển thị thông báo thất bại
      notification.error({
        message: "🚨 Tạo chủ đề thất bại!",
        description:
          error.response?.data?.message ||
          "Đã có lỗi xảy ra, vui lòng thử lại sau.",
        duration: 4,
      });
    }
  };

  return (
    <div className="px-5 py-3 d-flex flex-grow-1 justify-content-end">
      <Button type="primary" onClick={showModal}>
        Thêm chủ đề
      </Button>

      <Modal
        title="Tạo chủ đề mới"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập mô tả (tùy chọn)" rows={3} />
          </Form.Item>

          <Form.Item
            label="Thời gian hết hạn (giờ)"
            name="expireInHours"
            rules={[
              { required: true, message: "Vui lòng nhập thời gian hết hạn!" },
              { type: "number", min: 1, message: "Thời gian phải lớn hơn 0!" },
            ]}
            normalize={(value) => Number(value)}
          >
            <Input type="number" placeholder="Nhập số giờ" defaultValue={1} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng bài
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NewForum;
