import express from "express";
import ConnectDB from "./db/ConnectDB.js";
import AdminRouter from "./routes/AdminRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  // To allow requests from client
  origin: ["http://localhost:3000"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

// cors middleware
app.use(cors(corsOptions));

// define port
const port = process.env.PORT || "8000";
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017";

// databse connection
ConnectDB(DATABASE_URL);

// add public folder as static
app.use("/public", express.static("public"));

// JSON middleware
app.use(express.json());

// use cookie
app.use(cookieParser());

// load routes or url path
app.use("/", AdminRouter);

app.listen(port, () => {
  console.log(`Server listining at http://localhost:${port}`);
});
