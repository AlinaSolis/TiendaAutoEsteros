// app/models/inventario.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Producto from './producto.js'
import Sucursal from './sucursal.js'
export default class Inventario extends BaseModel {
  static table = 'inventario'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare productoId: number
  @column()
  declare sucursalId: number
  @column()
  declare cantidad: number
  @column()
  declare stockMinimo: number
  @column()
  declare stockMaximo: number
  @column()
  declare ubicacion: string | null
  @column()
  declare lote: string | null
  @column.date()
  declare fechaVencimiento: DateTime | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @belongsTo(() => Producto)
  declare producto: BelongsTo<typeof Producto>
  @belongsTo(() => Sucursal)
  declare sucursal: BelongsTo<typeof Sucursal>
  // Métodos personalizados
  get nivelStock(): 'Bajo' | 'Medio' | 'Alto' {
    if (this.cantidad <= this.stockMinimo) return 'Bajo'
    if (this.cantidad <= this.stockMinimo * 2) return 'Medio'
    return 'Alto'
  }
  get tieneStockBajo(): boolean {
    return this.cantidad <= this.stockMinimo
  }
}