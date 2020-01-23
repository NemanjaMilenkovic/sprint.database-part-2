module.exports = (knex, ChannelMessage) => {
  return async ({ channelId }) => {
    //this is async so we can use async/await. I'll have to go through and change everything so I don't have those annoying unused promises.
    const allChannelMessages = await knex("channel_messages")
      .join("channels", "channel_messages.channel_id", "channels.id")
      .join("users", "channel_messages.from_id", "users.id")
      .where({ channel_id: channelId })
      .select(
        "channel_messages.*", //* is the same as in SQL
        "channels.name as to", //e.g. "To general"
        "users.username as from" //e.g. from rp-3
      );

    const channelMessagePromises = await Promise.all(
      allChannelMessages.map(async (message) => {
        return new ChannelMessage(message);
      })
    );
    return channelMessagePromises;
  };
};
