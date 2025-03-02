const multer = require('multer');

class UploadMiddleware {
  static upload = multer({
    dest: 'uploads/', // Temporary folder before processing
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB file size limit
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only JPG, JPEG, and PNG images are allowed!'), false);
      }
      cb(null, true);
    },
  });
}

module.exports = UploadMiddleware;
