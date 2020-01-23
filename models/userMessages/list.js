module.exports = (knex, UserMessage) => ({ fromId, toId }) => {
  //how to rewrite as async?
  return knex("user_messages")
    .select(
      "user_messages.id as id",
      "users.username as from",
      "user_messages.message as message",
      "user_messages.sent_at as sent_at",
      "user_messages.to_id as to"
    )
    .from("users")
    .innerJoin("user_messages", "users.id", "=", "user_messages.from_id")
    .whereIn("user_messages.from_id", [toId, fromId])
    .whereIn("user_messages.to_id", [toId, fromId])
    .then((rows) => {
      const messages = rows.map((message) => {
        return new UserMessage(message);
      });
      return messages;
    });
};
