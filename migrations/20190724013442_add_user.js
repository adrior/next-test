exports.up = function(knex) {
  return knex.schema.createTable("user", t => {
    t.increments();
    t.string("user_name");
    t.string("display_name");
    t.string("facebook_id");
    t.string("email");
    t.timestamp("registered").default(knex.fn.now());
    t.timestamp("last_visit").default(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user");
};
