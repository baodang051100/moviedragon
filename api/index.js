import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import http from "http";

//import router
import authRoute from "./route/auth.js";
import useRoute from "./route/user.js";
import movieRoute from "./route/movie.js";
import listRoute from "./route/list.js";
import myListRoute from "./route/myList.js";

dotenv.config();
const app = express();

app.options("*", cors());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//add router
app.use("/api/auth", authRoute);
app.use("/api/users", useRoute);
app.use("/api/movie", movieRoute);
app.use("/api/lists", listRoute);
app.use("/api/myList", myListRoute);

let PORT = process.env.PORT || 8000;
// const host = "127.0.0.1";
const server = http.createServer(app);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successfully");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
