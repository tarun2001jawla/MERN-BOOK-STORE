import express, { Application, Request, Response ,Router} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import ejs from 'ejs';
import { checkForAuthentication } from "./middlewares/authentication";
import authRoutes from "./routes/authRoutes";



const staticRouter: Router = express.Router();
staticRouter.use(express.static(path.join(__dirname, '..', 'public')));
// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app: Application = express();
const PORT = process.env.PORT || 5000;
// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));
//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// Database connection
mongoose
  .connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/bookstore", {})
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Routes
app.use("/api/user", authRoutes);

// Route for the home page
staticRouter.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Home Page' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
