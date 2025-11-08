import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const uploadOnCloudinary = async (FilePath) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader.upload(FilePath);
    fs.unlinkSync(FilePath);
    return uploadResult.secure_url;
  } catch (error) {
    fs.unlinkSync(FilePath);
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadOnCloudinary;
