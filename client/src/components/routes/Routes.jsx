import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Auth from "../Auth";
import Chat from "../Chat";

const Routes = () => {
  const { user } = useContext(UserContext);

  if (user.username !== "") {
    return <Chat />;
  }
  return <Auth />;
};

export default Routes;
