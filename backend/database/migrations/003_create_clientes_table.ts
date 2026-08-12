// database/migrations/003_create_clientes_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'clientes'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('usuario_id').unsigned().unique().nullable()
        .references('usuarios.id').onDelete('SET NULL')
      table.string('nombre', 100).notNullable()
      table.string('apellido', 100).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('telefono', 20).nullable()
      table.string('direccion', 255).nullable()
      table.string('ciudad', 100).nullable()
      table.string('estado', 100).nullable()
      table.string('codigo_postal', 10).nullable()
      table.string('pais', 100).defaultTo('México')
      table.string('rfc', 13).nullable()
      table.date('fecha_nacimiento').nullable()
      table.enum('genero', ['M', 'F', 'Otro']).nullable()
      table.string('foto', 255).nullable()
      table.integer('puntos').defaultTo(0)
      table.string('nivel', 50).defaultTo('Bronce')
      table.boolean('activo').defaultTo(true)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['email'], 'idx_email')
      table.index(['telefono'], 'idx_telefono')
      table.index(['activo'], 'idx_activo')
      table.index(['nivel'], 'idx_nivel')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}