module.exports = (knex, User) => {
  /* Original version
  return () => {
    return knex("users")
      .select()
      .then((users) => {
        return users.map((user) => new User(user));
      });
  };*/

  //async version
  return async () => {
    const users = await knex("users").select();
    const mappedUsers = users.map((user) => new User(user));

    return Promise.resolve(mappedUsers);
  };
};
