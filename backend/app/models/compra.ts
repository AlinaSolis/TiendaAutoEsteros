// app/models/compra.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Proveedor from './proveedor.js'
import User from './user.js'
import Sucursal from './sucursal.js'
import DetalleCompra from './detalle_compra.js'
export default class Compra extends BaseModel {
  static table = 'compras'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare proveedorId: number
  @column()
  declare usuarioId: number
  @column()
  declare sucursalId: number
  @column()
  declare folio: string
  @column()
  declare subtotal: number
  @column()
  declare iva: number
  @column()
  declare total: number
  @column()
  declare estado: 'Pendiente' | 'Recibida' | 'Cancelada'
  @column.dateTime()
  declare fechaEntrega: DateTime | null
  @column()
  declare notas: string | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @belongsTo(() => Proveedor)
  declare proveedor: BelongsTo<typeof Proveedor>
  @belongsTo(() => User)
  declare usuario: BelongsTo<typeof User>
  @belongsTo(() => Sucursal)
  declare sucursal: BelongsTo<typeof Sucursal>
  @hasMany(() => DetalleCompra)
  declare detalles: HasMany<typeof DetalleCompra>
  // Métodos personalizados
  async calcularTotales(): Promise<void> {
    const detalles = await this.related('detalles').query()
    this.subtotal = detalles.reduce((sum, d) => sum + d.total, 0)
    this.iva = this.subtotal * 0.16
    this.total = this.subtotal + this.iva
    await this.save()
  }
  async recibir(): Promise<void> {
    this.estado = 'Recibida'
    this.fechaEntrega = DateTime.now()
    await this.save()
    // Actualizar inventario
    const detalles = await this.related('detalles').query()
    for (const detalle of detalles) {
      await detalle.actualizarInventario(this.sucursalId)
    }
  }
}