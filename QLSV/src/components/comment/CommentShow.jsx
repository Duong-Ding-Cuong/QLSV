import React, { useState, useContext } from "react";
import { List, Avatar, Typography, Button, Input, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { deleteCommentApi, updateCommentApi } from "../../services/API/CommentApi";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; 

const { Title } = Typography;
const { TextArea } = Input;

const CommentShow = ({ comments, onDeleteComment, onEditComment }) => {
  const { student } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [hoveredCommentId, setHoveredCommentId] = useState(null); 

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleEditStart = (comment) => {
    setEditingCommentId(comment._id);
    setEditContent(comment.content);
  };

  const handleEditSave = async (id_comment) => {
    if (!editContent.trim()) {
      message.error("Nội dung không được để trống");
      return;
    }

    try {
      const response = await updateCommentApi(id_comment, editContent);
      if (response?.status === 200 && response.data?.success) {
        onEditComment(id_comment, editContent);
        message.success("Bình luận đã được cập nhật!");
        setEditingCommentId(null);
      } else {
        message.error(response?.data?.message || "Lỗi khi cập nhật bình luận!");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Lỗi server!");
    }
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  const handleDelete = async (id_comment) => {
    try {
      const response = await deleteCommentApi(id_comment);
      console.log(response)

      if (response?.status === 200 && response.data?.success) {
        onDeleteComment(id_comment);
        message.success("Bình luận đã được xóa!");
      } else {
        message.error(response?.data?.message || "Lỗi khi xóa bình luận!");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Lỗi server!");
    }
  };

  if (!comments || comments.length === 0) {
    return <p>Không có bình luận nào.</p>;
  }

  const validComments = comments.filter(
    (comment) => comment.author && comment.author.name
  );

  if (validComments.length === 0) {
    return <p>Không có bình luận hợp lệ.</p>;
  }

  return (
    <div className="mt-3">
      <Title level={3}>Bình luận</Title>
      {student ? (
        <List
          itemLayout="horizontal"
          dataSource={validComments}
          renderItem={(comment) => (
            <List.Item
              onMouseEnter={() => setHoveredCommentId(comment._id)} 
              onMouseLeave={() => setHoveredCommentId(null)} 
              actions={
                student.name === comment.author.name 
                  ? [
                      editingCommentId === comment._id ? (
                        <>
                          <Button
                            type="primary"
                            onClick={() => handleEditSave(comment._id)}
                          >
                            Lưu
                          </Button>
                          <Button
                            onClick={handleEditCancel}
                            style={{ marginLeft: 8 }}
                          >
                            Hủy
                          </Button>
                        </>
                      ) : hoveredCommentId === comment._id ? ( 
                        <>
                          <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => handleEditStart(comment)}
                          />
                          <Popconfirm
                            title="Bạn có chắc muốn xóa bình luận này?"
                            onConfirm={() => handleDelete(comment._id)}
                            okText="Có"
                            cancelText="Không"
                          >
                            <Button type="link" danger icon={<DeleteOutlined />} />
                          </Popconfirm>
                        </>
                      ) : null,
                    ]
                  : []
              }
            >
              <List.Item.Meta
                avatar={
                  <Avatar>{comment.author.name.charAt(0).toUpperCase()}</Avatar>
                }
                title={<b>{comment.author.name}</b>}
                description={
                  editingCommentId === comment._id ? (
                    <TextArea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={2}
                    />
                  ) : (
                    comment.content
                  )
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <div>
          <p>Bạn cần đăng nhập để bình luận.</p>
          <Button type="primary" onClick={handleLoginRedirect}>
            Đăng nhập
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentShow;