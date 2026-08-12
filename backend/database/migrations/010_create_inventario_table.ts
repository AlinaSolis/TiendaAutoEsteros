// database/migrations/010_create_inventario_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'inventario'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('producto_id').unsigned().notNullable()
        .references('productos.id').onDelete('CASCADE')
      table.integer('sucursal_id').unsigned().notNullable()
        .references('sucursales.id').onDelete('CASCADE')
      table.integer('cantidad').notNullable().defaultTo(0)
      table.integer('stock_minimo').defaultTo(5)
      table.integer('stock_maximo').defaultTo(100)
      table.string('ubicacion', 100).nullable()
      table.string('lote', 50).nullable()
      table.date('fecha_vencimiento').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.unique(['producto_id', 'sucursal_id'], 'unique_producto_sucursal')
      table.index(['producto_id'], 'idx_producto_id')
      table.index(['sucursal_id'], 'idx_sucursal_id')
      table.index(['cantidad'], 'idx_cantidad')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}