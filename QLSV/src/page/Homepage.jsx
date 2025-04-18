import React from 'react'
import Banner from '../components/layout/Banner'
import FooterComponent from '../components/layout/FooterComponent'
import MenuNav from '../components/layout/MenuNav'
import PostData from '../components/post/PostData'
import TopicList from '../components/forum/TopicList'
import PostNew from '../components/post/PostNew'
import Header from '../components/layout/Header'
const Homepage = () => {
  return (
    <>
     <Header></Header>
      <Banner></Banner>
      <MenuNav></MenuNav>
      <section className="welcome-section text-center py-5 bg-light">
        <div className="container">
          <h1 className="fw-bold">Welcome to DIỄN ĐÀN SINH VIÊN </h1>
          <p className="text-muted">
          Nhóm nhỏ năng động, nơi sinh viên cùng nhau chia sẻ kiến thức, hỗ trợ lẫn nhau và phát triển bản thân. Tham gia cùng chúng tôi để kết nối và học hỏi!
          </p>
        </div>
      </section>
      <div className="d-flex">
      <div className="w-75">
      <PostData ></PostData>
      </div>
      <TopicList></TopicList>
      </div>
      <FooterComponent></FooterComponent>
    </>
  )
}

export default Homepage