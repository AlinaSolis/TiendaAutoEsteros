// database/migrations/013_create_detalle_ventas_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'detalle_ventas'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('venta_id').unsigned().notNullable()
        .references('ventas.id').onDelete('CASCADE')
      table.integer('producto_id').unsigned().notNullable()
        .references('productos.id').onDelete('CASCADE')
      table.integer('cantidad').notNullable()
      table.decimal('precio_unitario', 10, 2).notNullable()
      table.decimal('descuento_unitario', 10, 2).defaultTo(0)
      table.decimal('total', 10, 2).notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['venta_id'], 'idx_venta_id')
      table.index(['producto_id'], 'idx_producto_id')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}