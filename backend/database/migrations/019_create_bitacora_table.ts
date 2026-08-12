// database/migrations/019_create_bitacora_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'bitacora'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('usuario_id').unsigned().nullable()
        .references('usuarios.id').onDelete('SET NULL')
      table.string('accion', 100).notNullable()
      table.text('descripcion').nullable()
      table.string('tabla', 50).nullable()
      table.integer('registro_id').nullable()
      table.string('ip', 45).nullable()
      table.string('user_agent', 255).nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.index(['usuario_id'], 'idx_usuario_id')
      table.index(['accion'], 'idx_accion')
      table.index(['created_at'], 'idx_fecha')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}