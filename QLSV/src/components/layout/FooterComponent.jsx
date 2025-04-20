import React from "react";
import { Layout } from "antd";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";
import "./FooterComponent.css"; // Tệp CSS tùy chỉnh

const { Footer: AntFooter } = Layout;

const FooterComponent = () => {
  return (
    <AntFooter className="custom-footer text-light text-center text-lg-start mt-5">
      <div className="container py-4">
        <div className="row">
          {/* Giới thiệu về chúng tôi */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold">Về Chúng Tôi</h5>
            <p>
              Nhóm nhỏ năng động, nơi sinh viên cùng nhau chia sẻ kiến thức, hỗ trợ lẫn nhau và phát triển bản thân. Tham gia cùng chúng tôi để kết nối và học hỏi!
            </p>
          </div>

          {/* Liên kết nhanh */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold">Liên Kết Nhanh</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">Trang Chủ</a>
              </li>
              <li>
                <a href="/forum" className="text-light text-decoration-none">Diễn Đàn</a>
              </li>
              <li>
                <a href="/account" className="text-light text-decoration-none">Tài Khoản</a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">Liên Hệ</a>
              </li>
            </ul>
          </div>

          {/* Mạng xã hội */}
          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold">Kết Nối Với Chúng Tôi</h5>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <a href="https://facebook.com" className="text-light me-3 fs-4" aria-label="Facebook">
                <FacebookOutlined />
              </a>
              <a href="https://twitter.com" className="text-light me-3 fs-4" aria-label="Twitter">
                <TwitterOutlined />
              </a>
              <a href="https://instagram.com" className="text-light fs-4" aria-label="Instagram">
                <InstagramOutlined />
              </a>
            </div>
          </div>


          <div className="col-lg-3 col-md-6">
            <h5 className="fw-bold">Sinh viên thực hiện</h5>
            <ul className="list-unstyled">
              <li>2100923 - Trịnh Xuân Mạnh</li>
              <li>2101134 - Nguyễn viết Tiến Đạt</li>
              <li>2101117 - Phạm Quang Linh</li>
              <li>2101272 - Phạm Văn Hoàng</li>
              <li>2100974 - Dương Đình Cường</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center py-2">
        <small>© 2025  Đồng hành cùng sinh viên. Đã đăng ký bản quyền.</small>
      </div>
    </AntFooter>
  );
};

export default FooterComponent;
