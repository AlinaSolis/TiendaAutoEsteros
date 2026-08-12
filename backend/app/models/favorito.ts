// app/models/favorito.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Cliente from './cliente.js'
import Producto from './producto.js'
export default class Favorito extends BaseModel {
  static table = 'favoritos'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare clienteId: number
  @column()
  declare productoId: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>
  @belongsTo(() => Producto)
  declare producto: BelongsTo<typeof Producto>
}