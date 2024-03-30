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

      const userVerified = result[0]; // Obtenha o primeiro resultado da consulta

      if (!userVerified) {
        return res.status(401).json({ message: "Invalid user or password." });
      }

      if (userVerified.password !== password) {
        return res.status(401).json({ message: "Invalid user or password." });
      }

      generateToken(userVerified.id, res);

      res.status(200).json({
        id: userVerified.id,
        username: userVerified.username,
        fullName: userVerified.fullName,
        userProfilePic: userVerified.profilePic,
      });
    });
  } catch (err) {
    console.log(`Error in signin controller: ${err}`);
    return res.status(500).send("Internal Server Error");
  }
};

export const singUp = (req, res) => {
  try {
    const user = req.body;

    const userAlreadyExist = db.query(
      `SELECT name FROM user WHERE name = ${user.name}`
    );

    if (userAlreadyExist)
      return res.status(400).json({ message: "User already exists." });

    const query =
      "INSERT INTO users (`fullName`, `username`, `password`, `profilePic`) VALUES(?)";

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${user.username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${user.username}`;

    const profilePic = user.gender == "male" ? boyProfilePic : girlProfilePic;

    const values = [
      user.fullName,
      user.username,
      user.password,
      user.gender,
      profilePic,
    ];

    const userSaved = db.query(query, [values]);

    if (userSaved) {
      return res.send(201).json("User Created Successfully!");
    }
  } catch (err) {
    console.log(`Error in singup: ${err}`);
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
