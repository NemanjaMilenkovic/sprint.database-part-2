module.exports = (knex, UserMessage) => {
  return async ({ fromId, toId }) => {
    console.log(fromId);
    console.log(toId);
    const allUserMessages = await knex("user_messages")
      .join("users", "user_messages.from_id", "users.id")
      .whereIn("user_messages.from_id", [fromId, toId])
      .whereIn("user_messages.to_id", [toId, fromId])
      .select(
        "user_messages.id as id",
        "users.username as from",
        "user_messages.message as message",
        "user_messages.sent_at as sent_at",
        "user_messages.to_id as to"
      );

    const userMessagesFinal = await Promise.all(
      allUserMessages.map(async (el) => {
        return new UserMessage(el);
      })
    );
    //console.log(userMessagesFinal);
    return userMessagesFinal;
  };
};
