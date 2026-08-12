// app/models/sucursal.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Inventario from './inventario.js'
import Venta from './venta.js'
import Compra from './compra.js'
export default class Sucursal extends BaseModel {
  static table = 'sucursales'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare nombre: string
  @column()
  declare direccion: string
  @column()
  declare ciudad: string
  @column()
  declare estado: string
  @column()
  declare codigoPostal: string
  @column()
  declare pais: string
  @column()
  declare telefono: string | null
  @column()
  declare email: string | null
  @column()
  declare horarioAtencion: string | null
  @column()
  declare latitud: number | null
  @column()
  declare longitud: number | null
  @column()
  declare activo: boolean
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @hasMany(() => Inventario)
  declare inventario: HasMany<typeof Inventario>
  @hasMany(() => Venta)
  declare ventas: HasMany<typeof Venta>
  @hasMany(() => Compra)
  declare compras: HasMany<typeof Compra>
}