// essa é uma função intermediaria que lida com as requisições HTTP e
// chama a proxima funcao, essa funcao controla acessos a certas rotas

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
  } catch (error) {
    console.log(`Error in protect route: ${error}`);
    return res.status(500).send("Internal server error!");
  }
};

export default protectRoute;
