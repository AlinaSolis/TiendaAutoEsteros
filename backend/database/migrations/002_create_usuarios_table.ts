// database/migrations/002_create_usuarios_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'usuarios'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('rol_id').unsigned().notNullable().references('roles.id').onDelete('CASCADE')
      table.string('nombre', 100).notNullable()
      table.string('apellido', 100).notNullable()
      table.string('email', 255).notNullable().unique()
      table.string('telefono', 20).nullable()
      table.string('password', 255).notNullable()
      table.string('remember_token', 100).nullable()
      table.boolean('activo').defaultTo(true)
      table.datetime('ultimo_login').nullable()
      table.string('foto_perfil', 255).nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['rol_id'], 'idx_rol_id')
      table.index(['email'], 'idx_email')
      table.index(['activo'], 'idx_activo')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}