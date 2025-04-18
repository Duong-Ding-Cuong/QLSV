import React, { useEffect, useRef, useState } from "react";
import { Button, Spin } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { getForumApi } from "../../services/API/ForumApi";
import { getPostApi } from "../../services/API/PostApi";
import { NavLink } from "react-router-dom";

const ForumData = ({ filterByAuthor }) => {
  const [forums, setForums] = useState([]);
  const [postCounts, setPostCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const baseUrl = "https://qlsv-tbkt.onrender.com"; // Replace with actual server URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [forumRes, postRes] = await Promise.all([
          getForumApi(),
          getPostApi(),
        ]);

        const forumsData = forumRes.data.forums || [];
        console.log("forumsData", forumsData);

        // Filter forums by author if specified
        const filteredForums = filterByAuthor
          ? forumsData.filter((forum) => forum.createdBy?._id === filterByAuthor)
          : forumsData;

        const postsData = postRes.data.posts || [];
        console.log("postsData", postsData);

        // Count posts per forum, safely handle missing forum
        const counts = postsData.reduce((acc, post) => {
          if (post.forum && post.forum._id) {
            const forumId = post.forum._id;
            acc[forumId] = (acc[forumId] || 0) + 1;
          }
          return acc;
        }, {});
        console.log("postCounts", counts);

        setForums(filteredForums);
        setPostCounts(counts);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setForums([]);
        setPostCounts({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterByAuthor]);

  const handleScroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-3">
      {loading ? (
        <Spin size="large" className="text-center d-block" />
      ) : (
        <div className="d-flex align-items-center gap-3 justify-content-center">
          <Button
            shape="circle"
            icon={<ArrowLeftOutlined />}
            onClick={() => handleScroll("left")}
          />

          <div
            ref={scrollRef}
            className="d-flex gap-3 overflow-x-hidden overflow-y-hidden p-2"
            style={{ scrollBehavior: "smooth", maxWidth: "83vw" }}
          >
            {forums.length > 0 ? (
              forums.map((forum) => {
                const slug = forum._id;
                return (
                  <NavLink
                    to={`/forum/${slug}`}
                    key={forum._id}
                    style={{ textDecoration: "none" }}
                    className={({ isActive }) => (isActive ? "active-card" : "")}
                  >
                    <div
                      className="card shadow-sm"
                      style={{ minWidth: "300px" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.03)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      {/* Display forum image if available */}
                      {forum.image && (
                        <img
                          src={`${baseUrl}/images/${forum.image}`}
                          alt="Forum image"
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderTopLeftRadius: "4px",
                            borderTopRightRadius: "4px",
                          }}
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                            console.error("Error loading forum image:", forum.image);
                          }}
                        />
                      )}
                      <div className="card-body text-center">
                        <h5 className="card-title mb-2">{forum.title}</h5>
                        <p className="card-text text-muted mb-2">
                          {forum.description || "Không có mô tả"}
                        </p>
                        <p className="card-text small fw-bold">
                          Bài viết: {postCounts[forum._id] || 0}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                );
              })
            ) : (
              <p>Không có diễn đàn nào.</p>
            )}
          </div>

          <Button
            shape="circle"
            icon={<ArrowRightOutlined />}
            onClick={() => handleScroll("right")}
          />
        </div>
      )}
    </div>
  );
};

export default ForumData;