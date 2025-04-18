import React, { useState, useContext } from "react";
import { Input, Button, message } from "antd";
import { postCommentApi } from "../../services/API/CommentApi";
import { AuthContext } from "../../context/AuthContext";

const { TextArea } = Input;

const CommentNew = ({ postId, onAddComment }) => {
  const { student } = useContext(AuthContext) || {};
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) {
      message.error("Nội dung bình luận không được để trống");
      return;
    }
    if (!student?.id) {
      message.error("Không tìm thấy thông tin sinh viên!");
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const optimisticComment = {
      _id: tempId,
      content: content,
      author: { name: student.name },
      createdAt: new Date().toISOString(),
    };

    onAddComment(optimisticComment);
    setContent("");
    setLoading(true);

    try {
      const response = await postCommentApi(postId, content, student.id);
      if (response?.status === 200 && response.data?.success) {
        const realComment = {
          _id: response.data.comment._id,
          content: response.data.comment.content || content,
          author: { name: student.name },
          createdAt: response.data.comment.createdAt || new Date().toISOString(),
        };
        onAddComment(realComment);
        onAddComment((prev) => prev.filter((comment) => comment._id !== tempId));
        message.success("Bình luận đã được thêm!");
      } else {
        onAddComment((prev) => prev.filter((comment) => comment._id !== tempId));
        message.error(response?.data?.message || "Lỗi khi gửi bình luận!");
      }
    } catch (error) {
      onAddComment((prev) => prev.filter((comment) => comment._id !== tempId));
      message.error(error.response?.data?.message || "Lỗi server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <TextArea
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Nhập bình luận..."
        disabled={loading}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end", // Căn nút sang phải
          marginTop: "8px", // Giảm khoảng cách so với mt-2 (8px thay vì 16px)
        }}
      >
        <Button
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          Gửi bình luận
        </Button>
      </div>
    </div>
  );
};

export default CommentNew;