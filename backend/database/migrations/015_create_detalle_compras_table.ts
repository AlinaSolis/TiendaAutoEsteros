// database/migrations/015_create_detalle_compras_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'detalle_compras'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('compra_id').unsigned().notNullable()
        .references('compras.id').onDelete('CASCADE')
      table.integer('producto_id').unsigned().notNullable()
        .references('productos.id').onDelete('CASCADE')
      table.integer('cantidad').notNullable()
      table.decimal('precio_unitario', 10, 2).notNullable()
      table.decimal('total', 10, 2).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['compra_id'], 'idx_compra_id')
      table.index(['producto_id'], 'idx_producto_id')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}