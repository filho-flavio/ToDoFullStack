import express from "express";
import dotenv from "dotenv";
import routerUser from "./routes/user.routes.js";
import routerTasks from "./routes/tasks.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import { db } from "./db/connection.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/auth", routerUser);
app.use("/api/tasks-lists", routerTasks);

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
});
