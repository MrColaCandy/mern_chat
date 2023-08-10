import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "./context/UserContext";
import axios from "axios";

import Users from "./Users";
import MessageBox from "./MessageBox";

const Chat = () => {
  const [ws, setWs] = useState(null);
  const { user: _user, setUser: _setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [online, setOnline] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageBoxEnd = useRef();

  useEffect(() => {
    connectToWs();
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages]);
  useEffect(() => {
    getSelectedMessages();
  }, [selectedUserId]);

  useEffect(() => {
    getUsers();
  }, [online]);
  return (
    <div className=" relative flex h-screen">
      <Users
        username={_user.username}
        setSelectedUserId={setSelectedUserId}
        selectedUserId={selectedUserId}
        logout={logout}
        users={users}
      />
      <MessageBox
        sendFile={sendFile}
        sendMessage={sendMessage}
        selectedUserId={selectedUserId}
        message={message}
        messages={messages}
        messageBoxEnd={messageBoxEnd}
        setMessage={setMessage}
      />
    </div>
  );

  //functions//
  function handleMessageEvent(e) {
    const data = JSON.parse(e.data);

    if ("online" in data) {
      setOnline(() => {
        return [...Object.values(data.online)];
      });
    } else if ("message" in data) {
      getSendedMessage(data);
    }
  }
  function getSendedMessage(data) {
    setMessages((prev) => {
      return [...prev, { ...data, isOurs: false }];
    });
  }
  function getSelectedMessages() {
    if (!selectedUserId) return;
    console.log(`/messages/${_user.userId}/${selectedUserId}`);
    axios
      .get(`/messages/${_user.userId}/${selectedUserId}`)
      .then(({ data }) => {
        const dbMessages = [...data.result];
        dbMessages.forEach((m) => {
          if (m.sender === _user.userId) {
            m["isOurs"] = true;
          } else {
            m["isOurs"] = false;
          }
        });
        console.log(...dbMessages);
        setMessages([...dbMessages]);
      })
      .catch((err) => console.log(err.message));
  }
  function scrollToEnd() {
    messageBoxEnd?.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
  function connectToWs() {
    const ws = new WebSocket("ws://localhost:5000");
    ws.addEventListener("message", handleMessageEvent);

    ws.addEventListener("close", (code) => {
      if (code === 1000) {
        return;
      }
      connectToWs();
    });
    setWs(ws);
  }
  function logout() {
    _setUser({
      userId: "",
      username: "",
    });
    localStorage.setItem("token", "");
    ws.close(1000);
    setWs(null);
    axios
      .get("/logout")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  function getUsers() {
    const users = [];
    axios
      .get("/users")
      .then((res) =>
        res.data.result.forEach((user) => {
          if (online.find((u) => u.userId === user._id)) {
            user["online"] = true;
          } else {
            user["online"] = false;
          }
          if (user._id !== _user.userId) users.push(user);
          users.sort((y, x) => {
            return Number(x.online) - Number(y.online);
          });

          setUsers(users);
        })
      )
      .catch((err) => console.log(err.message));
  }
  function sendFile(e) {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      sendMessage(null, {
        name: e.target.files[0].name,
        data: reader.result,
      });
    };
  }
  function sendMessage(message, file = null) {
    ws.send(JSON.stringify({ message, target: selectedUserId, file }));
    setMessages([
      ...messages,
      {
        message,
        _id: Date.now(),
        target: selectedUserId,
        file: file ? file.name : null,
        isOurs: true,
      },
    ]);

    setMessage("");
  }
};

export default Chat;
