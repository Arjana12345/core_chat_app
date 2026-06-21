const db = require("../config/db");

const createMessage = async (senderId, receiverId, message) => {
  const [result] = await db.query(
    `
  INSERT INTO messages
  (sender_id, receiver_id, message)
  VALUES (?,?,?)
  `,
    [senderId, receiverId, message],
  );

  return result.insertId;
};

const getMessages = async (userId, otherUserId, limit, offset) => {
  const [rows] = await db.query(
    `
 SELECT *
 FROM messages
 WHERE
 (
   sender_id = ?
   AND receiver_id = ?
 )
 OR
 (
   sender_id = ?
   AND receiver_id = ?
 )
 ORDER BY created_at DESC
 LIMIT ? OFFSET ?

 `,
    [userId, otherUserId, otherUserId, userId, limit, offset],
  );

  return rows;
};

module.exports = {
  createMessage,
  getMessages,
};
