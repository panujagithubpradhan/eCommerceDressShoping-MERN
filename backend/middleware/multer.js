// middleware/multer.js
import multer from 'multer';
import path from 'path';

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Get file extension
    cb(null, Date.now() + ext); // Generate a unique filename based on the current timestamp
  }
});

// Create the multer instance with storage configuration
const upload = multer({ storage: storage });

export default upload;
