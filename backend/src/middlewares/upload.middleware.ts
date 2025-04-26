import multer from "multer";

// Configure storage for temporary files
const storage = multer.diskStorage({
  filename: function (_req, file, cb) {
    // Use original filename for simplicity
    cb(null, file.originalname);
  },
});

// File filter function
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept only images
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

// Setup multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
  },
});

export default upload;