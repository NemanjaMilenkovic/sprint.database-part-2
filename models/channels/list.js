module.exports = (knex, Channel) => {
  return () => {
    return knex("channels")
      .select()
      .then((chan) => {
        return chan.map((chan) => {
          return new Channel(chan);
        });
      });
    // return Promise.resolve([]); // fix me!
  };
};
