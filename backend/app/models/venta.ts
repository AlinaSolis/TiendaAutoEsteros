// app/models/venta.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Cliente from './cliente.js'
import User from './user.js'
import Sucursal from './sucursal.js'
import MetodoPago from './metodo_pago.js'
import DetalleVenta from './detalle_venta.js'
export default class Venta extends BaseModel {
  static table = 'ventas'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare clienteId: number
  @column()
  declare usuarioId: number
  @column()
  declare sucursalId: number
  @column()
  declare metodoPagoId: number
  @column()
  declare folio: string
  @column()
  declare subtotal: number
  @column()
  declare descuento: number
  @column()
  declare iva: number
  @column()
  declare total: number
  @column()
  declare estado: 'Pendiente' | 'Completada' | 'Cancelada' | 'Reembolsada'
  @column.dateTime()
  declare fechaPago: DateTime | null
  @column()
  declare notas: string | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @belongsTo(() => Cliente)
  declare cliente: BelongsTo<typeof Cliente>
  @belongsTo(() => User)
  declare usuario: BelongsTo<typeof User>
  @belongsTo(() => Sucursal)
  declare sucursal: BelongsTo<typeof Sucursal>
  @belongsTo(() => MetodoPago)
  declare metodoPago: BelongsTo<typeof MetodoPago>
  @hasMany(() => DetalleVenta)
  declare detalles: HasMany<typeof DetalleVenta>
  // Métodos personalizados
  get totalConDescuento(): number {
    return this.total - this.descuento
  }
  async calcularTotales(): Promise<void> {
    const detalles = await this.related('detalles').query()
    this.subtotal = detalles.reduce((sum, d) => sum + d.total, 0)
    this.iva = this.subtotal * 0.16
    this.total = this.subtotal + this.iva - (this.descuento || 0)
    await this.save()
  }
  async completar(): Promise<void> {
    this.estado = 'Completada'
    this.fechaPago = DateTime.now()
    await this.save()
    // Actualizar puntos del cliente
    const cliente = await this.related('cliente').query().first()
    if (cliente) {
      await cliente.agregarPuntos(this.total)
    }
  }
  async cancelar(): Promise<void> {
    this.estado = 'Cancelada'
    await this.save()
    // Revertir stock
    const detalles = await this.related('detalles').query()
    for (const detalle of detalles) {
      await detalle.revertirStock(this.sucursalId)
    }
  }
}