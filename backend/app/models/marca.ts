// app/models/marca.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Producto from './producto.js'
export default class Marca extends BaseModel {
  static table = 'marcas'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare nombre: string
  @column()
  declare descripcion: string | null
  @column()
  declare logo: string | null
  @column()
  declare sitioWeb: string | null
  @column()
  declare activo: boolean
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @hasMany(() => Producto)
  declare productos: HasMany<typeof Producto>
}