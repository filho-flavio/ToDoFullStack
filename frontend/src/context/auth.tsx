import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext({});

interface User {
  username: string;
  password: string;
}

interface Props {
  children: React.ReactNode;
}

// alguma coisa está gatilhando uma renderização e o signed volta para false

const AuthProvider: React.FC<Props> = ({ children }) => {
  const storedUser = localStorage.getItem("todo-user");
  const [user, setUser] = useState<object | null>(
    storedUser ? JSON.parse(storedUser) : null
  );

  // verificar se o usuário existe no bd
  const signIn = async (userObj: User) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        userObj
      );
      setUser(response.data);
      localStorage.setItem("todo-user", JSON.stringify(response.data));
      localStorage.setItem("todo-sidebar", ".home");
    } catch (error) {
      alert("Usuario não encontrado!");
    }
  };

  const signUp = async (userObj: { type: object }) => {
    try {
      const response = await axios.post("http://localhost:3000", userObj);
      return response.data;
    } catch (error) {
      return alert(`Error in signup: ${error}`);
    }
  };

  const signOut = () => {
    try {
      setUser(null);
      localStorage.setItem("todo-user", "");
    } catch (error) {
      return alert(`Error in signout: ${error}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signUp, signOut, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
