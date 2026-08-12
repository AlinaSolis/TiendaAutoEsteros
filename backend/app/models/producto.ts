// app/models/producto.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Categoria from './categoria.js'
import Marca from './marca.js'
import ImagenProducto from './imagen_producto.js'
import Inventario from './inventario.js'
import DetalleVenta from './detalle_venta.js'
import DetalleCompra from './detalle_compra.js'
import Carrito from './carrito.js'
import Favorito from './favorito.js'
export default class Producto extends BaseModel {
  static table = 'productos'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare categoriaId: number
  @column()
  declare marcaId: number
  @column()
  declare codigo: string
  @column()
  declare nombre: string
  @column()
  declare descripcion: string | null
  @column()
  declare precioCompra: number
  @column()
  declare precioVenta: number
  @column()
  declare precioOferta: number | null
  @column()
  declare stockMinimo: number
  @column()
  declare stockMaximo: number
  @column()
  declare peso: number | null
  @column()
  declare dimensiones: string | null
  @column()
  declare garantiaMeses: number
  @column()
  declare especificaciones: any | null
  @column()
  declare activo: boolean
  @column()
  declare destacado: boolean
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @belongsTo(() => Categoria)
  declare categoria: BelongsTo<typeof Categoria>
  @belongsTo(() => Marca)
  declare marca: BelongsTo<typeof Marca>
  @hasMany(() => ImagenProducto)
  declare imagenes: HasMany<typeof ImagenProducto>
  @hasMany(() => Inventario)
  declare inventario: HasMany<typeof Inventario>
  @hasMany(() => DetalleVenta)
  declare detalleVentas: HasMany<typeof DetalleVenta>
  @hasMany(() => DetalleCompra)
  declare detalleCompras: HasMany<typeof DetalleCompra>
  @hasMany(() => Carrito)
  declare carritos: HasMany<typeof Carrito>
  @hasMany(() => Favorito)
  declare favoritos: HasMany<typeof Favorito>
  // Métodos personalizados
  get precioActual(): number {
    return this.precioOferta && this.precioOferta < this.precioVenta
      ? this.precioOferta
      : this.precioVenta
  }
  get tieneOferta(): boolean {
    return !!(this.precioOferta && this.precioOferta < this.precioVenta)
  }
  async getStockTotal(): Promise<number> {
    const inventarios = await this.related('inventario').query().sum('cantidad as total')
    return Number(inventarios[0].$extras.total) || 0
  }
  async getStockPorSucursal(sucursalId: number): Promise<number> {
    const inventario = await this.related('inventario')
      .query()
      .where('sucursal_id', sucursalId)
      .first()
    return inventario?.cantidad || 0
  }
  async getImagenPrincipal(): Promise<string | null> {
    const imagen = await this.related('imagenes')
      .query()
      .where('es_principal', true)
      .first()
    return imagen?.imagenUrl || null
  }
}