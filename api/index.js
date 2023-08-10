const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const fs = require("fs");
const ws = require("ws");

const Message = require("./models/Message");

const AuthRouter = require("./Routers/AuthRouter");
const UserRouter = require("./Routers/UserRouter");
const MessagesRouter = require("./Routers/MessagesRouter");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/uploads/", express.static(__dirname + "/uploads/"));

app.use(AuthRouter);
app.use(UserRouter);
app.use(MessagesRouter);
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err.message);
  }
  res.status(err.code).json({ error: err.message });
});
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    const server = app.listen(5000);
    console.log("Database connected!");
    wss = new ws.WebSocketServer({ server });
    wss.on("connection", (connection, req) => {
      function tellEveryone() {
        [...wss.clients].forEach((client) => {
          client.send(
            JSON.stringify({
              online: [...wss.clients].map((c) => ({
                username: c.username,
                userId: c.userId,
              })),
            })
          );
        });
      }

      connection.isAlive = true;
      connection.timer = setInterval(() => {
        connection.deathTimer = setTimeout(() => {
          connection.isAlive = false;
          connection.close();
          tellEveryone();
          clearInterval(connection.timer);
        }, 1000);
        connection.ping();
      }, 5000);

      cookies = req.headers.cookie;
      if (!cookies) return;
      token = cookies
        .split(";")
        .find((str) => str.startsWith("token="))
        ?.split("=")[1];
      if (!token) return;
      const result = jwt.verify(token, process.env.SECRET_KEY);
      connection.userId = result.userId;
      connection.username = result.username;

      connection.on("message", (data) => {
        data = JSON.parse(data.toString());
        const { message, target, file } = data;

        if (file && target) {
          const path = __dirname + "/uploads/" + file.name;
          const data = file.data.replace(/^data:image\/\w+;base64,/, "");
          const buffer = Buffer.from(data, "base64");
          fs.writeFileSync(path, buffer);
        }
        if ((message || file) && target) {
          Message.create({
            sender: connection.userId,
            target,
            message,
            file: file ? file.name : null,
          })
            .then((m) => {
              [...wss.clients]
                .filter((c) => c.userId === target)
                .forEach((c) => {
                  c.send(
                    JSON.stringify({
                      message,
                      target,
                      _id: m._id,
                      sender: m.sender,
                      file: file ? file.name : null,
                    })
                  );
                });
            })
            .catch((err) => console.log(err.message));
        }
      });

      tellEveryone();
    });
  })
  .catch((err) => console.log(err.message));
