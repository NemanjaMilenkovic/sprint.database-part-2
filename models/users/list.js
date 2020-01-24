module.exports = (knex, User) => {
  return async () => {
    const allUsers = await knex("users").select();

    const mappedUsers = allUsers.map((user) => new User(user));
    return mappedUsers;

    //   const allUsersFinal = Promise.all(
    //     allUsers.map(async (user) => {
    //       return new User(user);
    //     })
    //   );
    //   return allUsersFinal;
  };

  // return () => {
  //   return knex("users")
  //     .select()
  //     .then((users) => {
  //       return users.map((user) => new User(user));
  //     });
  //   //return Promise.resolve([]); // fix me!
  // };
};
