import React, {useEffect, useState} from 'react';
import Header from '../components/layout/Header';
import FooterComponent from '../components/layout/FooterComponent';
import Banner from '../components/layout/Banner';
import MenuNav from '../components/layout/MenuNav';
import ForumData from '../components/forum/ForumData';
import PostData from '../components/post/PostData';
import {useParams} from 'react-router-dom';

import {getStudentByIdApi} from '../services/API/StudentApi';
import { Avatar, Button, Modal } from 'antd';
import { UserOutlined, SettingOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";

const StudentPageID = () => {
    const {id_student} = useParams();
    const [user, setUser] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getStudentByIdApi(id_student);
                console.log("aa",response.data)
                setUser(response.data);
            } catch (error) {
                console.error("Không thể lấy thông tin người dùng:", error);
            }
        };

        if (id_student) {
            fetchUserData();
        }
    }, [id_student]);
    if (!user) {
        return <p>Đang tải thông tin tài khoản...</p>;
    }
    return (
        <>
            <Header/>
            <Banner/>
            <MenuNav/>
            <div className="container mt-4">
                {
                id_student ? (
                    <ForumData filterByAuthor={id_student}/>
                ) : (
                    <p>Đang tải thông tin tài khoản...</p>
                )
            } </div>
            <div className="d-flex m-4">
                <div className="w-75">
                    {
                    id_student ? (
                        <PostData filterByAuthor={id_student}/>
                    ) : (
                        <p>Đang tải thông tin tài khoản...</p>
                    )
                } </div>
                <div className="bg-white border p-3 mt-4 shadow-sm h-50"
                    style={
                        {
                            width: "250px",
                            minHeight: "100%"
                        }
                }>
                    <div className="text-center mb-3">
                        <Avatar size={64}
                            icon={<UserOutlined/>}/>
                        <h6 className="mt-2 mb-0">
                            {
                                user.student. name || "Guest"
                        }</h6>
                        <small className="text-muted">
                            {
                                user.student. email || "No Email"
                        }</small>
                    </div>
                    <hr/>
                    <div className="d-flex flex-column gap-3">
                        <button className="btn btn-outline-primary d-flex align-items-center gap-2"
                            onClick={
                                () => setIsProfileOpen(true)
                        }>
                            <UserOutlined/>
                            Thông tin cá nhân
                        </button>
                    </div>

                    <Modal title="Thông tin tài khoản"
                        open={isProfileOpen}
                        onCancel={
                            () => setIsProfileOpen(false)
                        }
                        footer={
                            [
                                <Button key="close"
                                    onClick={
                                        () => setIsProfileOpen(false)
                                }>Close</Button>
                            ]
                    }>
                        <p>Name: {
                            user.student. name || "Guest"
                        }</p>
                        <p>Email: {
                            user.student. email || "No Email"
                        }</p>
                        <p>Student ID: {
                            user.student. student_id|| "N/A"
                        }</p>
                        <p>Class: {
                            user.student. class || "N/A"
                        }</p>
                    </Modal>
                </div>
            </div>
            <FooterComponent/>
        </>
    );
}

export default StudentPageID;
