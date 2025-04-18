import React, { useEffect, useState } from "react";
import { Card, List, Spin } from "antd";
import { getForumApi } from "../../services/API/ForumApi";
import { Link } from "react-router-dom";

const TopicList = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setLoading(true);
                const res = await getForumApi();
                if (res.data && Array.isArray(res.data.forums)) {
                    const top5 = res.data.forums.slice(0, 5);
                    setTopics(top5);
                }
            } catch (error) {
                console.error("Lỗi lấy chủ đề:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopics();
    }, []);

    return (
        <Card title="Chủ đề mới" className="shadow-sm mt-4 w-25 me-4 h-50">
            {loading ? (
                <Spin />
            ) : (
                <List
                    itemLayout="horizontal"
                    dataSource={topics}
                    renderItem={(topic) => (
                        <List.Item>
                            <List.Item.Meta
                                title={
                                    <Link
                                        to={`/forum/${topic._id}`}
                                        className="fw-bold text-dark text-decoration-none"
                                    >
                                        {topic.title}
                                    </Link>
                                }
                                description={
                                    <span className="text-muted">
                                        {new Date(topic.createdAt).toLocaleString()}
                                    </span>
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
        </Card>
    );
};

export default TopicList;
