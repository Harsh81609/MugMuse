import multer from 'multer';
import path from 'path';

// Utility function to sanitize the filename by replacing spaces with underscores
const sanitizeFilename = (filename) => {
  return filename.replace(/\s+/g, '_');
};

// Storage configuration for user image upload
const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/users'); // Store user images in 'uploads/users'
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = sanitizeFilename(file.originalname);
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
    cb(null, uniqueFilename); // Generate unique filename for user image
  }
});

// Storage configuration for product image upload
const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/products'); // Store product images in 'uploads/products'
  },
  filename: (req, file, cb) => {
    const sanitizedFilename = sanitizeFilename(file.originalname);
    const uniqueFilename = `${Date.now()}-${sanitizedFilename}`;
    cb(null, uniqueFilename); // Generate unique filename for product image
  }
});

// File type filter (only image files allowed)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, or JPG are allowed.'));
  }
};

// Multer middleware for user image upload
const uploadUser = multer({
  storage: userStorage,
  fileFilter: fileFilter
});

// Multer middleware for product image upload
const uploadProduct = multer({
  storage: productStorage,
  fileFilter: fileFilter
});

export { uploadUser, uploadProduct };
