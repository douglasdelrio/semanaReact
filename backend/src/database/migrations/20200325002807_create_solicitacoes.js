
exports.up = function(knex) {
  return knex.schema.createTable('solicitacoes', function (table){
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    
    table.string('empresas_id').notNullable();

    table.foreign('empresas_id').references('id').inTable('empresas');

  }); 
};

exports.down = function(knex) {
  return knex.schema.dropTable('solicitacoes');
};
