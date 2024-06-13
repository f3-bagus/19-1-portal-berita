import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import NewsRoute from "./routes/NewsRoute.js";
import CategoryRoute from "./routes/CategoryRoute.js";
import CommentRoute from "./routes/CommentRoute.js";
import ContactMessageRoute from "./routes/ContactMessageRoute.js";
import NotificationRoute from "./routes/NotificationRoute.js";
import SavedNewsRoute from "./routes/SavedNewsRoute.js";

// import db from "./config/database.js";

dotenv.config();

// (async () => {
//     await db.sync();
// })();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);
app.use(NewsRoute);
app.use("/api/Auth", AuthRoute);
app.use("/api", NewsRoute);
app.use("/api", NotificationRoute);
app.use("/api", UserRoute);
app.use("/api", CommentRoute);
app.use("/api", ContactMessageRoute);
app.use("/api", CategoryRoute);
app.use("/api", SavedNewsRoute);
app.use(CategoryRoute);
app.use(CommentRoute);
app.use(NotificationRoute);
app.use(SavedNewsRoute);
app.use(ContactMessageRoute);
app.use(AuthRoute);

app.listen(5000, () => console.log("Server berjalan di port 5000"));
//server.js
