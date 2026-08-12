// app/models/detalle_compra.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Compra from './compra.js'
import Producto from './producto.js'
export default class DetalleCompra extends BaseModel {
  static table = 'detalle_compras'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare compraId: number
  @column()
  declare productoId: number
  @column()
  declare cantidad: number
  @column()
  declare precioUnitario: number
  @column()
  declare total: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @belongsTo(() => Compra)
  declare compra: BelongsTo<typeof Compra>
  @belongsTo(() => Producto)
  declare producto: BelongsTo<typeof Producto>
  // Métodos personalizados
  get subtotal(): number {
    return this.precioUnitario * this.cantidad
  }
  async actualizarInventario(sucursalId: number): Promise<void> {
    const producto = await this.related('producto').query().first()
    if (!producto) return
    let inventario = await producto
      .related('inventario')
      .query()
      .where('sucursal_id', sucursalId)
      .first()
    if (inventario) {
      inventario.cantidad += this.cantidad
      await inventario.save()
    } else {
      await producto.related('inventario').create({
        sucursalId,
        cantidad: this.cantidad,
        stockMinimo: producto.stockMinimo,
        stockMaximo: producto.stockMaximo,
      })
    }
  }
}