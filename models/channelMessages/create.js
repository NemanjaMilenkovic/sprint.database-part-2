module.exports = (knex, ChannelMessage) => {
  return async ({ fromId, channelId, message }) => {
    await knex("channel_messages").insert({
      from_id: fromId,
      channel_id: channelId,
      message,
    });

    const allChannelMessages = await knex("channel_messages")
      .join("channels", "channel_messages.channel_id", "channels.id")
      .join("users", "channel_messages.from_id", "users.id")
      .where({ channel_id: channelId })
      .select(
        "channel_messages.*",
        "channels.name as to",
        "users.username as from"
      );

    //I found this to be helpful: https://dev.to/jamesliudotcc/how-to-use-async-await-with-map-and-promise-all-1gb5
    //I'm also watching this: https://www.youtube.com/watch?v=CRq58VmlpQU&list=LL1UaSwA2t2-ZepvTWqNEUjA&index=3&t=0s

    const channelMessagesFinal = await Promise.all(
      allChannelMessages.map(async (message) => {
        return new ChannelMessage(message);
      })
    );

    return channelMessagesFinal;
  };
};

//Flag: need to find out how to async this
