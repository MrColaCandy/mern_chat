import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./context/UserContext";

import Modal from "./Modal";
import Overlay from "./Overlay";
import Spinner from "./Spinner";
import Toggle from "./Toggle";
import EyeOn from "./icons/EyeOn";
import EyeOff from "./icons/EyeOff";

const Auth = () => {
  const { user, setUser } = useContext(UserContext);
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(true);
  const [modal, setModal] = useState(null);

  const register = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/register", formValues);
      setUser({ ...user, username: data.username, userId: data.userId });
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setModal({
        title: "Failed to Register",
        message: err.response.data.error,
      });
      setIsLoading(false);
    }
  };
  const login = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/login", formValues);
      setUser({ ...user, username: data.username, userId: data.userId });
      setIsLoading(false);
    } catch (err) {
      setModal({ title: "Failed to Login", message: err.message });
      setIsLoading(false);
    }
  };

  const modalFooter = (
    <button
      onClick={() => setModal(null)}
      className="px-5 py-2 rounded-md  bg-blue-500 text-white font-bold"
    >
      OK
    </button>
  );
  return (
    <>
      <Overlay cancel={() => setModal(null)} show={modal} />
      <div className="relative   bg-blue-50 h-screen flex  items-center justify-center ">
        <Modal
          show={modal}
          title={modal?.title}
          body={modal?.message}
          footer={modalFooter}
        />
        <form
          className="w-80 text-center"
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            if (formValues.password === "" || formValues.username === "") {
              setModal({
                title: "Invalid Form",
                message: "Please fill out the form with valid values!",
              });
              return;
            }
            if (error?.passwordErr || error?.usernameErr) {
              setModal({
                title: "Invalid Form",
                message: "Please fill out the form with valid values!",
              });
              return;
            }

            isRegister ? register(e) : login(e);
          }}
        >
          <input
            value={formValues.username}
            onChange={(e) => {
              setFormValues({ ...formValues, username: e.target.value });

              if (formValues.username.length < 3) {
                setError({ ...error, usernameErr: "Username is too short!" });
              } else {
                setError({ ...error, usernameErr: null });
              }
            }}
            onBlur={() => {
              if (formValues.username.length === 0) {
                setError({ ...error, usernameErr: "Username is required!" });
                return;
              }
              if (formValues.username.length < 3)
                setError({ ...error, usernameErr: "Username is too short!" });
            }}
            type="name"
            placeholder="User Name"
            className=" mb-2 p-3 w-80  rounded-sm"
          />
          <div
            className={`${
              error?.usernameErr !== null ? "text-rose-400" : "text-green-500"
            } mb-2  `}
          >
            {error?.usernameErr !== null ? error?.usernameErr : "All Good"}
          </div>

          <div className="relative">
            <input
              value={formValues.password}
              onChange={(e) => {
                setFormValues({ ...formValues, password: e.target.value });

                if (formValues.password.length < 6) {
                  setError({ ...error, passwordErr: "Password is too short!" });
                } else {
                  setError({ ...error, passwordErr: null });
                }
              }}
              onBlur={() => {
                if (formValues.password.length === 0) {
                  setError({ ...error, passwordErr: "Password is required!" });
                  return;
                }
                if (formValues.password.length < 6)
                  setError({ ...error, passwordErr: "Password is too short!" });
              }}
              type={`${showPass ? "text" : "password"}`}
              placeholder="Password"
              className=" mb-2 p-3 w-80 rounded-sm"
            />
            <Toggle
              toggle={() => setShowPass(!showPass)}
              className="absolute text-blue-500 top-3 right-3"
              on={showPass}
              onIcon={<EyeOn />}
              offIcon={<EyeOff />}
            />
          </div>
          <div
            className={`${
              error?.passwordErr !== null ? "text-rose-400" : "text-green-500"
            }  `}
          >
            {error?.passwordErr !== null ? error?.passwordErr : "All Good"}
          </div>

          <div className="  mx-auto text-center mt-3">
            <button
              disabled={isLoading}
              className=" bg-blue-500 flex gap-4 justify-center items-center rounded-sm  text-white p-3 w-80   mx-auto text-center"
            >
              <span>{isRegister ? "REGISTER" : "LOGIN"}</span>
              <span> {isLoading && <Spinner />}</span>
            </button>
            <div className=" my-4">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}
            </div>
            <a
              onClick={() => {
                setIsRegister(!isRegister);
                setError({});
              }}
              className=" font-semibold  "
              href="#"
            >
              {isRegister ? "Login here" : "Register here"}
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
