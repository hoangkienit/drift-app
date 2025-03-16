const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const fs = require('fs');
const getMessage = require("../utils/getMessage");

const User = require("../models/user.model");

class ImageService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  /**
   * Process and upload images for different entities
   * @param {Object} file - Uploaded file object
   * @param {String} entityType - "user_avatar", "restaurant_avatar", "restaurant_cover", "restaurant_food"
   * @param {String} oldImageUrl - Previous image URL (optional)
   */

  async processAndUploadAvatar(file, entityType, oldProfileImgUri) {
    try {

      let folder = '';
    
      if (entityType === "user_avatar") {
        folder = "uploads/user_avatar";
      } else if (entityType === "restaurant_avatar") {
        folder = `uploads/restaurant_avatar`;
      } else if (entityType === "restaurant_food") {
        folder = `uploads/restaurant_food`;
      } else if (entityType === "restaurant_cover") {
        folder = `uploads/restaurant_cover`;
        imageSize = { width: 1200, height: 600 }; // Larger size for cover images
      } else {
        throw new Error("Invalid entity type");
      }
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
        { folder: folder, public_id: `avatar_${Date.now()}` },
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
    }, 2000);

    return cloudinaryResponse;

  } catch (error) {
    throw new Error("Error processing the image: " + error.message);
  }
}



}

module.exports = new ImageService();

