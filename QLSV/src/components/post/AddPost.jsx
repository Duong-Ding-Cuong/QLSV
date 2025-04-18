import React, { useState } from "react";
import { Button, Modal, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { createPostApi } from "../../services/API/PostApi";

const AddPost = ({ forumId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]); // Quản lý fileList riêng
  const navigate = useNavigate();

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const handleSubmit = async (values) => {
    try {
      const postData = new FormData();
      postData.append("title", values.title);
      postData.append("content", values.content || "");
      postData.append("forum", forumId);

      // Sử dụng fileList thay vì values.image
      if (fileList.length > 0 && fileList[0].originFileObj) {
        postData.append("image", fileList[0].originFileObj);
      } else {
        console.log("No image selected");
      }

      const response = await createPostApi(postData);
      const newPostId = response.data.post?._id;

      if (!newPostId) throw new Error("Không có ID");

      message.success("Tạo bài viết thành công!");
      navigate(`/post/${newPostId}`);
      handleCancel();
    } catch (err) {
      console.error("Error creating post:", err);
      message.error("Tạo bài viết thất bại!");
    }
  };

  const handleUploadChange = ({ fileList }) => {
    // Lọc fileList để chỉ giữ file hợp lệ
    const filteredList = fileList.slice(-1); // Giữ file mới nhất (maxCount=1)
    setFileList(filteredList);
  };

  const beforeUpload = (file) => {
    // Validate file
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Chỉ được upload file ảnh!");
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Ảnh phải nhỏ hơn 5MB!");
      return false;
    }
    return false; // Ngăn upload tự động
  };

  return (
    <div className="px-5 py-3 d-flex flex-grow-1 justify-content-end">
      <Button type="primary" onClick={showModal}>
        Thêm bài viết
      </Button>
      <Modal
        title="Tạo bài viết mới"
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
          <Form.Item label="Nội dung" name="content">
            <Input.TextArea rows={3} placeholder="Nhập nội dung (tùy chọn)" />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <Upload
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={beforeUpload}
              listType="picture"
              maxCount={1}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
            </Upload>
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

export default AddPost;