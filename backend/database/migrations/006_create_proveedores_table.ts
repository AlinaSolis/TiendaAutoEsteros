// database/migrations/006_create_proveedores_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'proveedores'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 200).notNullable()
      table.string('rfc', 13).unique().nullable()
      table.string('email', 255).nullable()
      table.string('telefono', 20).nullable()
      table.string('direccion', 255).nullable()
      table.string('ciudad', 100).nullable()
      table.string('estado', 100).nullable()
      table.string('codigo_postal', 10).nullable()
      table.string('pais', 100).defaultTo('México')
      table.string('contacto_nombre', 100).nullable()
      table.string('contacto_telefono', 20).nullable()
      table.string('contacto_email', 255).nullable()
      table.boolean('activo').defaultTo(true)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['nombre'], 'idx_nombre')
      table.index(['rfc'], 'idx_rfc')
      table.index(['activo'], 'idx_activo')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}