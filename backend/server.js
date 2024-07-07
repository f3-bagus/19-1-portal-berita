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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://fe-msib-6-portal-berita-01.educalab.id");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://fe-msib-6-portal-berita-01.educalab.id"]
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.send(`<h1> API BERITA </h1>
    <p>SELAMAT DATANG DI PROJECT KITA</p>`);
});

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

//server.js
