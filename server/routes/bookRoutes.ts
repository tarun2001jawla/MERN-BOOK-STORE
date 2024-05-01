import bookControllers from '../controllers/bookController';
import express from 'express';
const router = express.Router();
import { checkAdminRole } from '../middlewares/authentication';



// Book routes
router.get('/', bookControllers.getAllBooks);
router.post('/', bookControllers.createBook);
router.get('/:id', bookControllers.getBookById);
router.delete('/:id',checkAdminRole, bookControllers.deleteBook);

router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
  });
  

export default router;