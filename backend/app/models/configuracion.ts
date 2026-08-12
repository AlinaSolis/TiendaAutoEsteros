// app/models/configuracion.ts
import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
export default class Configuracion extends BaseModel {
  static table = 'configuracion'
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare clave: string
  @column()
  declare valor: string | null
  @column()
  declare grupo: string | null
  @column()
  declare descripcion: string | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  // Métodos estáticos
  static async getValor(clave: string): Promise<string | null> {
    const config = await this.findBy('clave', clave)
    return config?.valor || null
  }
  static async setValor(clave: string, valor: string): Promise<void> {
    await this.updateOrCreate(
      { clave },
      { clave, valor }
    )
  }
  static async getGrupo(grupo: string): Promise<Configuracion[]> {
    return await this.query().where('grupo', grupo)
  }
}