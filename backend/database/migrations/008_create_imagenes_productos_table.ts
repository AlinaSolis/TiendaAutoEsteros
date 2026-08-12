// database/migrations/008_create_imagenes_productos_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'imagenes_productos'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('producto_id').unsigned().notNullable()
        .references('productos.id').onDelete('CASCADE')
      table.string('imagen_url', 255).notNullable()
      table.boolean('es_principal').defaultTo(false)
      table.integer('orden').defaultTo(0)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['producto_id'], 'idx_producto_id')
      table.index(['es_principal'], 'idx_es_principal')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}