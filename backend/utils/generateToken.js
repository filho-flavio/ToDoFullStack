import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.SECRET_KEY;

// creating jwt token for user authentication
const generateToken = (userId, res) => {
  // payload(body), signature and header
  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: "15d",
    subject: "1",
  });

  // sending token in a cookie
  res.cookie("jwt", token, {
    maxAge: 36000000,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return token;
};

export default generateToken;
