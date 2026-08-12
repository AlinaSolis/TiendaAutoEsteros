// app/models/cliente.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Venta from './venta.js'
import Carrito from './carrito.js'
import Favorito from './favorito.js'
export default class Cliente extends BaseModel {
  static table = 'clientes'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare usuarioId: number | null
  @column()
  declare nombre: string
  @column()
  declare apellido: string
  @column()
  declare email: string
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
  declare rfc: string | null
  @column.date()
  declare fechaNacimiento: DateTime | null
  @column()
  declare genero: 'M' | 'F' | 'Otro' | null
  @column()
  declare foto: string | null
  @column()
  declare puntos: number
  @column()
  declare nivel: string
  @column()
  declare activo: boolean
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @belongsTo(() => User)
  declare usuario: BelongsTo<typeof User>
  @hasMany(() => Venta)
  declare ventas: HasMany<typeof Venta>
  @hasMany(() => Carrito)
  declare carrito: HasMany<typeof Carrito>
  @hasMany(() => Favorito)
  declare favoritos: HasMany<typeof Favorito>
  // Métodos personalizados
  get nombreCompleto(): string {
    return `${this.nombre} ${this.apellido}`
  }
  async calcularDescuento(): Promise<number> {
    const descuentos = {
      Platino: 15,
      Oro: 10,
      Plata: 5,
      Bronce: 0,
    }
    return descuentos[this.nivel as keyof typeof descuentos] || 0
  }
  async agregarPuntos(monto: number): Promise<void> {
    const puntosGanados = Math.floor(monto / 10)
    this.puntos += puntosGanados
    // Actualizar nivel
    if (this.puntos >= 1000) {
      this.nivel = 'Platino'
    } else if (this.puntos >= 500) {
      this.nivel = 'Oro'
    } else if (this.puntos >= 200) {
      this.nivel = 'Plata'
    }
    await this.save()
  }
}