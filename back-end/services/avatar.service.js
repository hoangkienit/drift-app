const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const fs = require('fs');
const getMessage = require("../utils/getMessage");

const User = require("../models/user.model");

class AvatarService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async processAndUploadAvatar(file, oldProfileImgUri) {
  try {
    const resizedImageBuffer = await sharp(file.path)
      .resize(300, 300)
      .toFormat("png")
      .toBuffer();
      
    // Extract public ID from old avatar URL (if exists)
    let publicId = null;
    if (oldProfileImgUri) {
      const matches = oldProfileImgUri.match(/\/([^/]+)\.png$/);
      if (matches) {
        publicId = `uploads/${matches[1]}`; // Extract public ID
      }
    }

    // Upload image using a promise
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "uploads", public_id: `avatar_${Date.now()}` },
        (error, result) => {
          if (error) return reject(new Error(error.message));
          if (!result || !result.secure_url) return reject(new Error("Upload failed with no result."));
          resolve(result.secure_url);
        }
      );

      uploadStream.end(resizedImageBuffer);
    });
      
    // Delete the old avatar if it exists
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      console.log("Old avatar deleted from Cloudinary:", publicId);
    }


    // Delete file AFTER returning the secure_url
    setTimeout(async () => {
      try {
        await fs.promises.unlink(file.path);
        console.log("File deleted successfully.");
      } catch (unlinkError) {
        console.error("Failed to delete file:", unlinkError.message);
      }
    }, 1000);

    return cloudinaryResponse;

  } catch (error) {
    throw new Error("Error processing the image: " + error.message);
  }
}



}

module.exports = new AvatarService();

