// app/models/historial_movimiento.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Producto from './producto.js'
export default class HistorialMovimiento extends BaseModel {
  static table = 'historial_movimientos'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare usuarioId: number
  @column()
  declare productoId: number | null
  @column()
  declare tablaAfectada: string | null
  @column()
  declare registroId: number | null
  @column()
  declare tipoMovimiento: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'VENTA' | 'COMPRA' | 'AJUSTE'
  @column()
  declare datosAnteriores: any | null
  @column()
  declare datosNuevos: any | null
  @column()
  declare ip: string | null
  @column()
  declare userAgent: string | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  // Relaciones
  @belongsTo(() => User)
  declare usuario: BelongsTo<typeof User>
  @belongsTo(() => Producto)
  declare producto: BelongsTo<typeof Producto>
}