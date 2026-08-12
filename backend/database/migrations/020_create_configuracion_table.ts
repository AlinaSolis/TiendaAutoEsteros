// database/migrations/020_create_configuracion_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'configuracion'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('clave', 100).notNullable().unique()
      table.text('valor').nullable()
      table.string('grupo', 50).nullable()
      table.string('descripcion', 255).nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['clave'], 'idx_clave')
      table.index(['grupo'], 'idx_grupo')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}