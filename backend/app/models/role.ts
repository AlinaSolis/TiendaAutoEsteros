// app/models/role.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
export default class Role extends BaseModel {
  static table = 'roles'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare nombre: string
  @column()
  declare descripcion: string | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Relaciones
  @hasMany(() => User)
  declare users: HasMany<typeof User>
}