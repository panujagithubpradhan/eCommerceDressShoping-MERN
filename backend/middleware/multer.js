// middleware/multer.js
import multer from 'multer';
import path from 'path';

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve('uploads/'));// Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    cb(null, Date.now() + ext); // Generate a unique filename based on the current timestamp
  }
});

// Create the multer instance with storage configuration
const upload = multer({ storage: storage,
  storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.mimetype)) {
            cb(new Error('Only images are allowed!'));
        } else {
            cb(null, true);
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 }
 });

export default upload;
