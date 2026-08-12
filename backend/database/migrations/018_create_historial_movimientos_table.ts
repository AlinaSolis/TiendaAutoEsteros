// database/migrations/018_create_historial_movimientos_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'historial_movimientos'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('usuario_id').unsigned().notNullable()
        .references('usuarios.id').onDelete('CASCADE')
      table.integer('producto_id').unsigned().nullable()
        .references('productos.id').onDelete('SET NULL')
      table.string('tabla_afectada', 50).nullable()
      table.integer('registro_id').nullable()
      table.enum('tipo_movimiento', [
        'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT',
        'VENTA', 'COMPRA', 'AJUSTE'
      ]).notNullable()
      table.json('datos_anteriores').nullable()
      table.json('datos_nuevos').nullable()
      table.string('ip', 45).nullable()
      table.string('user_agent', 255).nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.index(['usuario_id'], 'idx_usuario_id')
      table.index(['producto_id'], 'idx_producto_id')
      table.index(['tipo_movimiento'], 'idx_tipo_movimiento')
      table.index(['created_at'], 'idx_fecha')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}