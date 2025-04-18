import React from "react";
import { Carousel } from "antd";
import "./Banner.css";

const images = [
  {
    src: "https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202205/Images/lien-5-20220508111322-e.jpg",
    alt: "Beautiful mountain landscape at sunrise",
  },
  {
    src: "https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202209/Images/dsc01747jpg-20220911054933-e.jpg",
    alt: "Serene lake surrounded by trees",
  },
  {
    src: "https://media.viu.edu.vn/Media/2_TSVIU/FolderFunc/202503/Images/11-20250304093745-e.jpg",
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