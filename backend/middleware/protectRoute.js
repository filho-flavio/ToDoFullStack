// this is function is a middleware, that's a intermediate function process the data before send to other functions

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../db/connection.js";

dotenv.config();

const protectRoute = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).send("Unauthorized - No Token Provided");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).send("Unauthorized - Invalid Token");
    }

    const q = "SELECT users WHERE id = ?";

    const user = db.query(q, [req.user.id]);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
