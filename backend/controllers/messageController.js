const db = require("../config/db");
const { onlineUsers, getIO } = require("../socket/socket");


const sendMessage = (req, res) => {
  try {
    const senderId = req.user.id;

    const { receiverId, message } = req.body;

    const sql =
      "INSERT INTO messages(sender_id, receiver_id, message) VALUES (?, ?, ?)";

    db.query(
      sql,
      [senderId, receiverId, message],
      (err, result) => {
        if (err) {
          console.log("error- not creating message into DB");
          console.log(err);
          return res.status(500).json(err);
        }

        
        // sending only receiver user
        const receiverSocketId =
          onlineUsers[receiverId];

        if (receiverSocketId) {

          const io = getIO();

          io.to(receiverSocketId).emit(
            "receiveMessage",
            {
              senderId,
              receiverId,
              message,
            }
          );
        }
        
        console.log("Message sent");
        res.status(201).json({
          message: "Message Sent",
          messageId: result.insertId,
        });

      }
    );
  } catch (error) {
    console.log("server error- on message sending");
    console.log(error);
    res.status(500).json(error);
  }
};

const getMessages = (req, res) => {

  try {

    const senderId = req.user.id;

    const receiverId = req.params.receiverId;

    const sql = `
      SELECT * FROM messages
      WHERE
      (sender_id = ? AND receiver_id = ?)
      OR
      (sender_id = ? AND receiver_id = ?)
      ORDER BY created_at ASC
    `;

    db.query(
      sql,
      [
        senderId,
        receiverId,
        receiverId,
        senderId,
      ],
      (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.status(200).json(result);
      }
    );

  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
