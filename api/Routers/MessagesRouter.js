const express = require("express");
const Message = require("../models/Message");
const MessagesRouter = express.Router();
MessagesRouter.get(
  "/api/messages/:userId/:selectedUserId",
  (req, res, next) => {
    const userId = req.params.userId;
    const selectedUserId = req.params.selectedUserId;

    Message.find({
      sender: { $in: [userId, selectedUserId] },
      target: { $in: [userId, selectedUserId] },
    })
      .sort({ createdAt: 1 })
      .then((result) => {
        res.json({ result });
      })
      .catch((err) => {
        return next(err);
      });
  }
);
module.exports = MessagesRouter;
