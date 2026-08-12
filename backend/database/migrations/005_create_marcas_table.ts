// database/migrations/005_create_marcas_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'marcas'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 100).notNullable().unique()
      table.string('descripcion', 255).nullable()
      table.string('logo', 255).nullable()
      table.string('sitio_web', 255).nullable()
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