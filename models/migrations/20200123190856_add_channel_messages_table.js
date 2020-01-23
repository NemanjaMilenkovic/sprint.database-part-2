exports.up = function(knex, Promise) {
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

    t.text("message"); //see : https://stackoverflow.com/questions/3354330/difference-between-string-and-text-in-rails

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("channel_messages");
};
