import axios from "axios";
import { UserContextProvider } from "./components/context/UserContext";
import Routes from "./components/routes/Routes";
const App = () => {
  axios.defaults.baseURL = "http://localhost:5000/api/";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
};

export default App;
