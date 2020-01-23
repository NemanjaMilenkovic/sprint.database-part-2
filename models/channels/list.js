module.exports = (knex, Channel) => {
  //async version
  return async () => {
    const channels = await knex("channels").select();
    const mappedChannels = channels.map((channel) => new Channel(channel));

    return Promise.resolve(mappedChannels);
  };
  /* Original Version
  return () => {
    return knex("channels")
      .select()
      .then((chan) => {
        return chan.map((chan) => {
          return new Channel(chan);
        });
      });
    // return Promise.resolve([]); // fix me!
  };*/
};
