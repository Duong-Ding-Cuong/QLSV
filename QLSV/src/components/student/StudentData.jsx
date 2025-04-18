import React, { useEffect, useState } from "react";
import { Card, Avatar, Button } from "antd";
import { getStudentApi } from "../../services/API/StudentApi";
import { getPostApi } from "../../services/API/PostApi";
import { useNavigate } from "react-router-dom";

const StudentData = () => {
  const [topAuthors, setTopAuthors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, postRes] = await Promise.all([
          getStudentApi(),
          getPostApi(),
        ]);

        const students = studentRes.data.students;
        const posts = postRes.data.posts;

        const studentPosts = students.map((student) => {
          const count = posts.filter(
            (post) => post.author._id === student._id
          ).length;
          return { ...student, postCount: count };
        });
        console.log(studentPosts)

        const sorted = studentPosts
          .sort((a, b) => b.postCount - a.postCount)
          .slice(0, 5);

        setTopAuthors(sorted);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card title="CÁC TÁC GIẢ HÀNG ĐẦU" className="p-3 mt-4 me-5 h-50">
      {topAuthors.map((author) => (
        <div
          key={author._id}
          className="d-flex align-items-center mb-3 cursor-pointer"
          onClick={() => navigate(`/student/${author._id}`)}
        >
          <div className="flex-grow-1">
            <h6 className="mb-0">{author.name}</h6>
            <p className="text-muted mb-0">
              Số bài viết: {author.postCount}
            </p>
          </div>
          <Button type="primary" size="small">
            Xem
          </Button>
        </div>
      ))}
    </Card>
  );
};

export default StudentData;
