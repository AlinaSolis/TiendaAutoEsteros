// app/models/proveedor.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Compra from './compra.js'
export default class Proveedor extends BaseModel {
  static table = 'proveedores'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare nombre: string
  @column()
  declare rfc: string | null
  @column()
  declare email: string | null
  @column()
  declare telefono: string | null
  @column()
  declare direccion: string | null
  @column()
  declare ciudad: string | null
  @column()
  declare estado: string | null
  @column()
  declare codigoPostal: string | null
  @column()
  declare pais: string
  @column()
  declare contactoNombre: string | null
  @column()
  declare contactoTelefono: string | null
  @column()
  declare contactoEmail: string | null
  @column()
  declare activo: boolean
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @hasMany(() => Compra)
  declare compras: HasMany<typeof Compra>
}