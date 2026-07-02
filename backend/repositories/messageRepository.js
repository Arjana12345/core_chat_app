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

const getMessages = async (userId, otherUserId, limit, lastId) => {
  // console.log("retrieve before id =", lastId);
  let sql;
  let values;
  if (!lastId) {
    sql = `
 SELECT *
 FROM messages
 WHERE (
 (
   sender_id = ?
   AND receiver_id = ?
 )
 OR
 (
   sender_id = ?
   AND receiver_id = ?
  ) 
)
 ORDER BY created_at DESC 
 LIMIT ?

 `;
    values = [userId, otherUserId, otherUserId, userId, limit];
  } else {
    sql = `
 SELECT *
 FROM messages
 WHERE (
 (
   sender_id = ?
   AND receiver_id = ?
 )
 OR
 (
   sender_id = ?
   AND receiver_id = ?
  ) 
)
  AND id < ?
 ORDER BY created_at DESC 
 LIMIT ?

 `;
    values = [userId, otherUserId, otherUserId, userId, lastId, limit];
  }

  // console.log("=================start======================");
  // console.log("limit =", limit, "lastId =", lastId);
  // console.log("query = ", sql);
  // console.log("values = ", values);

  // Run sql
  const [rows] = await db.query(sql, values);

  // console.log("Retrieved messages:", rows);
  // console.log("=================end======================");
  return rows;
};

module.exports = {
  createMessage,
  getMessages,
};
