// database/migrations/004_create_categorias_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'categorias'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 100).notNullable().unique()
      table.string('descripcion', 255).nullable()
      table.string('icono', 100).nullable()
      table.string('color', 50).nullable()
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