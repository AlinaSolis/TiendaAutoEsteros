// app/models/bitacora.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
export default class Bitacora extends BaseModel {
  static table = 'bitacora'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare usuarioId: number | null
  @column()
  declare accion: string
  @column()
  declare descripcion: string | null
  @column()
  declare tabla: string | null
  @column()
  declare registroId: number | null
  @column()
  declare ip: string | null
  @column()
  declare userAgent: string | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  // Relaciones
  @belongsTo(() => User)
  declare usuario: BelongsTo<typeof User>
}