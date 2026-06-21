const { onlineUsers, getIO } = require("../socket/socket");
const messageService = require("../services/messageService");
/*
const sendMessage = (req, res) => {
  try {
    const senderId = req.user.id;

    const { receiverId, message } = req.body;
    console.log("message=", message);
    const sql =
      "INSERT INTO messages(sender_id, receiver_id, message) VALUES (?, ?, ?)";

    db.query(sql, [senderId, receiverId, message], (err, result) => {
      if (err) {
        console.log("error- not creating message into DB");
        console.log(err);
        return res.status(500).json(err);
      }

      // sending only receiver user
      const receiverSocketId = onlineUsers[receiverId];
      console.log("Receiver ID:", receiverId);
      console.log("Receiver Socket:", receiverSocketId);

      if (receiverSocketId) {
        console.log("Running receiver socket ");
        const io = getIO();

        io.to(receiverSocketId).emit("receiveMessage", {
          id: result.insertId,
          sender_id: senderId,
          receiver_id: receiverId,
          message,
          status: "delivered",
        });
      }

      console.log("Message sent");
      res.status(201).json({
        message_status: 201,
        messageId: result.insertId,
      });
    });
  } catch (error) {
    console.log("server error- on message sending");
    console.log(error);
    res.status(500).json(error);
  }
};
*/
/*
const getMessages = (req, res) => {
  try {
    const senderId = req.user.id;

    const receiverId = Number(req.params.receiverId);

    console.log("sender_id =", senderId);
    console.log("receiver_id =", receiverId);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const sql = `
      SELECT * FROM messages
      WHERE
      (sender_id = ? AND receiver_id = ?)
      OR
      (sender_id = ? AND receiver_id = ?)
      ORDER BY created_at DESC LIMIT ? OFFSET ?
    `;

    db.query(
      sql,
      [senderId, receiverId, receiverId, senderId, limit, offset],
      (err, result) => {
        if (err) {
          console.log("Messages not found");
          console.log(err);
          return res.status(500).json(err);
        }
        console.log("Message found");
        console.log(result);
        res.status(200).json(result.reverse());
      },
    );
  } catch (error) {
    console.log("server error");
    console.log(error);
    res.status(500).json(error);
  }
};
*/

const sendMessage = async (req, res) => {
  const senderId = req.user.id;

  const { receiverId, message } = req.body;
  const insertedId = await messageService.sendMessage({
    senderId,
    receiverId,
    message,
  });

  // sending only receiver user
  const receiverSocketId = onlineUsers[receiverId];
  console.log("Receiver ID:", receiverId);
  console.log("Receiver Socket:", receiverSocketId);

  if (receiverSocketId) {
    console.log("Running receiver socket ");
    const io = getIO();

    io.to(receiverSocketId).emit("receiveMessage", {
      id: insertedId,
      sender_id: senderId,
      receiver_id: receiverId,
      message,
      status: "delivered",
    });
  }

  console.log("Message sent");
  res.status(201).json({
    message_status: 201,
    messageId: insertedId,
  });
};

const getMessages = async (req, res) => {
  const senderId = req.user.id;

  const receiverId = Number(req.params.receiverId);

  console.log("sender_id =", senderId);
  console.log("receiver_id =", receiverId);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const messages = await messageService.fetchMessages({
    userId: senderId,
    otherUserId: receiverId,
    page,
    limit,
  });

  res.status(200).json(messages);
};

module.exports = {
  sendMessage,
  getMessages,
};
