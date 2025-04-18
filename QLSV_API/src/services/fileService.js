const cloudinary = require("cloudinary").v2;

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadSingleFile = (fileObject) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "qlsv-tbkt/images",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject({
            status: "failed",
            path: null,
            error: error.message,
          });
        } else {
          resolve({
            status: "success",
            path: result.secure_url,
            error: null,
          });
        }
      }
    );

    stream.end(fileObject.data); // Gửi dữ liệu ảnh vào stream
  });
};
module.exports = { uploadSingleFile };