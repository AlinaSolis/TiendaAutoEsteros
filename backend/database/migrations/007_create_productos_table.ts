// database/migrations/007_create_productos_table.ts
import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 'productos'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('categoria_id').unsigned().notNullable()
        .references('categorias.id').onDelete('CASCADE')
      table.integer('marca_id').unsigned().notNullable()
        .references('marcas.id').onDelete('CASCADE')
      table.string('codigo', 50).notNullable().unique()
      table.string('nombre', 200).notNullable()
      table.text('descripcion').nullable()
      table.decimal('precio_compra', 10, 2).notNullable()
      table.decimal('precio_venta', 10, 2).notNullable()
      table.decimal('precio_oferta', 10, 2).nullable()
      table.integer('stock_minimo').notNullable().defaultTo(5)
      table.integer('stock_maximo').notNullable().defaultTo(100)
      table.decimal('peso', 10, 2).nullable()
      table.string('dimensiones', 100).nullable()
      table.integer('garantia_meses').defaultTo(0)
      table.json('especificaciones').nullable()
      table.boolean('activo').defaultTo(true)
      table.boolean('destacado').defaultTo(false)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
      table.index(['categoria_id'], 'idx_categoria_id')
      table.index(['marca_id'], 'idx_marca_id')
      table.index(['codigo'], 'idx_codigo')
      table.index(['nombre'], 'idx_nombre')
      table.index(['activo'], 'idx_activo')
      table.index(['destacado'], 'idx_destacado')
      table.index(['precio_venta'], 'idx_precio_venta')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}