module.exports = (knex, ChannelMessage) => {
  return async (params) => {
    await knex("channel_messages").insert({
      from_id: params.fromId,
      channel_id: params.channelId,
      message: params.message,
    });

    const allChannelMessages = await knex("channel_messages")
      .join("channels", "channel_messages.channel_id", "=", "channels.id")
      .join("users", "channel_messages.from_id", "users.id")
      .where({ channel_id: params.channelId })
      .select(
        "channel_messages.*",
        "channels.name as to",
        "users.username as from"
      );
    const channelMessagesFinal = await Promise.all(
      allChannelMessages.map(async (message) => {
        return new ChannelMessage(message);
      })
    );
    return channelMessagesFinal;
  };
};
