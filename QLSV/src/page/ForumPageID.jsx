import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/layout/Banner";
import MenuNav from "../components/layout/MenuNav";
import PostData from "../components/post/PostData";
import FooterComponent from "../components/layout/FooterComponent";
import Header from "../components/layout/Header";
import { getForumApi } from "../services/API/ForumApi";
import AddPost from "../components/post/AddPost";

const ForumPageID = () => {
  const { title } = useParams();
  const [forum, setForum] = useState(null);
  const [posts, setPosts] = useState([]); 
  const [loadingForum, setLoadingForum] = useState(true);

  useEffect(() => {
    const fetchForum = async () => {
      try {
        console.log("Forum tìm được:", title);
        const response = await getForumApi();
        console.log("Danh sách forums từ API:", response.data.forums);
        const forumData = response.data.forums.find((f) => f._id === title);
        console.log("Forum tìm được:", forumData);
        setForum(forumData || null);
      } catch (error) {
        console.error("Lỗi khi gọi API getForumApi:", error);
        setForum(null);
      } finally {
        setLoadingForum(false);
      }
    };

    fetchForum();
  }, [title]);
  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <>
      <Header />
      <Banner />
      <MenuNav />
      <div className="container py-3">
        {loadingForum ? (
          <p className="text-center text-muted">Đang tải thông tin chủ đề...</p>
        ) : forum ? (
          <div className="forum-details">
            <div className="d-flex">
              <div>
                <h1 className="mb-3 text-primary">{forum.title}</h1>
                <p className="text-muted mb-4">{forum.description || "Không có mô tả."}</p>
              </div>
              <AddPost forumId={title} onPostCreated={handleNewPost} />
            </div>
            <PostData forumId={title} posts={posts} />
          </div>
        ) : (
          <p className="text-center text-danger">
            Không tìm thấy chủ đề với ID: {title}
          </p>
        )}
      </div>
      <FooterComponent />
    </>
  );
};

export default ForumPageID;
