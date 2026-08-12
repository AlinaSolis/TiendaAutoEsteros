// app/models/metodo_pago.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Venta from './venta.js'
export default class MetodoPago extends BaseModel {
  static table = 'metodos_pago'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare nombre: string
  @column()
  declare descripcion: string | null
  @column()
  declare activo: boolean
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @hasMany(() => Venta)
  declare ventas: HasMany<typeof Venta>
}