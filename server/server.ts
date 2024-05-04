import express, { Application, Request, Response ,Router} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from "path";
import { checkForAuthentication } from "./middlewares/authentication";
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import orderRoutes from './routes/orderRoutes'
import cartRoutes from './routes/cartRoutes'
import { CustomRequest } from "./types";
import Books from "./models/Book";



const staticRouter: Router = express.Router();
staticRouter.use(express.static(path.join(__dirname, '..', 'public')));
// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app: Application = express();
const PORT = process.env.PORT || 5000;



//middlewares
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true 
}));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);


// Database connection
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/bookstore", {})
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));

  // app.use('/images', express.static(path.join(__dirname, '..', 'public')));
// Serve the images from the public folder
// app.use(express.static('public'));
app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, 'public', filename);
  res.sendFile(filepath, { root: '' });
});
//Routes
app.use("/api/user", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", cartRoutes);
app.use("/api/showorders", orderRoutes);

app.get('/', async (req:CustomRequest, res:Response) => {
  const allBooks = await Books.find({}).sort({ createdAt: -1 }).populate("title")
     
 
  console.log(req.user);
  res.render('home', {
      user: req.user,
      allBooks : allBooks,
      
      
  });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
