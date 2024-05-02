import bookControllers from '../controllers/bookController';
import express from 'express';
const router = express.Router();
import path from "path";
import multer from 'multer';
import fs from 'fs';

import { checkAdminRole } from '../middlewares/authentication';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the upload folder path
    const uploadFolder = path.resolve(__dirname, '..//../server/public');
        

    // Set the upload folder
    cb(null, uploadFolder);

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }
  },
  filename: (req, file, cb) => {
    // Generate a unique filename based on current timestamp
    const extension = path.extname(file.originalname);
    const timestamp = Date.now();
    const filename = `book-cover-${timestamp}${extension}`;
    cb(null, filename);
  }
});
// Set up multer middleware for file upload

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 20 } });
// Book routes
router.get('/',  bookControllers.getAllBooks);
router.post('/', checkAdminRole,upload.single('coverImage'), bookControllers.createBook); // Apply multer middleware here
router.get('/:id', bookControllers.getBookById);
router.delete('/:id',checkAdminRole, bookControllers.deleteBook);

router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

export default router;
