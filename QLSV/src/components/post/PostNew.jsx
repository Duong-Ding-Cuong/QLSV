import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Spin,
  Dropdown,
  Menu,
  Modal,
  Input,
  message,
  Upload,
  Button,
} from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { deletePostApi, getPostApi, updatePostApi } from "../../services/API/PostApi";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ForumData from "../forum/ForumData";

const PostNew = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { student } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await getPostApi();
        if (res.data && Array.isArray(res.data.posts)) {
          const validPosts = res.data.posts
            .filter((post) => post.forum && post.author) // Only keep valid posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setPosts(validPosts.slice(0, 5));
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        message.error("Unable to load posts!");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await deletePostApi(postId);
      setPosts(posts.filter((post) => post._id !== postId));
      message.success("Post deleted successfully!");
    } catch (err) {
      console.error("Error deleting post:", err);
      message.error("Failed to delete post!");
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewTitle(post.title);
    setNewContent(post.content || "");
    setNewImage(null);
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
                image: response.data.post.image || post.image,
              }
            : post
        )
      );
      setIsModalVisible(false);
      setNewImage(null);
      message.success("Post updated successfully!");
    } catch (err) {
      console.error("Error updating post:", err);
      message.error("Failed to update post!");
    }
  };

  const handleImageChange = ({ file }) => {
    if (file && file.status !== "removed") {
      const isImage = file.type.startsWith("image/");
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isImage) {
        message.error("Please select an image file!");
        return;
      }
      if (!isLt5M) {
        message.error("Image must be smaller than 5MB!");
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
        Edit
      </Menu.Item>
      <Menu.Item
        icon={<DeleteOutlined />}
        onClick={() => handleDelete(post._id)}
        danger
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <ForumData></ForumData>
    <Card title="📰 Latest Posts" className="shadow-sm m-4">
      {loading ? (
        <Spin />
      ) : posts.length > 0 ? (
        <ul className="list-unstyled">
          {posts.map((item) => {
            const isAuthor = student?.id === item.author?._id;

            return (
              <li
                key={item._id}
                className="d-flex align-items-center justify-content-between py-2 border-bottom"
              >
                <div className="d-flex align-items-center">
                  <div>
                    <Link
                      to={`/post/${item._id}`}
                      className="fw-bold text-primary d-block text-decoration-none"
                    >
                      {item.title}
                    </Link>
                    <small className="text-muted">
                      Author: {item.author?.name || "Anonymous"} | Forum:{" "}
                      {item.forum?.title || "Undefined"}
                    </small>
                  </div>
                </div>
                {isAuthor && (
                  <Dropdown overlay={menu(item)} trigger={["click"]}>
                    <MoreOutlined style={{ fontSize: 20, cursor: "pointer" }} />
                  </Dropdown>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center m-2">No posts available.</p>
      )}

      <Modal
        title="Update Post"
        open={isModalVisible}
        onOk={handleUpdatePost}
        onCancel={() => {
          setIsModalVisible(false);
          setNewImage(null);
        }}
      >
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Post Title"
          className="mb-3"
        />
        <Input.TextArea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Post Content"
          rows={4}
          className="mb-3"
        />
        <Upload
          accept="image/*"
          beforeUpload={() => false}
          onChange={handleImageChange}
          fileList={
            newImage ? [{ uid: "-1", name: newImage.name, status: "done" }] : []
          }
        >
          <Button icon={<UploadOutlined />}>Select New Image (Optional)</Button>
        </Upload>
      </Modal>
    </Card>
    </>
  );
};

export default PostNew;