// database/migrations/011_create_metodos_pago_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'metodos_pago'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 50).notNullable().unique()
      table.string('descripcion', 255).nullable()
      table.boolean('activo').defaultTo(true)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['nombre'], 'idx_nombre')
      table.index(['activo'], 'idx_activo')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}