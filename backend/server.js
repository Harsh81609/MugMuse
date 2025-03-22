import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"
import { connectDB } from "./config/db.js";
import productsRoutes from "./routes/products.route.js";
import usersRoutes from "./routes/users.route.js";
import authRoutes from "./routes/auth.router.js";
import paymentRoutes from './routes/payment.router.js';
import adminRoutes from './routes/admin.router.js';
import orderRoutes from './routes/order.route.js';
import cookieParser from "cookie-parser";

dotenv.config({override:false});

console.log("Initial NODE_ENV:", process.env.NODE_ENV);
const app = express();
const __dirname = path.resolve();

app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// To access uploaded image
app.use(
  "/user/profile-image",
  express.static(path.resolve("uploads/users"), {
    setHeaders: function (res, filePath, stat) {
      const extname = path.extname(filePath).toLowerCase();
      if (extname === ".png") {
        res.set("Content-Type", "image/png");
      } else if (extname === ".jpg" || extname === ".jpeg") {
        res.set("Content-Type", "image/jpeg");
      } else if (extname === ".gif") {
        res.set("Content-Type", "image/gif");
      }
    },
  })
);
app.use(
  "/product/image",
  express.static(path.resolve("uploads/products"), {
    setHeaders: function (res, filePath, stat) {
      const extname = path.extname(filePath).toLowerCase();
      if (extname === ".png") {
        res.set("Content-Type", "image/png");
      } else if (extname === ".jpg" || extname === ".jpeg") {
        res.set("Content-Type", "image/jpeg");
      } else if (extname === ".gif") {
        res.set("Content-Type", "image/gif");
      }
    },
  })
);

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/product", productsRoutes);
app.use("/api/user", usersRoutes);

if (process.env.NODE_ENV === "production") {
  const frontend = path.join(__dirname, "frontend", "dist");
  console.log("Serving frontend from: ", frontend);
  console.log("Current working directory:", process.cwd());
  console.log("Resolved __dirname:", __dirname);
  app.use(express.static(frontend));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(frontend, "index.html"), (err) => {
      if (err) {
        console.error("Error in frontend loading: ", err);
        res.status(500).send("Error in loading error");
      }
    });
  });
}

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
  console.log("Node env: ", process.env.NODE_ENV);
  connectDB();
  if (!connectDB) {
    console.log("Connection failed");
  }
}); 