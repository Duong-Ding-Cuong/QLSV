import React, { useContext, useEffect, useState } from "react";
import {
  List,
  Card,
  Skeleton,
  Pagination,
  Button,
  Modal,
  Input,
  Menu,
  Dropdown,
  Upload,
  message,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  deletePostApi,
  getPostApi,
  updatePostApi,
} from "../../services/API/PostApi";
import { getCommentApi } from "../../services/API/CommentApi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./PostData.css"; // Import your CSS file for custom styles
const PostData = ({ forumId, posts: propPosts, filterByAuthor }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState(null); // For image upload
  const pageSize = 5;
  const { student } = useContext(AuthContext);
  const baseUrl = "https://qlsv-tbkt.onrender.com"; // Replace with actual server URL

  useEffect(() => {
    if (propPosts?.length > 0) {
      setPosts((prevPosts) => {
        const newPosts = propPosts
          .filter((newPost) => !prevPosts.some((p) => p._id === newPost._id))
          .filter((post) => post.forum); // Only keep posts with valid forum
        return [...newPosts, ...prevPosts];
      });
      setLoading(false);
    }
  }, [propPosts]);

  useEffect(() => {
    if (!propPosts || propPosts.length === 0) {
      const fetchPostsWithComments = async () => {
        setLoading(true);
        try {
          const res = await getPostApi();
          let postList = res.data.posts || [];

          // Filter by forumId and filterByAuthor
          if (forumId) {
            postList = postList.filter((post) => post.forum?._id === forumId);
          }
          if (filterByAuthor) {
            postList = postList.filter(
              (post) => post.author?._id === filterByAuthor
            );
          }

          // Only keep posts with valid forum
          postList = postList.filter((post) => post.forum);

          const postsWithComments = await Promise.all(
            postList.map(async (post) => {
              try {
                const commentRes = await getCommentApi(post._id);
                const commentCount = commentRes.data.total || 0;
                return { ...post, commentCount };
              } catch {
                return { ...post, commentCount: 0 };
              }
            })
          );

          setPosts(postsWithComments);
        } catch (err) {
          console.error("Lỗi khi lấy bài viết:", err);
          setPosts([]);
        } finally {
          setLoading(false);
        }
      };

      fetchPostsWithComments();
    }
  }, [forumId, filterByAuthor]);

  useEffect(() => {
    setCurrentPage(1);
  }, [forumId]);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDelete = async (postId) => {
    try {
      await deletePostApi(postId);
      setPosts(posts.filter((post) => post._id !== postId));
      message.success("Bài viết đã được xóa!");
    } catch (err) {
      console.error("Lỗi khi xóa bài viết:", err);
      message.error("Xóa bài viết thất bại!");
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewTitle(post.title);
    setNewContent(post.content || "");
    setNewImage(null); // Reset image
    setIsModalVisible(true);
  };

  const handleUpdatePost = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("content", newContent);
      if (newImage) {
        formData.append("image", newImage);
      }

      const response = await updatePostApi(editingPost._id, formData);
      setPosts(
        posts.map((post) =>
          post._id === editingPost._id
            ? {
                ...post,
                title: newTitle,
                content: newContent,
                image: response.data.post.image || post.image, // Update image if changed
              }
            : post
        )
      );
      setIsModalVisible(false);
      setNewImage(null);
      message.success("Bài viết đã được cập nhật!");
    } catch (err) {
      console.error("Lỗi khi cập nhật bài viết:", err);
      message.error("Cập nhật bài viết thất bại!");
    }
  };

  const handleImageChange = ({ file }) => {
    if (file && file.status !== "removed") {
      const isImage = file.type.startsWith("image/");
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isImage) {
        message.error("Vui lòng chọn file ảnh!");
        return;
      }
      if (!isLt5M) {
        message.error("Ảnh phải nhỏ hơn 5MB!");
        return;
      }
      setNewImage(file.originFileObj || file);
    } else {
      setNewImage(null);
    }
  };

  const menu = (post) => (
    <Menu>
      <Menu.Item icon={<EditOutlined />} onClick={() => handleEdit(post)}>
        Sửa
      </Menu.Item>
      <Menu.Item
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(post._id)}
        danger
      >
        Xóa
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="m-4">
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : posts.length > 0 ? (
        <>
          <List
            itemLayout="horizontal"
            dataSource={paginatedPosts}
            renderItem={(post) => (
              <Card className="shadow-sm mb-3" style={{ position: "relative" }}>
                {student?.id === post.author?._id && (
                  <Dropdown
                    overlay={menu(post)}
                    trigger={["click"]}
                    className="position-absolute top-0 end-0 m-2"
                  >
                    <Button
                      type="link"
                      icon={<MoreOutlined />}
                      size="small"
                    />
                  </Dropdown>
                )}
                <Link
                  to={`/post/${post._id}`}
                  className="fw-bold text-dark fs-5 d-block text-decoration-none"
                >
                  {post.title}
                </Link>
                <Link
                  to={`/forum/${post.forum?._id || ""}`}
                  className="text-dark d-block text-decoration-none"
                >
                  <b>Chủ đề:</b> {post.forum?.title || "Không xác định"}
                </Link>
                {/* Display image if available */}
                {post.image && (
                  <div className="my-2">
                    <img
                      src={`${baseUrl}/images/${post.image}`}
                      alt="Post image"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: "8px",
                      }}
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                        console.error("Error loading image:", post.image);
                      }}
                    />
                  </div>
                )}
                <div className="text-muted">
                  <span className="me-3">
                    👤 {post.author?.name || "Không xác định"}
                  </span>
                  📅 {new Date(post.createdAt).toLocaleString()}{" "}
                  <span className="me-3">
                    <EyeOutlined className="me-1" /> {post.views || 0}
                  </span>{" "}
                  • 💬 {post.commentCount} bình luận
                </div>
              </Card>
            )}
          />
          <div className="d-flex justify-content-end mt-3">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={posts.length}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </>
      ) : (
        <p className="text-center">
          {forumId
            ? "Không có bài viết nào cho chủ đề này."
            : "Không có bài viết nào."}
        </p>
      )}
      <Modal
        title="Cập nhật bài viết"
        visible={isModalVisible}
        onOk={handleUpdatePost}
        onCancel={() => {
          setIsModalVisible(false);
          setNewImage(null);
        }}
      >
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Tiêu đề bài viết"
          className="mb-3"
        />
        <Input.TextArea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Nội dung bài viết"
          rows={4}
          className="mb-3"
        />
        <Upload
          accept="image/*"
          beforeUpload={() => false}
          onChange={handleImageChange}
          fileList={newImage ? [{ uid: "-1", name: newImage.name, status: "done" }] : []}
        >
          <Button icon={<UploadOutlined />}>Chọn ảnh mới (tùy chọn)</Button>
        </Upload>
      </Modal>
    </div>
  );
};

export default PostData;