// database/migrations/009_create_sucursales_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'sucursales'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 100).notNullable()
      table.string('direccion', 255).notNullable()
      table.string('ciudad', 100).notNullable()
      table.string('estado', 100).notNullable()
      table.string('codigo_postal', 10).notNullable()
      table.string('pais', 100).defaultTo('México')
      table.string('telefono', 20).nullable()
      table.string('email', 255).nullable()
      table.string('horario_atencion', 255).nullable()
      table.decimal('latitud', 10, 8).nullable()
      table.decimal('longitud', 11, 8).nullable()
      table.boolean('activo').defaultTo(true)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['nombre'], 'idx_nombre')
      table.index(['activo'], 'idx_activo')
      table.index(['ciudad'], 'idx_ciudad')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}