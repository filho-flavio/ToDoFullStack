import generateToken from "../utils/generateToken.js";
import { db } from "../db/connection.js";

export const signIn = (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);

    const query = "SELECT * FROM users WHERE username = ?";

    // Check if the user exists in the database
    db.query(query, [username], (err, result) => {
      if (err) {
        console.error("Erro ao executar consulta:", err);
        return res.status(500).send("Internal Server Error");
      }

      const userVerified = result[0]; // Obtem o primeiro resultado da consulta

      if (!userVerified) {
        return res.status(401).json({ message: "Invalid user or password." });
      }

      if (userVerified.password !== password) {
        return res.status(401).json({ message: "Invalid password." });
      }

      generateToken(userVerified.id, res);

      res.status(200).json({
        id: userVerified.id,
        username: userVerified.username,
        fullName: userVerified.fullName,
        userProfilePic: userVerified.profilePic,
        backgroundColor: userVerified.backgroundColor,
      });
    });
  } catch (err) {
    console.log(`Error in signin controller: ${err}`);
    return res.status(500).send("Internal Server Error");
  }
};

export const singUp = async (req, res) => {
  try {
    const user = req.body;

    console.log(user);

    // Consulta ao banco de dados para verificar se o usuário já existe
    const [rows] = await db.promise().query(
      "SELECT * FROM users WHERE username = ?",
      [user.username]
    );

    if (rows.length > 0) {
      return res.status(400).json({ error: "User already exists." });
    }

    const query =
      "INSERT INTO users (`fullName`, `username`, `password`, `backgroundColor`) VALUES(?)";

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${user.username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${user.username}`;

    const profilePic = user.gender == "male" ? boyProfilePic : girlProfilePic;

    const backgroundColor = ".color-white";

    const values = [user.fullName, user.username, user.password, backgroundColor];

    const [result] = await db.promise().query(query, [values]);

    if (result && result.insertId) {
      return res.status(201).json({
        id: result.insertId,
        username: user.username,
        fullName: user.fullName,
        userProfilePic: profilePic,
        backgroundColor: backgroundColor,
      });
    } else {
      return res.status(500).json({ error: "Failed to save user." });
    }
  } catch (err) {
    console.log(`Error in signup: ${err}`);
    res.status(500).send("Internal server error");
  }
};


export const signOut = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send("Sign out sucessfully!");
  } catch (error) {
    console.log(`Error in controller sign out: ${error}`);
    res.status(500).send("Error in sign out.");
  }
};
