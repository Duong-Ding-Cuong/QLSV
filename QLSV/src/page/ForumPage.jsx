import React from 'react';
import Header from '../components/layout/Header';
import Banner from '../components/layout/Banner';
import MenuNav from '../components/layout/MenuNav';
import FooterComponent from '../components/layout/FooterComponent';
import NewForum from '../components/forum/NewForum';
import ForumData from '../components/forum/ForumData';
import PostData from '../components/post/PostData';
import StudentData from '../components/student/StudentData';

const ForumPage = () => {
  return (
    <>
      <Header />
      <Banner />
      <MenuNav />

      {/* Forum Introduction Section */}
      <section className="forum-intro-section text-center py-6 bg-light rouderd-3 m-5">
        <div className="container">
          <h1 className="fw-bold">Explore Our Forums</h1>
          <p className="text-muted">
            Dive into discussions, share your thoughts, and connect with students from all over. Our forums are the perfect place to learn, grow, and collaborate.
          </p>
        </div>
      </section>


      {/* Forum List Section */}
      <section className="forum-list-section py-4 bg-light">
        <div className="container">
          <NewForum />
         <ForumData />
        </div>
      </section>


      {/* Call-to-Action Section */}
      <section className="cta-section text-center py-5 bg-primary text-white">
        <div className="container">
          <h4 className="fw-bold">Join the Conversation</h4>
          <p>
            Become a part of our growing community. Share your thoughts, ask questions, and connect with like-minded individuals.
          </p>
          <a href="/register" className="btn btn-light btn-lg mt-3">
            Get Started
          </a>
        </div>
      </section>

      {/* Main Content Section */}
      <div className="d-flex container my-4">
        {/* Left Column: Posts */}
        <div className="w-75 pe-3">
          <h4 className="fw-bold mb-3">Latest Posts</h4>
          <PostData />
        </div>


        {/* Right Column: Student Highlights */}
        <div className="w-45 ps-3">
          <h4 className="fw-bold mb-3">Top Contributors</h4>
          <StudentData />
        </div>
      </div>

     

      <FooterComponent />
    </>
  );
};

export default ForumPage;