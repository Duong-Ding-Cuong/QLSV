import React, { useContext } from 'react'
import Banner from '../components/layout/Banner'
import MenuNav from '../components/layout/MenuNav'

import FooterComponent from '../components/layout/FooterComponent'
import StudentAccount from '../components/student/StudentAccount'
import PostData from '../components/post/PostData'
import Header from '../components/layout/Header'
import { AuthContext } from '../context/AuthContext'
import ForumData from '../components/forum/ForumData'

const StudentPage = () => {
  const { student} = useContext(AuthContext);
  return (
      <>
        <Header></Header>
        <Banner></Banner>
        <MenuNav></MenuNav>
        <div className="">
        {student ? (
            <ForumData filterByAuthor={student.id} />
          ) : (
            <p>Đang tải thông tin tài khoản...</p>
          )}
        </div>
        <div className="d-flex m-4">
        <div className="w-75">
          {student ? (
            <PostData filterByAuthor={student.id} />
          ) : (
            <p>Đang tải thông tin tài khoản...</p>
          )}
        </div>
        <StudentAccount />
      </div>
        <FooterComponent></FooterComponent>
      </>
    )
}

export default StudentPage