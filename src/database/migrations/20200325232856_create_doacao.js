
exports.up = function(knex) {
  return knex.schema.createTable('doacao_', function(table){
        table.increments();
        table.string('title').notNullable;
        table.string('description').notNullable;
        table.decimal('value').notNullable;
        
        table.string('ong_id').notNullable;
        table.foreign('ong_id').references('id').inTable('banco_sanguineo');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('doacao_');
};
