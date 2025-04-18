import React, { useEffect, useState } from "react";
import { Card, Row, Col, Typography, Spin, message, Pagination } from "antd";
import { Link } from "react-router-dom";
import { getPostApi } from "../../services/API/PostApi";

const { Title, Paragraph } = Typography;

const PostRelated = ({ postId, topicId }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const fetchRelatedPosts = async () => {
    if (!topicId) {
      setRelatedPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await getPostApi();
      if (response?.data?.success) {
        const filteredPosts = response.data.posts.filter(
          (post) => post.forum?._id === topicId && post._id !== postId
        );
        setRelatedPosts(filteredPosts);
      } else {
        message.error(response?.message || "Failed to fetch related posts!");
        setRelatedPosts([]);
      }
    } catch (error) {
      console.error("Error fetching related posts:", error);
      message.error(
        error.response?.status === 404 
          ? "Posts not found" 
          : "Error fetching related posts!"
      );
      setRelatedPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatedPosts();
  }, [topicId, postId]);

  // Pagination calculation
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = relatedPosts.slice(startIndex, endIndex);

  if (loading) {
    return <Spin size="large" style={{ display: "block", margin: "20px auto" }} />;
  }

  if (!relatedPosts.length) {
    return (
      <div className="related-posts mt-5">
        <Title level={3}>Related Posts</Title>
        <p>No posts found for this topic.</p>
      </div>
    );
  }

  return (
    <div className="related-posts">
      <Title level={3}>Related Posts</Title>
      <Col gutter={[16, 16]}>
        {paginatedPosts.map((post) => (
          <Col key={post._id}>
            <Card hoverable className="w-100  mt-3">
              <Link to={`/post/${post._id}`} className="text-decoration-none">
                <Title level={4} ellipsis={{ rows: 1 }}>
                  {post.title}
                </Title>
                <Paragraph ellipsis={{ rows: 2 }}>
                Tác giả: {post.author?.name || "Unknown"}
                </Paragraph>
              </Link>
            </Card>
          </Col>
        ))}
      </Col>
      {relatedPosts.length > postsPerPage && (
        <Pagination
          current={currentPage}
          total={relatedPosts.length}
          pageSize={postsPerPage}
          onChange={setCurrentPage}
          className="mt-4 d-flex justify-content-end"
          style={{ textAlign: "right" }}
        />
      )}
    </div>
  );
};

export default PostRelated;