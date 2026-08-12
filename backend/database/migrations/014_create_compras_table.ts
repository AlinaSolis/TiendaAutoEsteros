// database/migrations/014_create_compras_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'compras'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('proveedor_id').unsigned().notNullable()
        .references('proveedores.id').onDelete('CASCADE')
      table.integer('usuario_id').unsigned().notNullable()
        .references('usuarios.id').onDelete('CASCADE')
      table.integer('sucursal_id').unsigned().notNullable()
        .references('sucursales.id').onDelete('CASCADE')
      table.string('folio', 50).notNullable().unique()
      table.decimal('subtotal', 10, 2).notNullable()
      table.decimal('iva', 10, 2).notNullable()
      table.decimal('total', 10, 2).notNullable()
      table.enum('estado', ['Pendiente', 'Recibida', 'Cancelada'])
        .defaultTo('Pendiente')
      table.datetime('fecha_entrega').nullable()
      table.text('notas').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['proveedor_id'], 'idx_proveedor_id')
      table.index(['usuario_id'], 'idx_usuario_id')
      table.index(['sucursal_id'], 'idx_sucursal_id')
      table.index(['estado'], 'idx_estado')
      table.index(['folio'], 'idx_folio')
      table.index(['created_at'], 'idx_fecha')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}