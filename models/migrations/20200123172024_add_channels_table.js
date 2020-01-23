exports.up = function(knex) {
  //create channels table with two columns
  return knex.schema.createTable("channels", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("name", 15) // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it
  });
};

exports.down = function(knex) {
  // undo this migration by destroying the 'channels' table
  return knex.schema.dropTable("channels");
};
