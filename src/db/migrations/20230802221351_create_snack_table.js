/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema
      .createTable('products', function (table){
          table.string('categoria');
          table.string('id', 40).primary();
          table.string('produto');
          table.text('imagem');
          table.string('valor');
          table.timestamp('data_atualizacao').defaultTo(knex.fn.now());
      });
};

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.down = function(knex) {
  return knex.schema.dropTable('products');
};