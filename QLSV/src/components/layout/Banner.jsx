import React from "react";
import { Carousel } from "antd";
import "./Banner.css";

const images = [
  {
    src: "https://marketingai.mediacdn.vn/wp-content/uploads/2018/06/Banner-Ad-Design-Examples-770x405.png",
    alt: "Beautiful mountain landscape at sunrise",
  },
  {
    src: "https://lambanner.com/wp-content/uploads/2016/09/lambanner-thiet-ke-banner.jpg",
    alt: "Serene lake surrounded by trees",
  },
  {
    src: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/02/tim-hinh-anh-dep.jpg",
    alt: "Snow-covered mountain peaks under a clear sky",
  },
];

const Banner = () => {
  return (
    <section className="container-fluid px-0" aria-label="Image Carousel">
      <Carousel autoplay>
        {images.map((img, index) => (
          <div key={index} className="banner-item">
            <img
              src={img.src}
              alt={img.alt}
              className="img-fluid"
              loading="lazy"
            />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default Banner;