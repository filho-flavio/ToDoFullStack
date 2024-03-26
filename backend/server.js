import express from "express";
import dotenv from "dotenv";
import routerUser from "./routes/user.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import { db } from "./db/connection.js";
import jwt from "jsonwebtoken";
import generateToken from "./utils/generateToken.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", routerUser);

app.get("/signin", (req, res) => {
  res.send("Hello world!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

  db.connect((err) => {
    if (err) {
      console.log(`Error connecting to the database: ${err}`);
    } else {
      console.log("You were connected to database.");
    }
  });

  // const tokenGenerated = generateToken("18251");
  // console.log(tokenGenerated);
  // console.log(jwt.decode(tokenGenerated));
});
