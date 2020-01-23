module.exports = (knex, UserMessage) => {
  //How to rewrite as an async function?
  return ({ fromId, toId, message }) => {
    return knex("user_messages")
      .insert({
        from_id: fromId,
        to_id: toId,
        message,
      })
      .then(() => {
        return knex("user_messages")
          .select(
            "user_messages.id as id",
            "users.username as from",
            "user_messages.message as message",
            "user_messages.sent_at as sent_at",
            "user_messages.to_id as to"
          )
          .from("users")
          .innerJoin("user_messages", "users.id", "=", "user_messages.from_id");
      })
      .then((rows) => {
        const messages = rows.map((message) => new UserMessage(message));
        return messages;
      });
  };
};
