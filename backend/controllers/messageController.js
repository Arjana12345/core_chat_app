const db = require("../config/db");
const { onlineUsers, getIO } = require("../socket/socket");


const sendMessage = (req, res) => {
  try {
    const senderId = req.user.id;

    const { receiverId, message } = req.body;
    console.log("message=", message);
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
        const receiverSocketId = onlineUsers[receiverId];
        console.log("Receiver ID:", receiverId); 
        console.log( "Receiver Socket:", receiverSocketId );

        if (receiverSocketId) {
          console.log("Running receiver socket ");
          const io = getIO();

          io.to(receiverSocketId).emit(
            "receiveMessage",
            {
              id: result.insertId,
              sender_id: senderId,
              receiver_id: receiverId,
              message, 
              status: "delivered",
            }
          );
        }
        
        console.log("Message sent");
        res.status(201).json({
          message_status: 201,
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

    const receiverId = Number(req.params.receiverId);

    console.log("sender_id =", senderId);
    console.log("receiver_id =", receiverId);

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
          console.log("Messages not found");
          console.log(err);
          return res.status(500).json(err);
        }
        console.log("Message found");
        console.log(result);
        res.status(200).json(result);
      }
    );

  } catch (error) {
    console.log("server error");
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
