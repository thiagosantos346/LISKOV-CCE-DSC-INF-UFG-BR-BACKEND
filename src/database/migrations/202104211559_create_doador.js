
exports.up = function(knex) {
  return knex.schema.createTable('doador', function(table){
    table.string('id').primary();
    table.string('nome').notNullable;
    table.string('sobre_nome').notNullable;
    table.string('email').notNullable;
    table.string('telefone').notNullable;
    table.string('codigo_postal').notNullable;
    table.string('cidade').notNullable;
    table.string('sexo').notNullable;
    table.string('tipo_sanguineo').notNullable;
    table.string('qualificacao_doador').notNullable;
    table.string('uf', 2).notNullable;
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('doador');
};
