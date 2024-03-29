let db = require('../util/database');

function checkConversation(user1, user2, subject) {
    let sql = 'SELECT id FROM conversation WHERE ((user1 = $1 AND user2 = $2) OR (user2 = $1 AND user1 = $2)) AND subject = $3';    
    return db.query(sql, [user1, user2, subject]);
}

function getEmailInfo(convid) {
    let sql = 'select u1.firstname, u1.lastname, u2.email \
    from conversation c \
    join users u1 on c.user1 = u1.id \
    join users u2 on c.user2 = u2.id \
    where c.id = $1';
    return db.query(sql, [convid]);
}

function createConversation(user1, user2, subject) {
    let sql = 'INSERT INTO conversation (user1, user2, subject) VALUES ($1, $2, $3)';
    db.query(sql, [user1, user2, subject]);
}

function createMessage(id, senderid, content) {
    let sql = 'INSERT INTO message (convid, senderid, content, timestamp) \
    values ($1, $2, $3, current_timestamp)';
    db.query(sql, [id, senderid, content]);
}

function conversationList(myID) {
    let sql = 'SELECT c.id, c.subject, \
    u1.firstname as u1first, u1.lastname as u1last, u1.url as u1url,\
    u2.firstname as u2first, u2.lastname as u2last, u2.url as u2url \
    FROM conversation c \
    JOIN users u1 ON c.user1 = u1.id \
    JOIN users u2 ON c.user2 = u2.id \
    WHERE user1 = $1 OR user2 = $1';
    return db.query(sql, [myID]);
}

function msgList(convID) {
    let sql = 'SELECT m.content, m.timestamp, u.firstname, u.lastname, u.url \
    FROM message m \
    JOIN users u ON m.senderid = u.id \
    WHERE convid = $1';
    return db.query(sql, [convID]);
}

module.exports = {
   checkConversation : checkConversation,
   getEmailInfo: getEmailInfo,
   createConversation : createConversation,
   createMessage : createMessage,
   conversationList : conversationList,
   msgList : msgList
}