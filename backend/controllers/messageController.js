const db = require("../config/db");

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

module.exports = {
  sendMessage,
};
