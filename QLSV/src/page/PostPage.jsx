import React from "react";
import Banner from "../components/layout/Banner";
import MenuNav from "../components/layout/MenuNav";
import FooterComponent from "../components/layout/FooterComponent";
import Header from "../components/layout/Header";
import PostShow from "../components/post/PostShow";

const PostPage = () => {
  return (
    <>
      <Header />
      <Banner />
      <MenuNav />
      <PostShow />
      <FooterComponent />
    </>
  );
};

export default PostPage;
