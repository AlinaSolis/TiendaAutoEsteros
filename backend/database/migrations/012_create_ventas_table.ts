// database/migrations/012_create_ventas_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'ventas'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cliente_id').unsigned().notNullable()
        .references('clientes.id').onDelete('CASCADE')
      table.integer('usuario_id').unsigned().notNullable()
        .references('usuarios.id').onDelete('CASCADE')
      table.integer('sucursal_id').unsigned().notNullable()
        .references('sucursales.id').onDelete('CASCADE')
      table.integer('metodo_pago_id').unsigned().notNullable()
        .references('metodos_pago.id').onDelete('CASCADE')
      table.string('folio', 50).notNullable().unique()
      table.decimal('subtotal', 10, 2).notNullable()
      table.decimal('descuento', 10, 2).defaultTo(0)
      table.decimal('iva', 10, 2).notNullable()
      table.decimal('total', 10, 2).notNullable()
      table.enum('estado', ['Pendiente', 'Completada', 'Cancelada', 'Reembolsada'])
        .defaultTo('Pendiente')
      table.datetime('fecha_pago').nullable()
      table.text('notas').nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['cliente_id'], 'idx_cliente_id')
      table.index(['usuario_id'], 'idx_usuario_id')
      table.index(['sucursal_id'], 'idx_sucursal_id')
      table.index(['metodo_pago_id'], 'idx_metodo_pago_id')
      table.index(['estado'], 'idx_estado')
      table.index(['folio'], 'idx_folio')
      table.index(['created_at'], 'idx_fecha')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}