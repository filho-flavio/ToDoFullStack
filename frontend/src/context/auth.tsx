import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

interface User {
  username: string;
  password: string;
}

interface UserSignUp {
  fullName: string;
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
      return true;
    } catch (error) {
      alert("Usuário ou senha encorretos!");
      return false;
    }
  };

  const signUp = async (userObj: UserSignUp) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        userObj
      );
      setUser(response.data);
      localStorage.setItem("todo-user", JSON.stringify(response.data));
      localStorage.setItem("todo-sidebar", ".home");
      return response.data;
    } catch (error) {
      return alert(`Error in signup: ${error}`);
    }
  };

  const signOut = () => {
    try {
      const response = axios.post("http://localhost:3000/api/auth/signout");

      setUser(null);
      localStorage.setItem("todo-sidebar", ".home");
      localStorage.removeItem("todo-user");
      return response;
    } catch (error) {
      return alert(`Error in signout: ${error}`);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signUp, signOut, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
//#taskId-38-listId-22