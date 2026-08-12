// app/models/user.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import hash from '@adonisjs/core/services/hash'
import Role from './role.js'
import Cliente from './cliente.js'
import Venta from './venta.js'
import Compra from './compra.js'
import HistorialMovimiento from './historial_movimiento.js'
import Bitacora from './bitacora.js'
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})
export default class User extends compose(BaseModel, AuthFinder) {
  static table = 'usuarios'
  static accessTokens = DbAccessTokensProvider.forModel(User, { table: 'access_tokens' })
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare rolId: number
  @column()
  declare nombre: string
  @column()
  declare apellido: string
  @column()
  declare email: string
  @column()
  declare telefono: string | null
  @column({ serializeAs: null })
  declare password: string
  @column()
  declare rememberToken: string | null
  @column()
  declare activo: boolean
  @column.dateTime()
  declare ultimoLogin: DateTime | null
  @column()
  declare fotoPerfil: string | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @belongsTo(() => Role)
  declare rol: BelongsTo<typeof Role>
  @hasMany(() => Cliente)
  declare clientes: HasMany<typeof Cliente>
  @hasMany(() => Venta)
  declare ventas: HasMany<typeof Venta>
  @hasMany(() => Compra)
  declare compras: HasMany<typeof Compra>
  @hasMany(() => HistorialMovimiento)
  declare historialMovimientos: HasMany<typeof HistorialMovimiento>
  @hasMany(() => Bitacora)
  declare bitacora: HasMany<typeof Bitacora>
  // Métodos personalizados
  get nombreCompleto(): string {
    return `${this.nombre} ${this.apellido}`
  }
  async isAdmin(): Promise<boolean> {
    const role = await this.related('rol').query().first()
    return role?.nombre === 'Administrador'
  }
  async hasRole(roleName: string): Promise<boolean> {
    const role = await this.related('rol').query().first()
    return role?.nombre === roleName
  }
}