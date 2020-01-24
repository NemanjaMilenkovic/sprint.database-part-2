exports.up = function(knex) {
  // create the 'users' table with three columns
  return knex.schema.createTable("channel_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.integer("channel_id").unsigned();
    t.foreign("channel_id")
      .references("id")
      .inTable("channels");

    t.integer("from_id").unsigned();
    t.foreign("from_id")
      .references("id")
      .inTable("users");

    t.text("message");

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("channel_messages");
};
