// app/models/imagen_producto.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Producto from './producto.js'
export default class ImagenProducto extends BaseModel {
  static table = 'imagenes_productos'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare productoId: number
  @column()
  declare imagenUrl: string
  @column()
  declare esPrincipal: boolean
  @column()
  declare orden: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @belongsTo(() => Producto)
  declare producto: BelongsTo<typeof Producto>
}