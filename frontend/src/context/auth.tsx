import React, { createContext, useState } from "react";
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
  const [user, setUser] = useState("null");

  // verificar se o usuário existe no bd
  const signIn = async (userObj: User) => {
    console.log(userObj);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        userObj
      );
      setUser(response.data);
      console.log(response.data);
      return true;
    } catch (error) {
      alert("Usuario não encontrado!");
      return false;
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
    // Implement your sign-out logic here
    
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, signIn, signUp, signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
