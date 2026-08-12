// app/models/detalle_venta.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Venta from './venta.js'
import Producto from './producto.js'
export default class DetalleVenta extends BaseModel {
  static table = 'detalle_ventas'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare ventaId: number
  @column()
  declare productoId: number
  @column()
  declare cantidad: number
  @column()
  declare precioUnitario: number
  @column()
  declare descuentoUnitario: number
  @column()
  declare total: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @belongsTo(() => Venta)
  declare venta: BelongsTo<typeof Venta>
  @belongsTo(() => Producto)
  declare producto: BelongsTo<typeof Producto>
  // Métodos personalizados
  get subtotal(): number {
    return this.precioUnitario * this.cantidad
  }
  get totalConDescuento(): number {
    return this.subtotal - (this.descuentoUnitario * this.cantidad)
  }
  async revertirStock(sucursalId: number): Promise<void> {
    const producto = await this.related('producto').query().first()
    if (producto) {
      const inventario = await producto
        .related('inventario')
        .query()
        .where('sucursal_id', sucursalId)
        .first()
      if (inventario) {
        inventario.cantidad += this.cantidad
        await inventario.save()
      }
    }
  }
}