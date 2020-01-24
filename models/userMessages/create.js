module.exports = (knex, UserMessage) => {
  return async ({ fromId, toId, message }) => {
    await knex("user_messages").insert({
      to_id: toId,
      from_id: fromId,
      message,
    });

    const allUserMessages = await knex("user_messages")
      .join("users", "users.id", "=", "user_messages.from_id")
      .select(
        "user_messages.id as id",
        "users.username as from",
        "user_messages.message as message",
        "user_messages.sent_at as sent_at",
        "user_messages.to_id as to"
      );

    const userMessagesFinal = await Promise.all(
      allUserMessages.map(async (message) => {
        return new UserMessage(message);
      })
    );

    console.log(userMessagesFinal);
    return userMessagesFinal;
  };
};
