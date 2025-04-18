import React from "react";
import { Card, Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

const TotalPostCard = () => {
  return (
    <Card
      className="d-flex justify-content-between align-items-center p-3"
      style={{
        borderRadius: "12px",
      }}
    >
      <div>
        <h6>Tổng bài viết</h6>
        <p className="mb-1">5</p>
      </div>
      <FileTextOutlined style={{ fontSize: "50px", opacity: 0.8 }} />
    </Card>
  );
};

export default TotalPostCard;
