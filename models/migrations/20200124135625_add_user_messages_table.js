exports.up = function(knex, Promise) {
  return knex.schema.createTable("user_messages", (t) => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.integer("from_id").unsigned();
    t.foreign("from_id")
      .references("id")
      .inTable("users");

    t.integer("to_id").unsigned();
    t.foreign("to_id")
      .references("id")
      .inTable("users");

    t.text("message");

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("user_messages");
};
