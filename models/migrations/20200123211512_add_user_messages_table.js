exports.up = function(knex) {
  //gonna try to remove the unused promises...how even to use them?
  return knex.schema.createTable("user_messages", (t) => {
    t.increments().index();

    t.text("message");

    t.integer("to_id").unsigned();
    t.foreign("to_id")
      .references("id")
      .inTable("users");

    t.integer("from_id").unsigned();
    t.foreign("from_id")
      .references("id")
      .inTable("users");

    t.timestamp("sent_at")
      .notNullable()
      .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user_messages");
};
