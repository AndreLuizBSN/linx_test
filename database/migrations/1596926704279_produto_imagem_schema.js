'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoImagemSchema extends Schema {
  up () {
    this.create('produto_imagems', (table) => {
      table.increments()
      table.string('produto_id', 80).notNullable()
      table.string('url', 2000).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('produto_imagems')
  }
}

module.exports = ProdutoImagemSchema
