module.exports = (knex, ChannelMessage) => {
  return async (params) => {
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
      allChannelMessages.map(async (el) => {
        return new ChannelMessage(el);
      })
    );
    return channelMessagesFinal;
  };
};
