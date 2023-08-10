import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useJwt } from "react-jwt";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState({ username: "", userId: "" });

  const { decodedToken } = useJwt(localStorage.getItem("token"));
  if (decodedToken) {
    user.userId = decodedToken.userId;
    user.username = decodedToken.username;
  }
  useEffect(() => {
    getTokenData("/profile");
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );

  function getTokenData(url) {
    axios
      .get(url)
      .then(({ data }) => {
        setUser({
          ...user,
          username: data.result.username,
          userId: data.result.userId,
        });
        localStorage.setItem("token", data.token);
      })
      .catch((err) => console.log(err.message));
  }
}
