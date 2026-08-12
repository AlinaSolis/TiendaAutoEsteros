// database/migrations/016_create_carrito_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'carrito'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cliente_id').unsigned().notNullable()
        .references('clientes.id').onDelete('CASCADE')
      table.integer('producto_id').unsigned().notNullable()
        .references('productos.id').onDelete('CASCADE')
      table.integer('cantidad').notNullable().defaultTo(1)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.unique(['cliente_id', 'producto_id'], 'unique_cliente_producto')
      table.index(['cliente_id'], 'idx_cliente_id')
      table.index(['producto_id'], 'idx_producto_id')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}